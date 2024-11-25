import { TreeNode } from "@/@types/translation-editor.types";
import { Card } from "@/components/ui/card";
import { highlightPlaceholders } from "@/utils/client-helper";

interface TranslationContentProps {
  node: TreeNode;
}

export const TranslationContent = ({ node }: TranslationContentProps) => {
  if (!node) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a translation from the list
      </div>
    );
  }

  const languages = node.content ? Object.entries(node.content) : [];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Translation: {node.label}</h3>
      <div className="grid grid-cols-2 gap-4">
        {languages.map(([lang, content]) => (
          <div key={lang} className="space-y-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">{lang}</label>
              <div className="p-3 rounded-md min-h-[100px]">
                {highlightPlaceholders(content || "")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TranslationContent;
