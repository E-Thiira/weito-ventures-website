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
const contactController = require("../controllers/contactController");

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
router.post("/", contactController.submitContact);

module.exports = router;
