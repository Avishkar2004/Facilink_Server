import express from "express";
import Blog from "../model/Blog.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize Upload Middleware
const upload = multer({ storage });

// Create Blog with Image Upload
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, content, categories, author, readTime, isFeatured } =
      req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

    const newBlog = new Blog({
      title,
      content,
      image: imagePath, // Save image path in DB
      categories: categories.split(","), // Convert string to array
      author,
      readTime,
      isFeatured: isFeatured === "true",
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a blog
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
