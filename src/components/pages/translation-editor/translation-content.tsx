import { TreeNode } from "@/@types/translation-editor.types";
import { Card } from "@/components/ui/card";

interface TranslationContentProps {
  node: TreeNode | null;
}

export const TranslationContent = ({ node }: TranslationContentProps) => {
  if (!node) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Wähle eine Übersetzung aus der Liste aus
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

    const parts = text.split(/(\{\{.*?\}\})/g);
    return parts.map((part, index) => {
      if (part.startsWith("{{") && part.endsWith("}}")) {
        return (
          <span key={index} className="text-blue-400 font-medium">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <Card className="p-4 bg-gray-900 border-gray-700">
      <h3 className="text-lg font-medium mb-4">Translation: {node.label}</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Content</label>
            <div className="p-3 bg-gray-800 rounded-md">
              {highlightPlaceholders(node?.content || "")}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
