import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, date, time, message } = await req.json();

    if (!name || !email || !phone || !service || !date || !time || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to the team
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: "connect.buildit@gmail.com",
      subject: `New Call Booking from ${name}`,
      html: `
        <h2>New Call Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <h3>Message/Details:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP credentials missing. Email not sent, but booking was received:", mailOptions);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to process booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
