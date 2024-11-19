import React from "react";
import { cn } from "@/lib/utils";
import { TreeNodeIcon } from "@/components/pages/translation-editor/translation-tree-node-icon";

interface TreeNodeProps {
  node: TreeNode;
  path: string;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onNodeClick: (node: TreeNode, path: string) => void;
}

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
