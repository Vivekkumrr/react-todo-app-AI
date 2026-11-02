import { useState } from 'react';

export default function NoteForm({ onAddNote }) {
  // Form state lives here, not in App. It resets automatically
  // because this component unmounts when the view changes.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddNote({ title, content });
  };

  return (
    <section className="input-section page-fade-in">
      <form onSubmit={handleSubmit} className="note-form">
        <h2>Create New Note</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-title-input"
            aria-label="Note title"
          />
        </div>
        <div className="input-group">
          <textarea
            placeholder="Write your note/task here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="note-content-input"
            rows="6"
            aria-label="Note content"
          />
        </div>
        <button type="submit" className="add-btn">
          Add Note & Task
        </button>
      </form>
    </section>
  );
}