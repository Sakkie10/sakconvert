export default {
  async fetch(request, env) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

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

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailPattern.test(email)) {
        return Response.json(
          { success: false, error: "Please enter a valid email address." },
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