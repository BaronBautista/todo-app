import { useEffect, useState } from "react";
import { fetchNotes, addNote } from "../api/fetchNote";

interface Note {
  _id: string; // Ensure each note has an ID from MongoDB
  title: string;
  content: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Function to fetch and update notes from database
  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    loadNotes(); // Fetch notes when component mounts
  }, []);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content required");

    try {
      await addNote({ title, content }); // Add note to database
      setTitle("");
      setContent("");
      await loadNotes(); // ✅ Fetch latest notes from database after adding
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Notes</h2>

      {/* Form to add a note */}
      <form onSubmit={handleAddNote} className="space-y-3">
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
          Add Note
        </button>
      </form>

      {/* Notes list */}
      <ul className="mt-5 space-y-3">
        {notes.map((note) => (
          <li key={note._id} className="p-3 border rounded-md bg-gray-100">
            <strong className="block text-lg">{note.title}</strong>
            <p className="text-gray-600">{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
