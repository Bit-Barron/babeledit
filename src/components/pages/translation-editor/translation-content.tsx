import { Card } from "@/components/ui/card";

interface TranslationContentProps {
  node: any | null;
}

export const TranslationContent = ({ node }: TranslationContentProps) => {
  if (!node) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Wähle eine Übersetzung aus der Liste aus
      </div>
    );
  }

  console.log(node);

  return (
    <Card className="p-4 bg-gray-900 border-gray-700">
      <h3 className="text-lg font-medium mb-4">Translation: {node.label}</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Content</label>
            <div className="p-3 bg-gray-800 rounded-md">
              {node.content || "Kein Inhalt verfügbar"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
