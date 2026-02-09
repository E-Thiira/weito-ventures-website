// Contact controller: validates input, saves to MongoDB, and returns JSON responses
const Contact = require("../models/Contact");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "All fields (name, email, message) are required" });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address" });
    }

    if (message.length < 10) {
      return res
        .status(400)
        .json({ error: "Message must be at least 10 characters long" });
    }

    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // TODO: send confirmation email to user and notify admin

    return res.json({
      success: true,
      message:
        "Thank you for contacting Weito Ventures. We will get back to you soon.",
    });
  } catch (err) {
    console.error("Contact controller error:", err);
    return res.status(500).json({ error: "Failed to save contact request" });
  }
};
