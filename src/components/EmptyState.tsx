import { FiFolder } from "react-icons/fi";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No Projects Found",
  message = "This folder currently has no projects.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400">
      <FiFolder size={48} className="mb-4 text-gray-300" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}
