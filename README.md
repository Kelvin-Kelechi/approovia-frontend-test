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

```text
public/
└── vite.svg

src/
├── assets/
│   └── react.svg                      # Static assets
├── components/                        # UI components
│   ├── Dashboard.tsx                  # Displays projects in selected folder
│   ├── EmptyState.tsx                 # Shown when a folder has no projects
│   ├── ProjectCard.tsx                # Draggable project item with rename
│   ├── Sidebar.tsx                    # Sidebar with folders
│   └── SidebarFolderItem.tsx         # Folder item in sidebar
├── data/
│   └── folders.ts                     # Initial folder/project data
├── types/
│   └── index.ts                       # TypeScript interfaces (Folder, Project)
├── utils/
│   └── dragHandlers.ts                # Extracted drag-and-drop logic
├── App.tsx                            # Main app logic and layout
├── index.css                          # Tailwind and base styles
├── main.tsx                           # Entry point
└── vite-env.d.ts                      # Type declarations

.gitignore  
eslint.config.js                       # ESLint config
index.html                             # HTML entry
package-lock.json  
package.json  
postcss.config.js  
README.md                              # Project documentation
structure.txt                          # File tree outline
tailwind.config.js                     # Tailwind config
tsconfig.app.json  
tsconfig.json                          # TypeScript config
tsconfig.node.json  
vite.config.ts                         # Vite configuration

```
## 🔗 Live Demo

Visit **`https://approovia-frontend-test.vercel.app/`**
