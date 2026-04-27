import express from "express";
import {
  getAllNotes,
  getNoteById,
  createAllNotes,
  updateAllNotes,
  deleteAllNotes,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createAllNotes);
router.put("/:id", updateAllNotes);
router.delete("/:id", deleteAllNotes);

export default router;
