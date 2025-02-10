import { Request, Response } from "express";
import Note from "../models/noteModel";

export const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required." });
      return;
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json({ message: "Note added successfully!", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Error adding note", error });
  }
};

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find(); 
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Get the note ID from URL params
    const { title, content } = req.body; // Get updated data from request body

    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required." });
      return;
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id, 
      { title, content }, 
      { new: true, runValidators: true } // Return updated document
    );

    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(200).json({ message: "Note updated successfully!", note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};
