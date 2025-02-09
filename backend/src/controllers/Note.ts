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
    const notes = await Note.find(); // Fetch all notes from the database
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

