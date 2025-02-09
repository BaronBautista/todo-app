import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find(); // Fetch all notes from the database
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

const Note = mongoose.model("Note", noteSchema);


export default Note;
