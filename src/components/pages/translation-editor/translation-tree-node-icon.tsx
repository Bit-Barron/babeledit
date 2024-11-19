import {
  FaChevronRight as ChevronRight,
  FaChevronDown as ChevronDown,
  FaFolder as Folder,
} from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

export const TreeNodeIcon = ({
  type,
  isExpanded,
}: {
  type: "folder" | "translation";
  isExpanded?: boolean;
}) => {
  if (type === "folder") {
    return (
      <>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 mr-1" />
        ) : (
          <ChevronRight className="h-4 w-4 mr-1" />
        )}
        <Folder className="h-4 w-4 mr-2 text-yellow-500" />
      </>
    );
  }
  return (
    <>
      <span className="w-4 mr-1" />
      <FiMessageSquare className="h-4 w-4 mr-2 text-gray-400" />
    </>
  );
};
