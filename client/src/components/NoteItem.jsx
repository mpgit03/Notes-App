import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <article className="card card-pad-md stack-sm">
      <header className="note-meta">
        <h3 className="note-title">{note.title}</h3>
        <span className="note-time">
          {new Date(note.updatedAt || note.createdAt).toLocaleString()}
        </span>
      </header>
      <p className="note-body">{note.content}</p>
      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
        <button className="btn btn-outline btn-xs" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="btn btn-danger btn-xs" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default NoteItem;

