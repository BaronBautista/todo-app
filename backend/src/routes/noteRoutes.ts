import express from "express";
import { getNotes, addNote, updateNote } from "../controllers/Note"; // Import correctly


const router = express.Router();


router.get("/getNotes", getNotes);
router.post("/addNote", addNote);
router.put("/updateNote/:id", updateNote); 

export default router;
