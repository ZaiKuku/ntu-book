import {
  getUsedBook,
  getComments,
  addUsedBook,
  addComment,
  updateUsedBook,
  deleteUsedBook,
} from "../controllers/usedBook.js";
import express from "express";

const router = express.Router();

// "/" = "/api/usedbook"

// GET /api/usedbook/:id - Get used book details
router.get("/:id", getUsedBook);

// GET /api/usedbook/:id/comment - Get all comments for used book
router.get("/:id/comment", getComments);

// POST /api/usedbook/ - Add used book
router.post("/", addUsedBook);

// POST /api/usedbook/:id/comment - Add comment to used book
router.post("/:id/comment", addComment);

// PUT /api/usedbook/:id - Update used book details
router.put("/:id", updateUsedBook);

// POST /api/usedbook/:id - Delete used book
router.delete("/:id", deleteUsedBook);

export default router;
