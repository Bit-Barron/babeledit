import { useState } from "react";
import { FaFolder, FaFolderOpen, FaRegFileAlt } from "react-icons/fa";
import { TreeNode } from "@/shared/types/translation-editor.types";

interface TreeNodeProps {
  content: TreeNode[];
  onSelectTranslation: (node: TreeNode) => void;
}

export const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  content,
  onSelectTranslation,
}) => {
  const nodes = Array.isArray(content) ? content : [content];
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {}
  );

  const toggleNode = (nodeLabel: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeLabel]: !prev[nodeLabel],
    }));
  };

  return (
    <div className="pl-4">
      {nodes.map((node) => {
        const isExpanded = expandedNodes[node.label];

        return (
          <div key={node.label}>
            <div
              className="flex items-center space-x-2 py-1 rounded cursor-pointer"
              onClick={() => {
                if (node.type === "folder") {
                  toggleNode(node.label);
                }
                onSelectTranslation(node);
              }}
            >
              <span className="text-lg">
                {node.type === "folder" ? (
                  <div className="text-yellow-500">
                    {isExpanded ? <FaFolderOpen /> : <FaFolder />}
                  </div>
                ) : (
                  <FaRegFileAlt />
                )}
              </span>
              <span className={`${node.type === "folder" && "font-medium"}`}>
                {node.label}
              </span>
            </div>

            {isExpanded && node.children.length > 0 && (
              <div className="pl-4 mt-1">
                <TreeNodeComponent
                  content={node.children}
                  onSelectTranslation={onSelectTranslation}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
