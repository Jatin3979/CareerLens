const { Resend } = require("resend");

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeSubjectPart = (value) => value.replace(/[\r\n]+/g, " ").trim();

const getResendClient = () => {
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) {
    return null;
  }
  return new Resend(RESEND_API_KEY);
};

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message must be valid text values.",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Name must be ${MAX_NAME_LENGTH} characters or fewer.`,
      });
    }

    if (trimmedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(trimmedEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid email." });
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
      });
    }

    const resend = getResendClient();
    if (!resend) {
      console.error("Portfolio contact email is not configured.");
      return res.status(500).json({
        success: false,
        message: "Email service is temporarily unavailable.",
      });
    }

    // EMAIL_FROM must be an address on a domain you've verified in the Resend
    // dashboard (e.g. "Portfolio <contact@yourdomain.com>"). Until a domain is
    // verified, Resend only allows sending FROM their sandbox address
    // "onboarding@resend.dev", and only TO the email you signed up with.
    const fromAddress = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const toAddress = process.env.EMAIL_TO || process.env.EMAIL_USER;

    if (!toAddress) {
      console.error("EMAIL_TO is not configured.");
      return res.status(500).json({
        success: false,
        message: "Email service is temporarily unavailable.",
      });
    }

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: process.env.EMAIL_USER,
      replyTo: trimmedEmail,
      subject: `New Portfolio Message from ${sanitizeSubjectPart(trimmedName)}`,
      text: `You have a new message from your portfolio contact form.\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #06b6d4;">New Message via CareerLens Portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error while sending portfolio message:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error while sending email.",
      });
    }

    console.log("Portfolio email sent, id:", data?.id);

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Resend error while sending portfolio message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending email.",
    });
  }
};

module.exports = { submitContactForm };