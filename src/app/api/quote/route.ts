import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (!rateLimit(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      pickupZip,
      deliveryZip,
      transportType,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      isRunning,
      pickupDate,
      name,
      phone,
      email,
      turnstileToken,
    } = body;

    if (!pickupZip || !deliveryZip || !name || !phone || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Cloudflare Turnstile token
    if (process.env.TURNSTILE_SECRET_KEY) {
      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: turnstileToken || "",
            remoteip: ip,
          }),
        }
      );
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return Response.json(
          { error: "Spam verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    // Save to Supabase (primary — never lose a lead)
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("quotes").insert({
          pickup_zip: pickupZip,
          delivery_zip: deliveryZip,
          transport_type: transportType,
          vehicle_year: vehicleYear,
          vehicle_make: vehicleMake,
          vehicle_model: vehicleModel,
          is_running: isRunning,
          pickup_date: pickupDate || null,
          name,
          phone,
          email,
          status: "new",
        });

        // Upsert contact
        const { data: existing } = await supabase
          .from("contacts")
          .select("id, total_quotes")
          .eq("email", email)
          .single();

        if (existing) {
          await supabase
            .from("contacts")
            .update({
              total_quotes: existing.total_quotes + 1,
              last_quote_date: new Date().toISOString(),
              phone,
              name,
            })
            .eq("id", existing.id);
        } else {
          await supabase.from("contacts").insert({ name, email, phone });
        }
      } catch (dbErr) {
        console.error("[QUOTE_API] Supabase error (non-fatal):", dbErr);
      }
    }

    // Send email notification
    const safePickupZip = escapeHtml(pickupZip);
    const safeDeliveryZip = escapeHtml(deliveryZip);
    const safeTransportType = escapeHtml(transportType);
    const safeYear = escapeHtml(vehicleYear || "");
    const safeMake = escapeHtml(vehicleMake || "");
    const safeModel = escapeHtml(vehicleModel || "");
    const safeRunning = isRunning === "yes" ? "Yes" : "No";
    const safePickupDate = escapeHtml(pickupDate || "");
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #E11D2E; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Quote Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Ark Auto Logistics</p>
        </div>

        <div style="padding: 32px; background: #f9f9f9;">
          <h2 style="color: #111; font-size: 18px; margin: 0 0 20px 0; border-bottom: 2px solid #E11D2E; padding-bottom: 10px;">
            Travel Information
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Pickup ZIP:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${safePickupZip}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Delivery ZIP:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${safeDeliveryZip}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Transport Type:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600; text-transform: capitalize;">${safeTransportType}</td>
            </tr>
          </table>

          <h2 style="color: #111; font-size: 18px; margin: 24px 0 20px 0; border-bottom: 2px solid #E11D2E; padding-bottom: 10px;">
            Vehicle Details
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Vehicle:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${safeYear} ${safeMake} ${safeModel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Running:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${safeRunning}</td>
            </tr>
            ${safePickupDate ? `<tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Preferred Pickup:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${safePickupDate}</td>
            </tr>` : ""}
          </table>

          <h2 style="color: #111; font-size: 18px; margin: 24px 0 20px 0; border-bottom: 2px solid #E11D2E; padding-bottom: 10px;">
            Customer Contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Name:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">
                <a href="tel:${safePhone}" style="color: #E11D2E; text-decoration: none;">${safePhone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">
                <a href="mailto:${safeEmail}" style="color: #E11D2E; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
          </table>
        </div>

        <div style="padding: 16px; background: #111; text-align: center;">
          <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
            Sent from arkautologistics.com quote form
          </p>
        </div>
      </div>
    `;

    const text = `New Quote Request - Ark Auto Logistics

Travel Info:
- Pickup ZIP: ${pickupZip}
- Delivery ZIP: ${deliveryZip}
- Transport Type: ${transportType}

Vehicle:
- ${vehicleYear} ${vehicleMake} ${vehicleModel}
- Running: ${isRunning === "yes" ? "Yes" : "No"}
${pickupDate ? `- Preferred Pickup: ${pickupDate}` : ""}

Customer:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}
`;

    const result = await resend.emails.send({
      from: "Ark Auto Logistics <bookings@highlifedmv.com>",
      to: ["info@arkautologistics.com"],
      subject: `New Quote: ${vehicleYear} ${vehicleMake} ${vehicleModel} | ${pickupZip} to ${deliveryZip}`,
      html,
      text,
      replyTo: email,
    });

    console.log("[QUOTE_API] Email sent:", result);

    return Response.json(
      { success: true, id: result.data?.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[QUOTE_API] Error:", err);
    return Response.json(
      { error: "Failed to send quote request" },
      { status: 500 }
    );
  }
}
