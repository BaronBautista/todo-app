import express from "express";
import { addNote } from "../controllers/addNote"; // Import correctly

const router = express.Router();

// Define the route for adding a note
router.post("/addNote", addNote);

export default router;
