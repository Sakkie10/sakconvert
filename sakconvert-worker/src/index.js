export default {
  async fetch(request, env) {

    // CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders
      });
    }

    try {

      const body = await request.json();
      const email = body.email?.trim().toLowerCase();

      // Basic validation
      if (!email || !email.includes("@")) {
        return Response.json(
          { success: false, error: "Invalid email." },
          { status: 400, headers: corsHeaders }
        );
      }

      // Save to D1
      await env.DB.prepare(
        "INSERT INTO subscribers (email) VALUES (?)"
      )
      .bind(email)
      .run();

      return Response.json(
        {
          success: true,
          message: "Subscribed successfully."
        },
        {
          headers: corsHeaders
        }
      );

    } catch (error) {

      return Response.json(
        {
          success: false,
          error: "Email may already exist."
        },
        {
          status: 500,
          headers: corsHeaders
        }
      );
    }
  }
};