import { useDraggable } from "@dnd-kit/core";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: project.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-5 bg-white border flex items-center justify-center h-[250px] hover:border-[#A93636] border-black rounded-lg shadow hover:shadow-lg transition cursor-move hover:bg-[#F9E9E9]"
    >
      <span className="text-black font-semibold">{project.name}</span>
    </div>
  );
}
