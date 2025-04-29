import { Folder } from "../types";

export const initialFolders: Folder[] = [
  {
    id: "folder-1",
    name: "Frontend Projects",
    projects: [
      { id: "project-1", name: "Landing Page" },
      { id: "project-2", name: "Dashboard UI" },
    ],
  },
  {
    id: "folder-2",
    name: "Backend Projects",
    projects: [
      { id: "project-3", name: "API Development" },
      { id: "project-4", name: "Database Design" },
    ],
  },
  {
    id: "folder-3",
    name: "Mobile Projects",
    projects: [
      { id: "project-5", name: "iOS App" },
      { id: "project-6", name: "Android App" },
    ],
  },
];
