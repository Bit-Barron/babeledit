import { TreeNode } from "@/types/translation-editor.types";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { highlightPlaceholders } from "@/utils/client-helper";
import { Separator } from "@/components/ui/separator";
import { useLanguageStore } from "@/store/language-store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface TranslationContentProps {
  node: TreeNode | null;
}

export const TranslationContent: React.FC<TranslationContentProps> = ({
  node,
}) => {
  const { languages } = useLanguageStore();
  const nodeLanguages = node?.content ? Object.entries(node.content) : [];
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const translateContent = async () => {
      if (!languages.length || !nodeLanguages.length) return;
      const newTranslations: Record<string, string> = {};

      for (const [lang, content] of nodeLanguages) {
        if (!content) continue;

        const sourceLang = lang.split("-")[0];

        for (const language of languages) {
          const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
              content
            )}&langpair=${sourceLang}|${language.name}`
          );

          if (response.ok) {
            const { responseData } = await response.json();
            newTranslations[language.name] = responseData.translatedText;
          }
        }
      }
      setTranslations(newTranslations);
    };
    translateContent();
  }, [node]);

  return (
    <section>
      {!node?.type && (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a translation from the list
        </div>
      )}
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Translation: {node?.label}</h3>
        <div className="space-y-4 mt-5">
          {nodeLanguages.map(([lang, content]) => {
            const cleanedLang = lang.replace(/\s*\(\d+\)$/, "").trim();

            return (
              <div key={lang}>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-400 min-w-[50px]">
                    {cleanedLang}
                  </label>
                  {highlightPlaceholders(content || "")}
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <span>Approved</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-2">
          <Separator className="mt-5" orientation="horizontal" />
          <div className="space-y-4 mt-5">
            {languages.map((language, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-400 min-w-[50px]">
                    {language.name}
                  </label>
                  <Input
                    className="flex-1"
                    value={translations[language.name] || ""}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <span>Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};
