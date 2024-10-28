const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String], // Array of technologies used
    required: true,
  },
  category: {
    type: String, 
    required: true,
  },
  imageUrl: {
    type: String, // URL for project image
    required: true,
  },
  liveLink: {
    type: String, // Link to the live project
    required: true,
  },
  githubLink: {
    type: String, // Link to the GitHub repository
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
  deletedAt: {
    type: Date,
    default: null, // Automatically set the null
  },
  isFeatured: {
    type: Boolean,
    default: false, // Flag to indicate if the project is featured
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
