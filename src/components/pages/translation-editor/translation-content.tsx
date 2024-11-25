import { TreeNode } from "@/@types/translation-editor.types";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { highlightPlaceholders } from "@/utils/client-helper";

interface TranslationContentProps {
  node: TreeNode | null;
}

export const TranslationContent = ({ node }: TranslationContentProps) => {
  if (!node) {
    return (
      <section>
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a translation from the list
        </div>
      </section>
    );
  }

  const languages = node.content ? Object.entries(node.content) : [];

  return (
    <section>
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Translation: {node.label}</h3>
        <div>
          {languages.map(([lang, content]) => {
            const cleanedLang = lang.replace(/\s*\(\d+\)$/, "").trim();

            return (
              <div key={lang}>
                <div className="flex space-y-5">
                  <label className="block text-sm text-gray-400 mb-2 mr-4 mt-7">
                    {cleanedLang}
                  </label>
                  {highlightPlaceholders(content || "")}
                  <div className="flex space-x-2">
                    <Checkbox className="mt-2 ml-3" />
                    <h1 className="mt-1">Approved</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
};

export default TranslationContent;
