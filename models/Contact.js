const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model. Collection will be 'contacts'
module.exports =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
