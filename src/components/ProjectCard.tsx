import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Project } from "../types";
import { FiEdit2 } from "react-icons/fi";
import { RxDragHandleDots2 } from "react-icons/rx";

interface ProjectCardProps {
  project: Project;
  onRename: (id: string, newName: string) => void;
}

export default function ProjectCard({ project, onRename }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: project.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    willChange: "transform",
  };

  const handleRename = () => {
    setIsEditing(false);
    if (name.trim()) onRename(project.id, name.trim());
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-5 rounded-lg flex flex-col justify-between h-[250px]
        transition-all duration-200 ease-in-out
        border
        ${
          isDragging
            ? "scale-105 shadow-2xl border-[#A93636] bg-[#F9E9E9]"
            : "border-black bg-white"
        }
        hover:scale-105 hover:shadow-lg hover:border-[#A93636] hover:bg-[#F9E9E9]
        ${isEditing ? "cursor-text" : "cursor-default"}`}
    >
      {/* Top bar: drag handle + edit */}
      <div className="flex justify-between items-center mb-4">
        <RxDragHandleDots2
          size={20}
          className="cursor-move text-gray-400"
          {...(!isEditing ? listeners : {})}
          {...(!isEditing ? attributes : {})}
        />

        <FiEdit2
          size={16}
          className="text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        {isEditing ? (
          <input
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent border-b border-black text-black outline-none text-center w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
        ) : (
          <span className="text-black font-semibold text-lg text-center">
            {project.name}
          </span>
        )}
      </div>
    </div>
  );
}
