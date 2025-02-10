import { useEffect, useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { fetchNotes, addNote, updateNote, deleteNote } from "../api/fetchNoteApi"; // Import delete function

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string | number | Date;
}

const HomePage = () => {
  const { logoutUser } = useAuthStore();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Fetch and sort notes
  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      if (Array.isArray(data)) {
        const sortedNotes = data
          .filter((note) => note.createdAt)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotes(sortedNotes);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Handle adding or updating a note
  const handleAddOrUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("Title and content required");

    try {
      if (editingNote) {
        await updateNote(editingNote._id, { title, content });
        alert("✅ Note updated successfully!");
      } else {
        await addNote({ title, content });
        alert("✅ Note added successfully!");
      }

      setTitle("");
      setContent("");
      setEditingNote(null);
      await loadNotes();
    } catch (error) {
      console.error("Error updating or adding note:", error);
    }
  };

  // Handle deleting a note with confirmation
  const handleDeleteNote = async (id: string) => {
    const confirmDelete = window.confirm("❌ Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await deleteNote(id);
      alert("🗑️ Note deleted successfully!");
      await loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Handle editing a note
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Todo App</h1>
        <nav>
          <ul className="flex space-x-2">
            <li className="cursor-pointer hover:p-2 hover:rounded-md hover:text-blue hover:bg-bluecont">Github</li>
            <li className="cursor-pointer hover:p-2 hover:rounded-md hover:text-blue hover:bg-bluecont">Facebook</li>
          </ul>
        </nav>
        <button className="shadow-xl hover:p-2 hover:rounded-md hover:text-blue hover:bg-bluecont  px-4 py-2 rounded-md" onClick={logoutUser}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-lg mx-auto mt-10 p-10 bg-white shadow-xl rounded-lg">
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
          <button type="submit" className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue-600">
            {editingNote ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* Notes list */}
        <ul className="mt-5 space-y-3 h-60 overflow-y-auto border p-2 rounded-md">
          {notes.map((note) => (
            <li key={note._id} className="p-3 border rounded-md bg-gray-100 flex justify-between items-center">
              <div>
                <strong className="block text-lg">{note.title}</strong>
                <p className="text-gray-600">{note.content}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-blue text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="bg-red text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
