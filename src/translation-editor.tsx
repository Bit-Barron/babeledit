import { TranslationFile, TreeNode } from "@/@types/translation-editor.types";
import { TranslationContent } from "@/components/pages/translation-editor/translation-content";
import { TranslationHeader } from "@/components/pages/translation-editor/translation-header";
import { LanguageHeader } from "@/components/pages/translation-editor/translation-language-header";
import { TreeNodeComponent } from "@/components/pages/translation-editor/translation-tree-node";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const TranslationEditor = () => {
  const location = useLocation();
  const files = (location.state?.files || []) as TranslationFile[];
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const processObject = (obj: any, path: string[] = []): TreeNode[] => {
    if (!obj || typeof obj !== "object") return [];

    return Object.entries(obj).map(([key, value]) => {
      const currentPath = [...path, key];
      const isFolder = typeof value === "object";

      return {
        label: key,
        type: isFolder ? "folder" : "translation",
        children: isFolder ? processObject(value, currentPath) : [],
        content: !isFolder ? getTranslationsForKey(currentPath) : undefined,
      };
    });
  };

  const getTranslationsForKey = (path: string[]) => {
    const translations: Record<string, any> = {};

    files.forEach((file) => {
      let current = file.content;
      for (const key of path) {
        if (!current || typeof current !== "object") return;
        current = current[key];
      }

      if (typeof current === "string") {
        const locale = file.name.replace(".json", "");
        translations[locale] = current;
      }
    });

    return translations;
  };

  const baseContent = files[0]?.content || {};
  const treeData = processObject(baseContent);

  const handleSelectTranslation = (node: TreeNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col">
      <TranslationHeader fileName={files.map((i) => i.name).join(", ")} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[300px] border-r border-gray-800 flex flex-col">
          <div className="p-[18px] border-b border-gray-800 font-medium shrink-0">
            Translation IDs
          </div>
          <ScrollArea className="flex-1">
            <div className="h-full">
              <TreeNodeComponent
                content={treeData}
                onSelectTranslation={handleSelectTranslation}
              />
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <LanguageHeader />
          <ScrollArea className="flex-1">
            <div className="p-4">
              <TranslationContent node={selectedNode as TreeNode} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
