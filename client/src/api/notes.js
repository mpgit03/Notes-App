import api from './api';

export const fetchNotes = async () => {
  const response = await api.get('/api/notes');
  return response.data;
};

export const fetchNoteById = async (id) => {
  const response = await api.get(`/api/notes/${id}`);
  return response.data;
};

export const createNote = async (payload) => {
  const response = await api.post('/api/notes', payload);
  return response.data;
};

export const updateNote = async (id, payload) => {
  const response = await api.put(`/api/notes/${id}`, payload);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/api/notes/${id}`);
  return response.data;
};

