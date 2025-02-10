const API_URL = "http://localhost:5003/api/addNote";
const getNotesApi = "http://localhost:5003/api/getNotes";
const updateNoteApi = "http://localhost:5003/api/updateNote";
const delNoteApi = "http://localhost:5003/api/notes";

export const fetchNotes = async () => {
  const response = await fetch(`${getNotesApi}`);
  return response.json();
};

export const addNote = async (note: { title: string; content: string }) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateNote = async (id: string, note: { title: string; content: string }) => {
  const response = await fetch(`${updateNoteApi}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const deleteNote = async (id: string) => {
  try {
    const response = await fetch(`${delNoteApi}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
