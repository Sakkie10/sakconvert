export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };

    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    if (url.pathname === "/api/admin/export") {
      return handleAdminExport(request, env, corsHeaders);
    }

    if (url.pathname === "/api/subscribe") {
      return handleSubscribe(request, env, corsHeaders);
    }

    return Response.json(
      { success: false, error: "Not found." },
      { status: 404, headers: corsHeaders }
    );
  }
};

async function handleSubscribe(request, env, corsHeaders) {
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";

  const rateLimit = await env.RATE_LIMITER.limit({ key: ip });

  if (!rateLimit.success) {
    return Response.json(
      {
        success: false,
        error: "Too many requests. Please try again in a minute."
      },
      {
        status: 429,
        headers: corsHeaders
      }
    );
  }

  if (request.method !== "POST") {
    return Response.json(
      { success: false, error: "Method not allowed." },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const turnstileToken = body.turnstileToken;

    if (!turnstileToken) {
      return Response.json(
        { success: false, error: "Verification failed. Please try again." },
        { status: 400, headers: corsHeaders }
      );
    }

    const turnstileResult = await verifyTurnstile(
      turnstileToken,
      env.SAKCONVERT_TURNSTILE_SECRET
    );

    if (!turnstileResult.success) {
      return Response.json(
        { success: false, error: "Verification failed. Please try again." },
        { status: 400, headers: corsHeaders }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400, headers: corsHeaders }
      );
    }

    const blockedDomains = [
      "mailinator.com",
      "guerrillamail.com",
      "10minutemail.com"
    ];

    const domain = email.split("@")[1];

    if (blockedDomains.includes(domain)) {
      return Response.json(
        { success: false, error: "Please use a real email address." },
        { status: 400, headers: corsHeaders }
      );
    }

    await env.DB.prepare(
      "INSERT INTO subscribers (email) VALUES (?)"
    )
      .bind(email)
      .run();

    try {
      await sendWelcomeEmail(email, env);
    } catch (emailError) {
      console.log("Welcome email failed:", emailError);
    }

    try {
      await sendAdminNotification(email, env);
    } catch (adminEmailError) {
      console.log("Admin notification failed:", adminEmailError);
    }

    return Response.json(
      {
        success: true,
        status: "new",
        message: "Thanks — you’re subscribed."
      },
      {
        status: 200,
        headers: corsHeaders
      }
    );

  } catch (error) {
    const errorMessage = String(error?.message || "").toLowerCase();

    if (
      errorMessage.includes("unique") ||
      errorMessage.includes("constraint") ||
      errorMessage.includes("duplicate")
    ) {
      return Response.json(
        {
          success: true,
          status: "duplicate",
          message: "You’re already subscribed."
        },
        {
          status: 200,
          headers: corsHeaders
        }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Something went wrong. Please try again."
      },
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

async function handleAdminExport(request, env, corsHeaders) {
  if (request.method !== "GET") {
    return Response.json(
      { success: false, error: "Method not allowed." },
      { status: 405, headers: corsHeaders }
    );
  }

  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token || token !== env.SAKCONVERT_ADMIN_KEY) {
    return Response.json(
      { success: false, error: "Unauthorized." },
      { status: 401, headers: corsHeaders }
    );
  }

  const { results } = await env.DB.prepare(
    "SELECT email, created_at FROM subscribers ORDER BY created_at DESC"
  ).all();

  const csvRows = [
    ["email", "created_at"],
    ...results.map((row) => [
      escapeCsv(row.email),
      escapeCsv(row.created_at)
    ])
  ];

  const csv = csvRows
    .map((row) => row.join(","))
    .join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sakconvert-subscribers.csv"'
    }
  });
}

function escapeCsv(value) {
  const text = String(value ?? "");

  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

async function sendWelcomeEmail(email, env) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "SakConvert <hello@sakconvert.com>",
      to: email,
      subject: "Welcome to SakConvert",
      text: `Thanks for subscribing.

You'll be the first to hear about new calculators,
converters, business tools, fitness tools,
and practical utilities as they are added.

We're just getting started.

— The SakConvert Team`,
      html: `
        <div style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
          <div style="max-width:620px;margin:0 auto;padding:32px 18px;">
            <div style="background:#ffffff;border-radius:18px;padding:34px 30px;border:1px solid #e5e7eb;">
              <p style="margin:0 0 14px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;">
                SakConvert
              </p>

              <h1 style="margin:0 0 18px;font-size:28px;line-height:1.2;color:#111827;">
                Welcome to SakConvert.
              </h1>

              <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#374151;">
                Thanks for subscribing. You'll be the first to hear about new calculators, converters, business tools, fitness tools, and practical utilities as they are added.
              </p>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#374151;">
                We're just getting started.
              </p>

              <a href="https://www.sakconvert.com"
                 style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:13px 18px;border-radius:10px;">
                Explore SakConvert
              </a>

              <div style="height:1px;background:#e5e7eb;margin:30px 0 18px;"></div>

              <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">
                You received this email because you subscribed to updates from SakConvert.
              </p>

              <p style="margin:10px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">
                — The SakConvert Team
              </p>
            </div>
          </div>
        </div>
      `
    })
  });
}

async function sendAdminNotification(email, env) {
  const countResult = await env.DB.prepare(
    "SELECT COUNT(*) AS total FROM subscribers"
  ).first();

  const totalSubscribers = countResult?.total ?? "Unknown";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "SakConvert <hello@sakconvert.com>",
      to: "hello@sakconvert.com",
      subject: "New SakConvert subscriber",
      text: `New subscriber:

${email}

Total subscribers: ${totalSubscribers}

A new user has subscribed to SakConvert.`
    })
  });
}

async function verifyTurnstile(token, secretKey) {
  const formData = new FormData();

  formData.append("secret", secretKey);
  formData.append("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData
    }
  );

  return response.json();
}