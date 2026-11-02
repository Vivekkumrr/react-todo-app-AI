# Prompts Used in Noteify Development

This file lists the prompts used to build Noteify, along with a simple comparison of vague vs. precise prompting.

---

## 1. Initial App Setup

### Prompt:
> "Create a modern, responsive Notes and Todo application in React with Vite. Use a dark gradient theme with glassmorphism cards and custom CSS styling. Include a note creation form, a search bar, active/completed filters, and persist all notes in localStorage. Use simple state navigation between 'My Notes' and 'Create Note' without installing external routing packages."

---

## 2. Vague vs. Precise Prompting (Edit Feature)

### The Vague Prompt:
> "Make notes editable."

* **What happened:** It added messy edit boxes and buttons directly inside the note cards, breaking the grid layout and making `App.jsx` too crowded.

---

### The Precise Prompt:
> "Refactor the note cards into a standalone `NotesList.jsx` component and build a separate modal editor in `NoteModal.jsx`. When a note card is clicked or focused and Enter is pressed, open the modal dialog to view and edit its title and content. Include validation to prevent empty content, close on Escape key or backdrop click, add proper ARIA dialog attributes (`role="dialog"`, `aria-modal="true"`), and use `e.stopPropagation()` on the delete button and complete checkbox so they don't trigger the modal."

* **What happened:** It created clean, separate components (`NotesList.jsx` and `NoteModal.jsx`), a smooth popup window to edit notes, and support for the `Escape` and `Enter` keys.

---

## 3. Fixing Deployment Issues

### Prompt:
> "identify problems with the file struture for this repo to avoid any deployment or live server issues"

### Follow-up:
> "or else add the favicon.svg using terminal commands if its empty"

### Follow-up:
> "now, check if there are any deployment issues as i have fixed some of them now"

---

## 4. Documentation & Improvements

### Prompt:
> "related to search on workflow.md and antigravity.md, add how ai has assisted throughout the development of this notes application in ai-assistance.md"

### Follow-up:
> "based on references, add simple manual improvements which i thought about that is dividing into seperate components"


