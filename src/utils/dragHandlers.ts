import { Folder, Project } from "../types";

export function moveProjectToFolder(
  folders: Folder[],
  projectId: string,
  targetFolderId: string
): {
  updated: Folder[];
  movedProject?: Project;
  error?: string;
} {
  const sourceFolder = folders.find((folder) =>
    folder.projects.some((project) => project.id === projectId)
  );
  if (!sourceFolder)
    return { updated: folders, error: "Source folder not found." };

  const projectToMove = sourceFolder.projects.find((p) => p.id === projectId);
  if (!projectToMove) return { updated: folders, error: "Project not found." };

  if (sourceFolder.id === targetFolderId)
    return {
      updated: folders,
      error: `Project "${projectToMove.name}" move cancelled.`,
    };

  const foldersAfterRemoval = folders.map((folder) =>
    folder.id === sourceFolder.id
      ? {
          ...folder,
          projects: folder.projects.filter((p) => p.id !== projectId),
        }
      : folder
  );

  const updatedFolders = foldersAfterRemoval.map((folder) =>
    folder.id === targetFolderId
      ? {
          ...folder,
          projects: [...folder.projects, { ...projectToMove }],
        }
      : folder
  );

  return { updated: updatedFolders, movedProject: projectToMove };
}
