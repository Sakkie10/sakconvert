export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

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

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
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
};

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