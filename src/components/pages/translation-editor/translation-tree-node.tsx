import { TreeNode } from "@/@types/translation-editor.types";
import React from "react";
import { FaFolder } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

interface TreeNodeComponentProps {
  content: TreeNode | TreeNode[];
}

export const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  content,
}) => {
  const nodes = Array.isArray(content) ? content : [content];

  return (
    <div className="pl-4">
      {nodes.map((node) => {
        return (
          <div key={node.label}>
            <div className="flex items-center space-x-2">
              <span className="text-lg">
                {node.type === "folder" ? (
                  <FaFolder className="text-yellow-500" />
                ) : (
                  <FaFileAlt />
                )}
              </span>
              <span className={node.type === "folder" ? "font-medium" : ""}>
                {node.label}
              </span>
            </div>

            {node.type === "folder" &&
              node.children &&
              node.children.length > 0 && (
                <div className="pl-4 mt-1">
                  <TreeNodeComponent content={node.children} />
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};
