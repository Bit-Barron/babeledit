import { TreeNode } from "@/@types/translation-editor.types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TranslationContentProps {
  node: TreeNode | null;
}

export const TranslationContent = ({ node }: TranslationContentProps) => {
  if (!node) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a translation from the list
      </div>
    );
  }

  if (node.type === "folder") {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Dies ist ein Ordner. Wähle eine Übersetzung aus.
      </div>
    );
  }

  const highlightPlaceholders = (text: string) => {
    if (!text) return null;

    const parts = text.split(/(\{\{.*?\}\}|\{[^{}]+\})/g);
    return parts.map((part, index) => {
      if (
        (part.startsWith("{{") && part.endsWith("}}")) ||
        (part.startsWith("{") && part.endsWith("}"))
      ) {
        return (
          <span key={index} className="font-medium">
            {part}
          </span>
        );
      }
      return (
        <span key={index}>
          <Input className="" value={part} />
        </span>
      );
    });
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Translation: {node.label}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Deutsch</label>
            <div className="p-3 rounded-md">
              {highlightPlaceholders(node.content?.de || "")}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">English</label>
            <div className="p-3 rounded-md min-h-[100px]">
              {highlightPlaceholders(node.content?.en || "")}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TranslationContent;