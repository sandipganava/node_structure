const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date, // Can be null for current positions
  },
  location: {
    type: String, // Optional, e.g., "New York, NY"
  },
  responsibilities: {
    type: [String], // Array of responsibilities or achievements
    required: true,
  },
  achievements: {
    type: [String], // Optional array of notable achievements
  },
  isCurrent: {
    type: Boolean,
    default: false, // Flag to indicate if this is a current position
  },
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
