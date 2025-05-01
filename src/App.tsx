import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { initialFolders } from "./data/folders";
import { Folder, Project } from "./types";
import { Toaster, toast } from "react-hot-toast";
import ProjectCard from "./components/ProjectCard";
import { moveProjectToFolder } from "./utils/dragHandlers.ts";

export default function App() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [selectedFolderId, setSelectedFolderId] = useState<string>(
    initialFolders[0].id
  );
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setShowSidebar(true);
    };
    handleResize();
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
      toast.error(`Invalid drag target.`, {
        duration: 3000,
        style: { background: "black", color: "white" },
      });
      return;
    }

    const { updated, movedProject, error } = moveProjectToFolder(
      folders,
      projectId,
      targetFolderId
    );

    if (error) {
      toast.error(error, {
        duration: 3000,
        style: { background: "black", color: "white" },
      });
      return;
    }

    setFolders(updated);
    setSelectedFolderId(targetFolderId);

    toast.success(`Project "${movedProject!.name}" moved successfully!`, {
      duration: 3000,
      style: { background: "black", color: "white" },
    });
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
        <h1 className="text-lg font-semibold">Project Dashboard</h1>
      </div>

      <div className="flex flex-col sm:flex-row min-h-screen relative">
        {showSidebar && (
          <Sidebar
            folders={folders}
            selectedFolderId={selectedFolderId}
            onSelectFolder={(id) => {
              setSelectedFolderId(id);
              if (window.innerWidth < 640) setShowSidebar(false);
            }}
            onRename={handleRenameFolder}
          />
        )}

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
