import { useDroppable } from "@dnd-kit/core";
import { Folder } from "../types";

interface SidebarFolderItemProps {
  folder: Folder;
  isSelected: boolean;
  onClick: () => void;
}

export default function SidebarFolderItem({
  folder,
  isSelected,
  onClick,
}: SidebarFolderItemProps) {
  const { setNodeRef, isOver } = useDroppable({ id: folder.id });

const bgColor = isSelected
  ? "bg-red-600"  
  : isOver
  ? "bg-red-300"  
  : "hover:bg-gray-800";  

const textColor = isSelected
  ? "text-white"  
  : isOver
  ? "text-black" 
  : "text-white";  

return (
  <div
    ref={setNodeRef}
    onClick={onClick}
    className={`p-3 rounded-md cursor-pointer transition-all duration-200 ${bgColor} ${textColor}`}
  >
    {folder.name}
  </div>
);
}
