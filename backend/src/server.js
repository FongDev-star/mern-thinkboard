import express from "express";
import noteRoute from "./routes/noteRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoute);

if (process.env.NODE_ENV !== "development") {
  // Add this just before your static file serving block
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  console.log("__dirname:", __dirname);
  console.log("Frontend path:", frontendPath);
  console.log("Path exists:", fs.existsSync(frontendPath));
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
