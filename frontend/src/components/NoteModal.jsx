import { useEffect, useState } from 'react';

export default function NoteModal({ open, note, onClose, onSave }) {
  const [title, setTitle] = useState(() => note?.title || 'Untitled Note');
  const [content, setContent] = useState(() => note?.content || '');

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card popup-scale"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className="modal-header">
          <input
            className="note-edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </header>

        <div className="modal-body">
          <textarea
            className="note-edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
        </div>

        <footer className="modal-footer">
          <button
            className="save-btn"
            onClick={() => onSave({ ...note, title: title.trim() || 'Untitled Note', content: content.trim() })}
          >
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
