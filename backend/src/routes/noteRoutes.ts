import express from "express";
import { getNotes, addNote } from "../controllers/Note"; // Import correctly


const router = express.Router();

// Define the route for adding a note
router.post("/addNote", addNote);
router.get("/getNotes", getNotes);

export default router;
