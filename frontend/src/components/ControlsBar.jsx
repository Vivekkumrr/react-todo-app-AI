const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function ControlsBar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  totalNotesCount,
  activeCount,
  completedCount,
}) {
  const counts = {
    all: totalNotesCount,
    active: activeCount,
    completed: completedCount,
  };

  return (
    <div className="controls-bar">
      <div className="search-box">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <div className="filter-group">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
            onClick={() => onFilterChange(key)}
            aria-pressed={filter === key}
          >
            {label} ({counts[key]})
          </button>
        ))}
      </div>
    </div>
  );
}