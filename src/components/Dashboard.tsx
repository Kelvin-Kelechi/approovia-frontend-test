import { useDroppable } from "@dnd-kit/core";
import { Folder } from "../types";
import ProjectCard from "./ProjectCard";

interface DashboardProps {
  folder: Folder;
  onRenameProject: (id: string, newName: string) => void; 
}

export default function Dashboard({ folder, onRenameProject }: DashboardProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: folder.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-10 transition-colors ${
        isOver ? "bg-red-50" : "bg-gray-50"
      }`}
    >
      <h2 className="text-2xl font-bold text-black mb-8">{folder.name}</h2>

      {folder.projects.length === 0 ? (
        <p className="text-gray-400">No projects in this folder.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {folder.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onRename={onRenameProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
