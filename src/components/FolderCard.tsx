// import { useDroppable } from "@dnd-kit/core";
// import { Folder } from "../types";
// import ProjectCard from "./ProjectCard";
// interface FolderCardProps {
//   folder: Folder;
//   onRenameProject: (id: string, newName: string) => void; // ✅ Add this
// }

// export default function FolderCard({
//   folder,
//   onRenameProject,
// }: FolderCardProps) {
//   const { setNodeRef, isOver } = useDroppable({ id: folder.id });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`p-6 rounded-2xl w-80 min-h-[300px] flex flex-col gap-4 
//     transition-all duration-200 ease-in-out
//     ${
//       isOver
//         ? "bg-red-200 scale-105 shadow-2xl border-2 border-[#A93636]"
//         : "bg-white border border-black shadow-md"
//     }`}
//     >
//       <h2 className="text-lg font-bold text-black">{folder.name}</h2>
//       <div className="flex flex-col gap-3">
//         {folder.projects.map((project) => (
//           <ProjectCard
//             key={project.id}
//             project={project}
//             onRename={onRenameProject}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
