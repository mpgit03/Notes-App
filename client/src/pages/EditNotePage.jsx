import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { fetchNoteById, updateNote } from '../api/notes';

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchNoteById(id);
        setNote(data);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load note.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSaving(true);
    setError('');
    try {
      await updateNote(id, payload);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update note.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 1rem 2rem'
      }}
    >
      {loading ? (
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Loading note...</p>
      ) : error ? (
        <div
          style={{
            marginBottom: '0.75rem',
            padding: '0.5rem 0.7rem',
            borderRadius: '0.375rem',
            backgroundColor: '#fef2f2',
            color: '#b91c1c',
            fontSize: '0.85rem'
          }}
        >
          {error}
        </div>
      ) : (
        <>
          <NoteForm onSubmit={handleSubmit} initialNote={note} onCancel={handleCancel} />
          {saving && (
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Saving changes...
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default EditNotePage;

