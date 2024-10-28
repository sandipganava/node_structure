const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Basic email validation
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
  isResponded: {
    type: Boolean,
    default: false, // Flag to indicate if a response has been sent
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
