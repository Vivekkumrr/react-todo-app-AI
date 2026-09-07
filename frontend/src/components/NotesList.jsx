export default function NotesList({ notes, onOpen, onDelete, onToggle, search, filter }) {
  const filteredNotes = notes
    .filter((note) => {
      if (filter === 'active') return !note.completed;
      if (filter === 'completed') return note.completed;
      return true;
    })
    .filter((note) => {
      const query = (search || '').toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });

  return (
    <div className="notes-grid">
      {filteredNotes.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No notes found. Click "Create Note" to add one!</p>
        </div>
      ) : (
        filteredNotes.map((note) => (
          <article
            key={note.id}
            className={`note-card ${note.completed ? 'completed' : ''}`}
            onClick={() => onOpen(note)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpen(note)}
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
        ))
      )}
    </div>
  );
}
