# Noteify Tech Stack & Conventions

A simple guide to the tech stack and coding practices used in this project.

## Tech Stack
- **React (v19)**: For creating the user interface using reusable components.
- **Vite**: Used as the build tool and development server for fast builds.
- **Vanilla CSS**: Standard CSS used for dark theme styles, responsive layout, and transitions.

## Project Rules
- **State**: Keep notes state in React and save it for accessing all the generated notes using `localstorage`.
- **Components**: Use separate components for the note list and editor modal rather than using 'App.jsx` component.
- **Editing**: Make notes modal clickable for editing and saving the notes.
- **Accessibility**: Support keyboard opening and Escape-to-close for the modal.
- **Validation**: Trim note text and do not save empty content.
