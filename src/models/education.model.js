const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  activities: {
    type: String, 
  },
  description: {
    type: String, 
  },
  honors: {
    type: String, 
  },
  location: {
    type: String, 
  },
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
