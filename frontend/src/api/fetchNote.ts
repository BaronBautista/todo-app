const API_URL = "http://localhost:5000/api/addNote";

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}/list`);
  return response.json();
};

export const addNote = async (note: { title: string; content: string }) => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
};
