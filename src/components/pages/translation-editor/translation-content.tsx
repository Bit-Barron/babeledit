import { TreeNode } from "@/types/translation-editor.types";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { highlightPlaceholders } from "@/utils/client-helper";
import { useLanguageStore } from "@/store/language-store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { TRANSLATION_API_URL } from "@/utils/constants";

interface TranslationContentProps {
  node: TreeNode | null;
}

export const TranslationContent: React.FC<TranslationContentProps> = ({
  node,
}) => {
  const { languages } = useLanguageStore();
  const nodeLanguages = node?.content ? Object.entries(node.content) : [];
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const translateContent = async () => {
      setIsLoading(true);

      try {
        await Promise.all(
          nodeLanguages.map(async ([lang, content]) => {
            if (!content) return;
            const sourceLang = lang.split("-")[0];
            languages.map(async (language) => {
              const response = await fetch(
                `${TRANSLATION_API_URL}/get?q=${encodeURIComponent(
                  content
                )}&langpair=${sourceLang}|${language.name}`
              );
              const responseData = await response.json();
              setTranslations((prev) => ({
                ...prev,
                [language.name]: responseData.responseData.translatedText,
              }));
            });
          })
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Translation error:", error);
        setIsLoading(false);
      }
    };

    translateContent();
  }, [node, languages]);

  if (!node?.type) {
    return (
      <h1 className="flex text-2xl items-center justify-center h-full text-gray-400">
        Select a translation from the list
      </h1>
    );
  }

  return (
    <section>
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Translation: {node?.label}</h3>
        <div className="space-y-4 mt-5">
          {nodeLanguages.map(([lang, content]) => (
            <div key={lang}>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-400 min-w-[50px]">
                  {lang}
                </label>
                {highlightPlaceholders(content || "")}
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span>Approved</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2">
          {languages.length > 0 && <Separator />}

          <div className="space-y-4 mt-5">
            {languages.map((language) => (
              <div key={language.name} className="flex items-center gap-4">
                <label className="text-sm text-gray-400 min-w-[50px]">
                  {language.name}
                </label>
                <Input
                  className="flex-1"
                  value={translations[language.name]}
                  disabled={isLoading}
                  placeholder={
                    isLoading ? "Translating..." : "No translation available"
                  }
                />
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span>Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};
