import express from "express";
import multer from "multer";
import path from "path";
import Photo from "../model/Photo.js";

const router = express.Router();

// Multer storage configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "photos/"); // Save in the "Photos" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/photos/${req.file.filename}` : null;
    const newPhoto = new Photo({
      title,
      imageUrl,
    });

    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadedAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
