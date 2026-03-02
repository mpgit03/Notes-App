import React, { useEffect, useState } from 'react';

const NoteForm = ({ onSubmit, initialNote, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="card card-pad-md stack-md">
      <div className="stack-sm">
        <div className="badge-soft text-xs">
          {initialNote ? 'Editing existing note' : 'New note'}
        </div>
        <h2 className="text-lg">{initialNote ? 'Update note' : 'Capture a thought'}</h2>
      </div>

      <div className="field">
        <label htmlFor="note-title" className="field-label">
          Title
        </label>
        <input
          id="note-title"
          type="text"
          placeholder="e.g. Ideas for onboarding flow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
      </div>

      <div className="field">
        <label htmlFor="note-content" className="field-label">
          Content
        </label>
        <textarea
          id="note-content"
          placeholder="Write down details, links, and next steps..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea"
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
        <button type="submit" className="btn btn-primary">
          {initialNote ? 'Save changes' : 'Save note'}
        </button>
        {initialNote && (
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;

