# 🧩 Drag-and-Drop Dashboard (Responsive)

A modern, responsive drag-and-drop dashboard built with React, Typescript, Tailwind CSS, and @dnd-kit.

## 🧠 Planning

- Set up Vite + React + Typescript + Tailwind
- Created folder/project structure
- Sidebar lists folders, Dashboard shows selected folder’s projects
- Implemented drag-and-drop using @dnd-kit
- Added toasts for move/cancel feedback
- Styled UI to match clean red/black/white theme

## 🚀 Features

- Drag-and-drop projects between folders on both mobile and desktop
- Rename projects and folders inline
- Mobile-responsive layout with sidebar toggle
- Visual feedback and drag overlay
- Mock API interactions with toast notifications

## 📦 Tech Stack

- React
- Typescript
- Tailwind CSS
- Drag-and-drop: @dnd-kit/core
- react-hot-toast

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Kelvin-Kelechi/approovia-frontend-test.git
cd approovia-frontend-test
```

### 2. Install Dependencies

```sh
npm install

```

### 3. Start the Development Server

```sh
npm run dev

```

Visit **`http://localhost:5173/`** in your browser.

## 🗂️ Project Structure

public/
    └── vite.svg
src/
    ├── assets/
        └── react.svg
    ├── components/
        ├── Dashboard.tsx
        ├── EmptyState.tsx
        ├── ProjectCard.tsx
        ├── Sidebar.tsx
        └── SidebarFolderItem.tsx
    ├── data/
        └── folders.ts
    ├── types/
        └── index.ts
    ├── utils/
        └── dragHandlers.ts.ts
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    └── vite-env.d.ts
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
postcss.config.js
README.md
structure.txt
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts

## 🔗 Live Demo

Visit http://localhost:5173/
