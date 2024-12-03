import { TranslationContent } from "@/components/pages/translation-editor/translation-content";
import { TranslationHeader } from "@/components/pages/translation-editor/translation-header";
import { LanguageHeader } from "@/components/pages/translation-editor/translation-language-header";
import { TreeNodeComponent } from "@/components/pages/translation-editor/translation-tree";
import { TranslationEditorService } from "@/services/translation-editor-service";
import { useFileUploadStore } from "@/store/file-upload-store";
import { useNodeContentStore } from "@/store/node-store";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const TranslationEditor = () => {
  const { processedFiles } = useFileUploadStore();
  const { selectedNode, setSelectedNode } = useNodeContentStore();

  const baseContent = processedFiles[0].content;
  const treeData = TranslationEditorService.processObject(
    baseContent,
    processedFiles
  );

  return (
    <div className="h-screen flex flex-col">
      <TranslationHeader
        fileName={processedFiles.map((i) => i.name).join(", ")}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[300px] border-r border-gray-800 flex flex-col">
          <div className="p-3 border-b border-gray-800 font-medium shrink-0">
            Translation IDs
          </div>
          <ScrollArea className="flex-1">
            <div className="h-full">
              <TreeNodeComponent
                content={treeData}
                onSelectTranslation={(node) => setSelectedNode(node)}
              />
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
  );
};
