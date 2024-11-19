import React from "react";
import {
  FaChevronRight as ChevronRight,
  FaChevronDown as ChevronDown,
  FaFolder as Folder,
} from "react-icons/fa";
import { cn } from "@/lib/utils";
import { FiMessageSquare } from "react-icons/fi";

interface TreeNodeProps {
  node: TreeNode;
  path: string;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onNodeClick: (node: TreeNode, path: string) => void;
}

const TreeNodeIcon = ({
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

export const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  path,
  level,
  isExpanded,
  isSelected,
  onNodeClick,
}) => {
  return (
    <div>
      <div
        className={cn(
          "flex items-center px-2 py-1 cursor-pointer hover:bg-gray-800",
          isSelected && "bg-gray-800"
        )}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => onNodeClick(node, path)}
      >
        <TreeNodeIcon type={node.type} isExpanded={isExpanded} />
        <span className="text-sm">{node.label}</span>
      </div>
      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child: TreeNode) => (
            <TreeNodeComponent
              key={`${path}.${child.label}`}
              node={child}
              path={`${path}.${child.label}`}
              level={level + 1}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
