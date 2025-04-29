import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Folder } from "../types";
import { FiFolder, FiEdit2 } from "react-icons/fi";

interface SidebarFolderItemProps {
  folder: Folder;
  isSelected: boolean;
  onClick: () => void;
  onRename: (id: string, newName: string) => void;
}

export default function SidebarFolderItem({
  folder,
  isSelected,
  onClick,
  onRename,
}: SidebarFolderItemProps) {
  const { setNodeRef, isOver } = useDroppable({ id: folder.id });
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  const handleRename = () => {
    setIsEditing(false);
    if (name.trim()) onRename(folder.id, name.trim());
  };

  const bgColor = isSelected
    ? "bg-red-600"
    : isOver
    ? "bg-red-300"
    : "hover:bg-gray-800";

  const textColor = isOver ? "text-black" : "text-white";

  return (
    <div
      ref={setNodeRef}
      className={`p-3 rounded-md text-sm cursor-pointer transition-all duration-200 flex items-center gap-2 ${bgColor} ${textColor}`}
    >
      <FiFolder size={18} />
      {isEditing ? (
        <input
          className="bg-transparent outline-none border-b border-white text-sm flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => e.key === "Enter" && handleRename()}
          autoFocus
        />
      ) : (
        <div onClick={onClick} className="flex-1">
          {folder.name}
        </div>
      )}
      <FiEdit2
        size={14}
        className="hover:text-yellow-400"
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
}
