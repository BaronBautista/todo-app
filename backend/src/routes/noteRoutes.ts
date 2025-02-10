import express from "express";
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/Note"; // Import correctly


const router = express.Router();


router.get("/getNotes", getNotes);
router.post("/addNote", addNote);
router.put("/updateNote/:id", updateNote); 
router.delete("/notes/:id", deleteNote); // ✅ Add the DELETE route here

export default router;
