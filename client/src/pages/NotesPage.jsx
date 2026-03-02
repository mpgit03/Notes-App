import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import { createNote, deleteNote, fetchNotes } from '../api/notes';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const loadNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load notes.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = async (payload) => {
    setSaving(true);
    setError('');
    try {
      const created = await createNote(payload);
      setNotes((prev) => [created, ...prev]);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to save note.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete note.';
      setError(message);
    }
  };

  const handleEdit = (note) => {
    navigate(`/notes/${note._id}/edit`);
  };

  return (
    <>
      <section className="notes-page-header stack-md">
        <div>
          <h1 className="notes-page-title">Notes</h1>
          <p className="notes-page-subtitle">
            A simple workspace to capture ideas, tasks, and anything you want to remember.
          </p>
        </div>
        <div className="notes-filters">
          <span>All notes</span>
          <span className="text-xs text-muted">Sorted by most recent</span>
        </div>
      </section>
      <div className="notes-layout">
        <div className="stack-md">
          <NoteForm onSubmit={handleCreate} initialNote={null} onCancel={undefined} />
          {saving && <p className="text-xs text-muted">Saving note...</p>}
          {error && <div className="alert">{error}</div>}
        </div>
        <div className="stack-md">
          {loading ? (
            <p className="notes-empty">Loading notes…</p>
          ) : notes.length === 0 ? (
            <p className="notes-empty">No notes yet. Create your first note on the left.</p>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteItem key={note._id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotesPage;

