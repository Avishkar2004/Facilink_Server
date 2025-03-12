import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Blog title
  content: { type: String, required: true }, // Blog description
  image: { type: String, required: true }, // Main blog image URL
  categories: { type: [String], default: [] }, // Categories (e.g., "Technology", "AI")
  author: { type: String, required: true }, // Blog author
  publishedDate: { type: Date, default: Date.now }, // Publish date
  readTime: { type: String }, // Estimated reading time (e.g., "5 min read")
  isFeatured: { type: Boolean, default: false }, // Feature flag
});

const Blog = mongoose.model("Blog", blogSchema); // Collection: blogs
export default Blog;
