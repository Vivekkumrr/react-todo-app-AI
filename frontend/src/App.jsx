import { useState, useEffect } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import NoteModal from './components/NoteModal';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes-todo');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [currentView, setCurrentView] = useState('list'); // 'list' | 'create'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes-todo', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newNote = {
      id: Date.now(),
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setCurrentView('list'); // Redirect back to notes list after adding
  };

  const handleToggleComplete = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const openNote = (note) => {
    setActiveNote(note);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveNote(null);
  };

  const handleSaveFromModal = (updated) => {
    setNotes(notes.map((n) => (n.id === updated.id ? { ...n, ...updated } : n)));
    closeModal();
  };

  const filteredNotes = notes
    .filter((note) => {
      if (filter === 'active') return !note.completed;
      if (filter === 'completed') return note.completed;
      return true;
    })
    .filter((note) => {
      const query = search.toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <span className="logo-icon">📝</span>
          <h1>Noteify</h1>
        </div>
        <p className="subtitle">Capture your thoughts & manage tasks seamlessly</p>
        
        <nav className="app-nav">
          <button
            className={`nav-link ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            My Notes & Tasks
          </button>
          <button
            className={`nav-link ${currentView === 'create' ? 'active' : ''}`}
            onClick={() => setCurrentView('create')}
          >
            Create Note
          </button>
        </nav>
      </header>

      <main className="app-main-content">
        {currentView === 'create' ? (
          <section className="input-section page-fade-in">
            <form onSubmit={handleAddNote} className="note-form">
              <h2>Create New Note</h2>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="note-title-input"
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
                />
              </div>
              <button type="submit" className="add-btn">
                Add Note & Task
              </button>
            </form>
          </section>
        ) : (
          <section className="notes-list-section page-fade-in">
            <div className="controls-bar">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({notes.length})
                </button>
                <button
                  className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                  onClick={() => setFilter('active')}
                >
                  Active ({notes.filter((n) => !n.completed).length})
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed ({notes.filter((n) => n.completed).length})
                </button>
              </div>
            </div>

            <div className="notes-grid">
              {filteredNotes.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <p>No notes found. Click "Create Note" to add one!</p>
                </div>
              ) : (
                <NotesList
                  notes={notes}
                  onOpen={openNote}
                  onDelete={handleDeleteNote}
                  onToggle={handleToggleComplete}
                  search={search}
                  filter={filter}
                />
              )}
            </div>
          </section>
        )}
      </main>
      <NoteModal
        key={`${activeNote?.id ?? 'closed'}-${modalOpen}`}
        open={modalOpen}
        note={activeNote}
        onClose={closeModal}
        onSave={handleSaveFromModal}
      />
    </div>
  );
}

export default App;

