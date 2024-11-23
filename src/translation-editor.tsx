import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation } from "react-router-dom";
import { TranslationHeader } from "@/components/pages/translation-editor/translation-header";
import { LanguageHeader } from "@/components/pages/translation-editor/translation-language-header";
import {
  NodeType,
  TranslationFile,
  TreeNode,
} from "@/@types/translation-editor.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TreeNodeComponent } from "@/components/pages/translation-editor/translation-tree-node";

export const TranslationEditor = () => {
  const location = useLocation();
  const files = (location.state?.files || []) as TranslationFile[];

  const processContent = (content: any): TreeNode[] => {
    if (typeof content === "object" && content !== null) {
      return Object.entries(content).map(([key, value]) => ({
        label: key,
        type: typeof value === "object" ? "folder" : "translation",
        children: processContent(value),
      }));
    } else {
      return [];
    }
  };

  const treeData = files.map((file) => ({
    label: file.name,
    type: "translation" as NodeType,
    children: processContent(file.content),
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-black text-white h-screen flex flex-col">
        <TranslationHeader fileName={files[0]?.name} />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-[300px] border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800 font-medium shrink-0">
              Translation IDs
            </div>
            <ScrollArea className="flex-1">
              <div className="h-full">
                {treeData.map((node) => (
                  <TreeNodeComponent key={node.label} content={node.children} />
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <LanguageHeader />
            <section className="p-4 flex-1">asd</section>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
