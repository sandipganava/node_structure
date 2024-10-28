const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true, // e.g., "LinkedIn", "GitHub", "Twitter"
  },
  link: {
    type: String,
    required: true,
    match: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}([\/\w .-]*)*\/?$/, // Basic URL validation
  },
  username: {
    type: String, // Optional username for the platform
  },
  icon: {
    type: String, // Optional field for the icon URL or class name for displaying
  },
  isVisible: {
    type: Boolean,
    default: true, // Flag to indicate if the profile should be displayed on the portfolio
  },
});

const SocialMedia = mongoose.model('SocialMedia', socialMediaSchema);

module.exports = SocialMedia;
