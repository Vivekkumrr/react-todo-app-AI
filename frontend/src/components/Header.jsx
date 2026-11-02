export default function Header({ currentView, onViewChange }) {
  return (
    <header className="app-header">
      <div className="logo-section">
        <span className="logo-icon">📝</span>
        <h1>Noteify</h1>
      </div>
      <p className="subtitle">Capture your thoughts & manage tasks seamlessly</p>

      <nav className="app-nav">
        <button
          className={`nav-link ${currentView === 'list' ? 'active' : ''}`}
          onClick={() => onViewChange('list')}
          aria-current={currentView === 'list' ? 'page' : undefined}
        >
          My Notes & Tasks
        </button>
        <button
          className={`nav-link ${currentView === 'create' ? 'active' : ''}`}
          onClick={() => onViewChange('create')}
          aria-current={currentView === 'create' ? 'page' : undefined}
        >
          Create Note
        </button>
      </nav>
    </header>
  );
}
