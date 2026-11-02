# AI Assistance in Noteify

This document explains how AI has assisted in building this notes application.

---

## 1. Initial Setup
* Generated the starter React project using Vite.
* AI provided the basic dark-themed design and CSS layout.
* AI set up simple note saving feature in `App.jsx` so notes stay in the browser even after refreshing the page.

---

## 2. Adding the Note Edit Feature
* Tested vague vs. precise instructions to see how the AI responds.
* When given clear instructions, the AI built a clean popup window to open and edit notes instead of cramming edit boxes directly onto the cards.
* Added keyboard support so users can open notes with the `Enter` key and close the popup with the `Escape` key.
* Made sure clicking the delete button or checkbox doesn't accidentally open the edit popup.

---

## 3. Fixing Deployment Problems
* Found that the project was missing a favicon icon (causing a 404 error) and created a new `favicon.svg` file directly using terminal commands.
* AI Found that `package-lock.json` was accidentally ignored by git.
* Created a root `.gitignore` file to keep unnecessary files out of GitHub.
* Pointed out how to configure hosting settings (like Vercel or Netlify) so they know the app is inside the `frontend/` folder.

---

## 4. Documentation & Structuring
* AI Helped organize notes on prompt comparisons and deployment steps into clear markdown documentation files.
