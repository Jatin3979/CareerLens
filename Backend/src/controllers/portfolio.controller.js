const nodemailer = require("nodemailer");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 1. Configure the email transporter using your Gmail credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // This forces Node to use IPv4 instead of IPv6, which is
      // the most common cause of timeouts on Render.
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 2. Set up the email data
    const mailOptions = {
      from: process.env.EMAIL_USER, // It must be sent FROM your authenticated email
      to: process.env.EMAIL_USER, // Sending TO yourself
      replyTo: email, // If you click "reply" in your inbox, it goes to the user's email
      subject: `New Portfolio Message from ${name}`,
      text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #06b6d4;">New Message via CareerLens Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending email.",
    });
  }
};
module.exports = { submitContactForm };
