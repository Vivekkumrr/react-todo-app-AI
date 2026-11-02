// Presentational component: receives notes that are already filtered by App.
export default function NotesList({ notes, onOpen, onDelete, onToggle }) {
  const handleCardKeyDown = (e, note) => {
    // Ignore keys pressed on inner controls (delete button, checkbox),
    // otherwise Enter on "Delete" would also open the modal.
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(note);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="notes-grid">
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No notes found. Click "Create Note" to add one!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <article
          key={note.id}
          className={`note-card ${note.completed ? 'completed' : ''}`}
          onClick={() => onOpen(note)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleCardKeyDown(e, note)}
        >
          <div className="note-card-header">
            <h3 className="note-card-title">{note.title}</h3>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              title="Delete Note"
              aria-label="Delete Note"
            >
              ×
            </button>
          </div>

          <p className="note-card-content">{note.content}</p>

          <div className="note-card-footer">
            <span className="note-date">{note.createdAt}</span>
            <label
              className="todo-checkbox-container"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={note.completed}
                onChange={() => onToggle(note.id)}
              />
              <span className="checkbox-label">
                {note.completed ? 'Completed' : 'Mark Complete'}
              </span>
            </label>
          </div>
        </article>
      ))}
    </div>
  );
}