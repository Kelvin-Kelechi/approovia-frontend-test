import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { initialFolders } from "./data/folders";
import { Folder, Project } from "./types";
import { Toaster, toast } from "react-hot-toast";
import ProjectCard from "./components/ProjectCard";

export default function App() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [selectedFolderId, setSelectedFolderId] = useState<string>(
    initialFolders[0].id
  );
    const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Responsive: auto-show sidebar on large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setShowSidebar(true);
    };
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRenameFolder = (id: string, newName: string) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
  };

  const handleRenameProject = (id: string, newName: string) => {
    setFolders((prev) =>
      prev.map((folder) => ({
        ...folder,
        projects: folder.projects.map((p) =>
          p.id === id ? { ...p, name: newName } : p
        ),
      }))
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeEl = document.activeElement;
    setActiveProject(null);

    if (
      activeEl?.tagName === "INPUT" ||
      activeEl?.closest("[data-editing]") ||
      document.querySelector("[data-editing]:focus")
    ) {
      return;
    }

    if (!over) {
      toast.error(`Project move cancelled.`, {
        duration: 3000,
        style: { background: "black", color: "white" },
      });
      return;
    }

    const projectId = active.id as string;
    const targetFolderId = over.id as string;

    if (
      !projectId.startsWith("project") ||
      !targetFolderId.startsWith("folder")
    ) {
      toast.error(`Project move cancelled.`, {
        duration: 3000,
        style: { background: "black", color: "white" },
      });
      return;
    }

    const sourceFolder = folders.find((folder) =>
      folder.projects.some((project) => project.id === projectId)
    );
    if (!sourceFolder) return;

    const project = sourceFolder.projects.find((p) => p.id === projectId);
    if (!project) return;

    if (sourceFolder.id === targetFolderId) {
      toast.error(`Project "${project.name}" move cancelled.`, {
        duration: 3000,
        style: { background: "black", color: "white" },
      });
      return;
    }

    let movedProject: Project | undefined;

    const updatedFolders = folders.map((folder) => {
      const filteredProjects = folder.projects.filter((project) => {
        if (project.id === projectId) {
          movedProject = project;
          return false;
        }
        return true;
      });
      return { ...folder, projects: filteredProjects };
    });

    if (movedProject) {
      const finalFolders = updatedFolders.map((folder) => {
        if (folder.id === targetFolderId) {
          return { ...folder, projects: [...folder.projects, movedProject!] };
        }
        return folder;
      });

      setFolders(finalFolders);
      setSelectedFolderId(targetFolderId);

      toast.success(`Project "${movedProject.name}" moved successfully!`, {
        duration: 3000,
        style: { background: "black", color: "white" },
      });
    }
  };

  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId
  )!;

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => {
        const proj = folders
          .flatMap((f) => f.projects)
          .find((p) => p.id === active.id);
        setActiveProject(proj ?? null);
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Mobile navbar toggle */}
      <div className="sm:hidden flex items-center justify-between p-4 bg-black text-white">
        <button onClick={() => setShowSidebar((prev) => !prev)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">My Projects</h1>
      </div>

      {/* Layout */}
      <div className="flex flex-col sm:flex-row min-h-screen relative">
        {/* Sidebar: visible on desktop or toggled on mobile */}
        {showSidebar && (
          <Sidebar
            folders={folders}
            selectedFolderId={selectedFolderId}
            onSelectFolder={(id) => {
              setSelectedFolderId(id);
              if (window.innerWidth < 640) setShowSidebar(false); // close on mobile
            }}
            onRename={handleRenameFolder}
          />
        )}

        {/* Main dashboard */}
        <Dashboard
          folder={selectedFolder}
          onRenameProject={handleRenameProject}
        />
        <DragOverlay>
          {activeProject ? (
            <ProjectCard
              project={activeProject}
              onRename={() => {}}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
