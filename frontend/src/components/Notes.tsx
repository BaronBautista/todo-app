interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NotesProps {
  notes: Note[];
  handleEdit: (note: Note) => void;
}

const Notes = ({ notes, handleEdit }: NotesProps) => {
  return (
    <ul className="mt-5 space-y-3 h-60 overflow-y-auto border p-2 rounded-md">
      {notes.length > 0 ? (
        notes.map((note) => (
          <li key={note._id} className="p-3 border rounded-md bg-gray-100 flex justify-between items-center">
            <div>
              <strong className="block text-lg">{note.title}</strong>
              <p className="text-gray-600">{note.content}</p>
            </div>
            <button
              onClick={() => handleEdit(note)}
              className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
          </li>
        ))
      ) : (
        <p className="text-gray-500 text-center">No notes available.</p>
      )}
    </ul>
  );
};

export default Notes;
