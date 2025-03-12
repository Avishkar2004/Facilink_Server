import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";
const app = express();

const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" folder
app.use("/uploads", express.static("uploads"));
app.use("/blogs", blogRoutes);

// Connect to MongoDB first
mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected successfully");

    // Start the server only after a successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is up on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if the DB connection fails
  });

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = mongoose.model("blogs", UserSchema);

app.get("/getusers", async (req, res) => {
  const userDate = await UserModel.find();
  res.json(userDate);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
