import { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";

export const TreeNodeComponent = ({ content }: any) => {
  const nodes = Array.isArray(content) ? content : [content];

  const [expandedNodes, setExpandedNodes] = useState<any>({});

  const toggleNode = (nodeLabel: string) => {
    console.log(nodeLabel);
    setExpandedNodes((prev: { [x: string]: any }) => ({
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
              onClick={() => node.type === "folder" && toggleNode(node.label)}
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
              <span
                className={`${node.type === "folder" ? "font-medium" : ""}`}
              >
                {node.label}
              </span>
            </div>

            {isExpanded &&
              node.type === "folder" &&
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
