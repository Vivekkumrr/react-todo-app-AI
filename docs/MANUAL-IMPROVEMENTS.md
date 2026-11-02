# Manual Improvements:
1. Component Refactoring

This document lists manual changes such as breaking down `App.jsx` into smaller, reusable components.

---

## Changes Made in `App.jsx`

`App.jsx` was previously holding all the markup and UI logic in one file. It has been refactored to only manage top-level state and render dedicated components:

1. **Header Component (`Header.jsx`)**
   - Moved the app logo, title, subtitle, and navigation buttons (`My Notes & Tasks` / `Create Note`) out of `App.jsx`.
   - `App.jsx` now simply passes `currentView` and `onViewChange`.

2. **Note Form Component (`NoteForm.jsx`)**
   - Moved the note creation form, input fields (title & content), and local form state out of `App.jsx`.
   - `App.jsx` receives the new note via the `onAddNote` callback.

3. **Controls Bar Component (`ControlsBar.jsx`)**
   - Moved the search input and status filter buttons (`All`, `Active`, `Completed`) along with their count badges out of `App.jsx`.
   - Handled via props passed from `App.jsx` (`search`, `filter`, counts, and change handlers).

4. **Notes List Component (`NotesList.jsx`)**
   - Displays the filtered notes grid and empty state.
   - Cleaned up so it only receives and renders pre-filtered notes.

5. **Note Modal Component (`NoteModal.jsx`)**
   - Handles the popup modal for viewing and editing notes.

---

## Resulting File Structure

```text
src/
├── components/
│   ├── ControlsBar.jsx   # Search and filter controls
│   ├── Header.jsx        # Logo and tab navigation
│   ├── NoteForm.jsx      # Note creation form
│   ├── NoteModal.jsx     # View / edit note modal
│   └── NotesList.jsx     # Grid displaying notes
├── App.css
├── App.jsx               # Main state container (~130 lines)
├── index.css
└── main.jsx
```
