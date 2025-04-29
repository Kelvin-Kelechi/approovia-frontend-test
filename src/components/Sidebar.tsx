import { Folder } from "../types";
import SidebarFolderItem from "./SidebarFolderItem";

interface SidebarProps {
  folders: Folder[];
  selectedFolderId: string;
  onSelectFolder: (id: string) => void;
}

export default function Sidebar({
  folders,
  selectedFolderId,
  onSelectFolder,
}: SidebarProps) {
  return (
    <div className="w-64 bg-black w-[280px] text-white p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-red-500">Folders</h2>
      {folders.map((folder) => (
        <SidebarFolderItem
          key={folder.id}
          folder={folder}
          isSelected={folder.id === selectedFolderId}
          onClick={() => onSelectFolder(folder.id)}
        />
      ))}
    </div>
  );
}
