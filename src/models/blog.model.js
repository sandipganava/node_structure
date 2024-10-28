const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of tags for categorizing the blog
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
  deletedAt: {
    type: Date,
    default: null, // Automatically set the null
  },
  imageUrl: {
    type: String, // Optional image URL for the blog post
  },
  isPublished: {
    type: Boolean,
    default: false, // Flag to indicate if the blog post is published
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
