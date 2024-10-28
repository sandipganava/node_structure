const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 10, // Minimum length for a meaningful testimonial
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
  deletedAd: {
    type: Date,
    default: null, 
  },
  designation: {
    type: String, // e.g., "Client", "Colleague", "Manager"
    required: true,
  },
  imageUrl:{
    type: String,
    required: true,
  },
  company: {
    type: String, // Optional field for the company name
  },
  rating: {
    type: Number, // Optional rating field (1-5 scale)
    min: 1,
    max: 5,
  },
  isFeatured: {
    type: Boolean,
    default: false, // Flag to indicate if the testimonial should be highlighted
  },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
