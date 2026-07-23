import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/notes",
});

// Get all notes
export const getNotes = async () => {
    const { data } = await API.get("/");
    return data;
};

// Get one note
export const getNote = async (id) => {
    const { data } = await API.get(`/${id}`);
    return data;
};

// Create note
export const createNote = async (note) => {
    const { data } = await API.post("/", note);
    return data;
};

// Update note
export const updateNote = async (id, note) => {
    const { data } = await API.put(`/${id}`, note);
    return data;
};

// Delete note
export const deleteNote = async (id) => {
    const { data } = await API.delete(`/${id}`);
    return data;
};