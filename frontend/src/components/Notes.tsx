import { useEffect, useState } from "react";
import { fetchNotes, addNote, updateNote } from "../api/fetchNote";

interface Note {
  _id: string;
  title: string;
  content: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Function to load notes from the database
  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      console.log("Fetched Notes:", data); // Debugging line
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    loadNotes(); // Fetch notes when component mounts
  }, []);

  // Handle adding or updating a note
  const handleAddOrUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return alert("Title and content required");

    if (editingNote) {
      // Update existing note
      await updateNote(editingNote._id, { title, content });
    } else {
      // Add a new note
      await addNote({ title, content });
    }

    setTitle("");
    setContent("");
    setEditingNote(null);
    loadNotes(); // Refresh notes from database
  };

  // Handle setting a note for editing
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Notes</h2>

      {/* Form to add or update a note */}
      <form onSubmit={handleAddOrUpdateNote} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue-600"
        >
          {editingNote ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes list */}
      <ul className="mt-5 space-y-3 h-60 overflow-y-auto border p-2 rounded-md">
        {notes.map((note) => (
          <li
            key={note._id}
            className="p-3 border rounded-md bg-gray-100 flex justify-between items-center"
          >
            <div>
              <strong className="block text-lg">{note.title}</strong>
              <p className="text-gray-600">{note.content}</p>
            </div>
            <button
              onClick={() => handleEdit(note)}
              className="bg-blue text-white px-3 py-1 rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
