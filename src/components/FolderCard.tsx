import { useDroppable } from "@dnd-kit/core";
import { Folder } from "../types";
import ProjectCard from "./ProjectCard";

interface FolderCardProps {
  folder: Folder;
}

export default function FolderCard({ folder }: FolderCardProps) {
  const { setNodeRef, isOver } = useDroppable({ id: folder.id });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 rounded-2xl shadow-md w-80 min-h-[300px] flex flex-col gap-4 transition-colors ${
        isOver ? "bg-red-100" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-bold text-black">{folder.name}</h2>
      <div className="flex flex-col gap-3">
        {folder.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
