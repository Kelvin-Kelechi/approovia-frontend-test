import { Folder } from "../types";
import SidebarFolderItem from "./SidebarFolderItem";

interface SidebarProps {
  folders: Folder[];
  selectedFolderId: string;
  onSelectFolder: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}
export default function Sidebar({
  folders,
  selectedFolderId,
  onSelectFolder,
  onRename,
}: SidebarProps) {
  return (
    <div className="bg-black w-full sm:w-[280px] text-white p-4 sm:p-6 flex flex-col gap-4 sm:relative z-10">
      <div className="p-4 text-xl text-center border-b border-gray-700 mb-4 font-bold">
        <h2 className="text-xl font-bold">Approovia</h2>
      </div>

      {folders.map((folder) => (
        <SidebarFolderItem
          key={folder.id}
          folder={folder}
          isSelected={folder.id === selectedFolderId}
          onClick={() => onSelectFolder(folder.id)}
          onRename={onRename}
        />
      ))}
    </div>
  );
}
