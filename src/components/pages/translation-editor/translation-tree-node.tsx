import React, { memo, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import { TreeNodeIcon } from "@/components/pages/translation-editor/translation-tree-node-icon";
import { ITEM_TYPE } from "@/utils/constants";

interface TreeNode {
  label: string;
  type: "folder" | "translation";
  children?: TreeNode[];
}

interface TreeNodeProps {
  node: TreeNode;
  path: string;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onNodeClick: (node: TreeNode, path: string) => void;
  onMove: (dragPath: string, dropPath: string) => void;
}

export const TreeNodeComponent: React.FC<TreeNodeProps> = memo(
  ({ node, path, level, isExpanded, isSelected, onNodeClick, onMove }) => {
    const handleClick = useCallback(() => {
      onNodeClick(node, path);
    }, [node, path, onNodeClick]);

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: ITEM_TYPE,
        item: { path, type: node.type },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [path, node.type]
    );

    const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: ITEM_TYPE,
        drop: (item: { path: string; type: string }) => {
          if (item.path !== path) {
            onMove(item.path, path);
          }
        },
        canDrop: (item: { path: string; type: string }) =>
          !path.startsWith(item.path) && item.path !== path,
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }),
      [path, onMove]
    );

    const dragDropRef = useCallback(
      (el: HTMLDivElement | null) => {
        drag(el);
        drop(el);
      },
      [drag, drop]
    );

    const renderChildren = () => {
      if (node.type !== "folder" || !isExpanded || !node.children) {
        return null;
      }

      return (
        <div>
          {node.children.map((child) => (
            <TreeNodeComponent
              key={`${path}.${child.label}`}
              node={child}
              path={`${path}.${child.label}`}
              level={level + 1}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onNodeClick={onNodeClick}
              onMove={onMove}
            />
          ))}
        </div>
      );
    };

    return (
      <div
        ref={dragDropRef}
        className={cn(
          "relative",
          isDragging && "opacity-50",
          isOver && canDrop && "bg-blue-900/20",
          isOver && !canDrop && "bg-red-900/20"
        )}
      >
        <div
          className={cn(
            "flex items-center px-2 py-1 cursor-pointer hover:bg-gray-800",
            isSelected && "bg-gray-800"
          )}
          onClick={handleClick}
        >
          <TreeNodeIcon type={node.type} isExpanded={isExpanded} />
          <span className="text-sm">{node.label}</span>
        </div>
        {renderChildren()}
      </div>
    );
  }
);

TreeNodeComponent.displayName = "TreeNodeComponent";

export default TreeNodeComponent;
