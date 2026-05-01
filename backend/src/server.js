import express from "express";
import noteRoute from "./routes/noteRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoute);

// serve frontend
const frontendPath = path.join(__dirname, "../../frontend/dist");
console.log("__dirname:", __dirname);
console.log("Frontend path:", frontendPath);
console.log("Path exists:", fs.existsSync(frontendPath));

app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});