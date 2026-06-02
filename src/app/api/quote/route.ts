import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
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
    } = body;

    // Basic validation
    if (!pickupZip || !deliveryZip || !name || !phone || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${pickupZip}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Delivery ZIP:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${deliveryZip}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Transport Type:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600; text-transform: capitalize;">${transportType}</td>
            </tr>
          </table>

          <h2 style="color: #111; font-size: 18px; margin: 24px 0 20px 0; border-bottom: 2px solid #E11D2E; padding-bottom: 10px;">
            Vehicle Details
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Vehicle:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${vehicleYear} ${vehicleMake} ${vehicleModel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Running:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600; text-transform: capitalize;">${isRunning === "yes" ? "Yes" : "No"}</td>
            </tr>
            ${pickupDate ? `<tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Preferred Pickup:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${pickupDate}</td>
            </tr>` : ""}
          </table>

          <h2 style="color: #111; font-size: 18px; margin: 24px 0 20px 0; border-bottom: 2px solid #E11D2E; padding-bottom: 10px;">
            Customer Contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Name:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">
                <a href="tel:${phone}" style="color: #E11D2E; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 600;">
                <a href="mailto:${email}" style="color: #E11D2E; text-decoration: none;">${email}</a>
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
