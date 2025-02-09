const API_URL = "http://localhost:5000/api/addNote";
const getNotes = "http://localhost:5000/api/getNotes";

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
