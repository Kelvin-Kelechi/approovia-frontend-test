import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { initialFolders } from "./data/folders";
import { Folder, Project } from "./types";
import { Toaster, toast } from "react-hot-toast";
export default function App() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [selectedFolderId, setSelectedFolderId] = useState<string>(
    initialFolders[0].id
  );

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) {
    toast.error(`Project move cancelled.`, {
      duration: 3000,
      style: {
        background: "black",
        color: "white",
      },
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
      style: {
        background: "black",
        color: "white",
      },
    });
    return;
  }

  // ✅ FIND the folder where project currently lives
  const sourceFolder = folders.find((folder) =>
    folder.projects.some((project) => project.id === projectId)
  );

  if (!sourceFolder) {
    toast.error(`Project move cancelled.`, {
      duration: 3000,
      style: {
        background: "black",
        color: "white",
      },
    });
    return;
  }

  // ✅ FIND the actual project details
  const project = sourceFolder.projects.find((p) => p.id === projectId);

  if (!project) {
    toast.error(`Project move cancelled.`, {
      duration: 3000,
      style: {
        background: "black",
        color: "white",
      },
    });
    return;
  }

  // 🛑 If user dropped into SAME folder → No need to move
  if (sourceFolder.id === targetFolderId) {
    toast.error(`Project "${project.name}" move cancelled.`, {
      duration: 3000,
      style: {
        background: "black",
        color: "white",
      },
    });
    return;
  }

  // ✅ Otherwise move project
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
      style: {
        background: "black",
        color: "white",
      },
    });
  } else {
    toast.error(`Project move cancelled.`, {
      duration: 3000,
      style: {
        background: "black",
        color: "white",
      },
    });
  }
};

  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId
  )!;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex min-h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Sidebar
          folders={folders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={setSelectedFolderId}
        />
        <Dashboard folder={selectedFolder} />
      </div>
    </DndContext>
  );
}
