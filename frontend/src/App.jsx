import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import ControlsBar from './components/ControlsBar';
import NotesList from './components/NotesList';
import NoteModal from './components/NoteModal';

const STORAGE_KEY = 'notes-todo';

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // Corrupted or unavailable storage: start fresh instead of crashing
    return [];
  }
}

function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [currentView, setCurrentView] = useState('list'); // 'list' | 'create'
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
      console.error('Could not save notes:', err);
    }
  }, [notes]);

  const handleAddNote = ({ title, content }) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setCurrentView('list');
  };

  const handleToggleComplete = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
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
    setNotes((prev) =>
      prev.map((n) => (n.id === updated.id ? { ...n, ...updated } : n))
    );
    closeModal();
  };

  // Filtering happens once, here. NotesList only renders what it receives.
  const query = search.toLowerCase();
  const filteredNotes = notes
    .filter((note) => {
      if (filter === 'active') return !note.completed;
      if (filter === 'completed') return note.completed;
      return true;
    })
    .filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );

  const activeCount = notes.filter((n) => !n.completed).length;
  const completedCount = notes.length - activeCount;

  return (
    <div className="app-container">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      <main className="app-main-content">
        {currentView === 'create' ? (
          <NoteForm onAddNote={handleAddNote} />
        ) : (
          <section className="notes-list-section page-fade-in">
            <ControlsBar
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
              totalNotesCount={notes.length}
              activeCount={activeCount}
              completedCount={completedCount}
            />
            <NotesList
              notes={filteredNotes}
              onOpen={openNote}
              onDelete={handleDeleteNote}
              onToggle={handleToggleComplete}
            />
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