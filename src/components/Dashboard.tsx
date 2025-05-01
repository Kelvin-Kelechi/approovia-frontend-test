import { useDroppable } from "@dnd-kit/core";
import { Folder } from "../types";
import ProjectCard from "./ProjectCard";
import EmptyState from "./EmptyState";

interface DashboardProps {
  folder: Folder;
  onRenameProject: (id: string, newName: string) => void;
}

export default function Dashboard({ folder, onRenameProject }: DashboardProps) {
  const { setNodeRef, isOver } = useDroppable({ id: folder.id });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto transition-colors ${
        isOver ? "bg-red-50" : "bg-gray-50"
      }`}
    >
      <h2 className="text-2xl font-bold text-black mb-4 sm:mb-6">
        {folder.name}
      </h2>

      {folder.projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
