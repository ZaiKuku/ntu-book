import {
  toLowerCase,
  getUsedBook,
  getComments,
  addUsedBook,
  addComment,
  updateUsedBook,
  deleteUsedBook,
} from "../controllers/usedBook.js";
import { authorization } from "../utils/authorization.js";
import express from "express";

const router = express.Router();

// "/" = "/api/usedbook"

// GET /api/usedbook/:id - Get used book details
router.get("/:id", getUsedBook);

// GET /api/usedbook/:id/comment - Get all comments for used book
router.get("/:id/comment", getComments);

// POST /api/usedbook/ - Add used book
router.post("/", authorization, toLowerCase, addUsedBook);

// POST /api/usedbook/:id/comment - Add comment to used book
router.post("/:id/comment", authorization, toLowerCase, addComment);

// PUT /api/usedbook/:id - Update used book details
router.put("/:id", authorization, toLowerCase, updateUsedBook);

// POST /api/usedbook/:id - Delete used book
router.delete("/:id", authorization, toLowerCase, deleteUsedBook);

export default router;
