const API_URL = "http://localhost:5003/api/addNote";
const getNotes = "http://localhost:5003/api/getNotes";
const updateNoteApi = "http://localhost:5003/api/updateNote";

export const fetchNotes = async () => {
  const response = await fetch(`${getNotes}`);
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