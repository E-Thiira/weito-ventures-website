/**
 * Contact Route Handler
 *
 * POST /api/contact
 * Receives contact form submissions from the frontend.
 *
 * Future integration:
 * - Email service (Nodemailer, SendGrid, AWS SES)
 * - Database storage (MongoDB, PostgreSQL) for inquiry tracking
 * - Validation & sanitization
 * - Rate limiting to prevent spam
 */

const express = require("express");
const router = express.Router();

/**
 * POST /api/contact
 *
 * Expected request body:
 * {
 *   name: string (required),
 *   email: string (required, valid email),
 *   message: string (required, min 10 characters)
 * }
 *
 * Response on success:
 * {
 *   success: true,
 *   message: "Thank you for contacting Weito Ventures. We'll get back to you soon."
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields (name, email, message) are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address",
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        error: "Message must be at least 10 characters long",
      });
    }

    // TODO: Send email notification
    // const emailSent = await sendEmailNotification(email, name, message);
    // if (!emailSent) {
    //   return res.status(500).json({ error: 'Failed to send email' });
    // }

    // TODO: Store in database
    // const contactRequest = await ContactRequest.create({
    //   name,
    //   email,
    //   message,
    //   submittedAt: new Date(),
    //   status: 'new'
    // });

    // Return success response
    res.json({
      success: true,
      message:
        "Thank you for contacting Weito Ventures. We will get back to you soon.",
      // id: contactRequest._id // Include when database is implemented
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      error: "Failed to process contact request. Please try again later.",
    });
  }
});

/**
 * Email validation helper
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email format is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = router;
