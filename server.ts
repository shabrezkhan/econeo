import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    console.log("Received contact form submission:", req.body);
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || "info@econeo.in";

    if (!emailUser || !emailPass) {
      console.error("Email credentials not configured in environment variables.");
      return res.status(500).json({ 
        error: "Server email configuration missing. Please configure EMAIL_USER and EMAIL_PASS in the Settings menu (Secrets)." 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: emailTo,
        subject: `[${subject || "General Inquiry"}] New Inquiry from ${name} - Econeo Recycling`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject || "N/A"}

Message:
${message}
        `,
        html: `
<h3>New Inquiry from Econeo Recycling Website</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || "N/A"}</p>
<p><strong>Subject:</strong> ${subject || "N/A"}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email. Error: " + (error instanceof Error ? error.message : String(error)) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
