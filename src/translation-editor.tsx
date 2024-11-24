import {
  TranslationFile,
  TreeNode,
  NodeType,
} from "@/@types/translation-editor.types";
import { TranslationContent } from "@/components/pages/translation-editor/translation-content";
import { TranslationHeader } from "@/components/pages/translation-editor/translation-header";
import { LanguageHeader } from "@/components/pages/translation-editor/translation-language-header";
import { TreeNodeComponent } from "@/components/pages/translation-editor/translation-tree-node";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const TranslationEditor = () => {
  const location = useLocation();
  const files = (location.state?.files || []) as TranslationFile[];
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const processContent = (content: any): TreeNode[] => {
    if (typeof content === "object" && content !== null) {
      return Object.entries(content).map(([key, value]) => ({
        label: key,
        type: typeof value === "object" ? "folder" : "translation",
        children: typeof value === "object" ? processContent(value) : [],
        content: typeof value === "string" ? value : undefined,
      }));
    }
    return [];
  };

  const treeData = files.map((file) => ({
    label: file.name,
    type: "translation" as NodeType,
    children: processContent(file.content),
  }));

  const handleSelectTranslation = (node: TreeNode) => {
    setSelectedNode(node);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-black text-white h-screen flex flex-col">
        <TranslationHeader
          fileName={files.map((i) => i.name).join(", ")}
        />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-[300px] border-r border-gray-800 flex flex-col">
            <div className="p-[18px] border-b border-gray-800 font-medium shrink-0">
              Translation IDs
            </div>
            <ScrollArea className="flex-1">
              <div className="h-full">
                {treeData.map((node) => (
                  <TreeNodeComponent
                    key={node.label}
                    content={node.children}
                    onSelectTranslation={handleSelectTranslation}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <LanguageHeader />
            <ScrollArea className="flex-1">
              <div className="p-4">
                <TranslationContent node={selectedNode} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
