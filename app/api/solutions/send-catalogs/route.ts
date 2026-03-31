// app/api/solutions/send-catalogs/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

// Required to prevent Edge runtime issues with nodemailer
export const runtime = 'nodejs';

// Absolute path to logo
const LOGO_PATH = path.join(process.cwd(), 'public', 'images', 'buildchem.png');

interface CatalogItem {
  productId: string;
  productName: string;
  pdfUrl: string; // Can be an empty string if processed by our new frontend logic
  solutionTitle: string;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, name, company, catalogs } = data;

    // Basic validation
    if (!email || !catalogs || catalogs.length === 0) {
      return NextResponse.json({ error: 'Email and catalogs are required.' }, { status: 400 });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Ensure environment variables exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({ error: 'Missing EMAIL_USER or EMAIL_PASS environment variables.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Function to generate email HTML wrapper
    const EmailCard = (content: string) => {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>BuildChem Catalogs</title>
          </head>
          <body style="margin:0; padding:40px; background:#f4f4f4; font-family:Arial, sans-serif;">
            <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; padding:40px 32px; box-shadow:0 4px 14px rgba(0,0,0,0.08);">
              <div style="text-align:center; margin-bottom:28px;">
                <img src="cid:vah-logo-2" style="width:150px;" alt="BuildChem Logo" />
              </div>
              ${content}
            </div>
          </body>
        </html>
      `;
    };

    // --- CRITICAL FIX HERE ---
    // We check if pdfUrl exists. If NOT, we show "Unavailable" text instead of a broken button.
    // This ensures the item still appears in the list even if the file is missing.
    const catalogList = catalogs
      .map((cat: CatalogItem) => {
        // Determine what to show: A Download Button or a Status Message
        const downloadLink = (cat.pdfUrl && cat.pdfUrl.length > 5)
          ? `<a href="${cat.pdfUrl}" style="color:#ffffff; background-color:#0066cc; padding: 8px 16px; border-radius: 4px; text-decoration:none; font-weight:bold; font-size:12px; display:inline-block;">Download PDF ↓</a>`
          : `<span style="color:#999; font-size:12px; font-style:italic;">Datasheet pending update</span>`;

        return `
        <tr>
          <td style="padding:16px 0; border-bottom:1px solid #e5e5e5;">
            <div style="margin-bottom:4px;">
              <span style="font-size:11px; color:#0066cc; font-weight:bold; text-transform:uppercase;">
                ${cat.solutionTitle || 'Product Solution'}
              </span>
            </div>
            <div style="font-weight:600; color:#0a0a0a; margin-bottom:8px; font-size:16px;">
              ${cat.productName}
            </div>
            <div>
              ${downloadLink}
            </div>
          </td>
        </tr>
      `;
      })
      .join(''); // .join('') ensures all array items are concatenated into one string

    const userContent = `
      <h2 style="margin:0 0 16px; font-size:22px; text-align:center; color:#111;">
        Your Product Catalogs Are Ready
      </h2>
      <p style="font-size:15px; line-height:24px; color:#444;">
        Hi ${name || 'there'},<br><br>
        Thank you for your interest in BuildChem products. You requested <strong>${catalogs.length}</strong> catalog${catalogs.length !== 1 ? 's' : ''}.
        <br>Please find your download links below:
      </p>
      <table style="width:100%; border-collapse: collapse; margin:24px 0;">
        ${catalogList}
      </table>
      <p style="font-size:14px; line-height:24px; color:#666; border-top: 1px solid #eee; padding-top: 20px;">
        If you have trouble downloading any files, please reply to this email directly.
        <br><br>
        Best regards,<br />
        <strong>The BuildChem Team</strong>
      </p>
    `;

    // Admin email content
    const adminContent = `
      <h2 style="margin:0 0 16px; font-size:22px;">New Catalog Request</h2>
      <p style="line-height:24px; font-size:15px;">
        A user has requested product catalogs via the website.
      </p>
      <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin-bottom:20px;">
        <p style="margin:5px 0;"><strong>Name:</strong> ${name || 'N/A'}</p>
        <p style="margin:5px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin:5px 0;"><strong>Company:</strong> ${company || 'N/A'}</p>
      </div>
      <p><strong>Requested Items (${catalogs.length}):</strong></p>
      <ul>
        ${catalogs.map((c: CatalogItem) => `
          <li>
            <strong>${c.productName}</strong> 
            <br><span style="font-size:12px; color:#666;">${c.pdfUrl ? 'PDF Sent' : 'No PDF Available'}</span>
          </li>
        `).join('')}
      </ul>
    `;

    // Send customer email
    await transporter.sendMail({
      from: `"BuildChem" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your BuildChem Product Catalogs',
      attachments: [
        {
          filename: 'vah-logo-2.png',
          path: LOGO_PATH,
          cid: 'vah-logo-2',
        },
      ],
      html: EmailCard(userContent),
    });

    // Send admin notification
    await transporter.sendMail({
      from: `"BuildChem" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Catalog Request (${catalogs.length}) — ${name || email}`,
      attachments: [
        {
          filename: 'vah-logo-2.png',
          path: LOGO_PATH,
          cid: 'vah-logo-2',
        },
      ],
      html: EmailCard(adminContent),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('CATALOG EMAIL ERROR:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}