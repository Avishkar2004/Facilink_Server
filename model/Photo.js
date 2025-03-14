import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }, // Upload timestamp
});


const Photo = mongoose.model("Photo" , photoSchema)
export default Photo