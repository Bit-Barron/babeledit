import { TreeNode } from "@/shared/types/translation-editor.types";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguageStore } from "@/store/language-store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { TranslationEditorService } from "@/services/translation-editor-service";
import { toast } from "@/shared/hooks/use-toast";

interface TranslationContentProps {
  content: TreeNode | null;
}

export const TranslationContent: React.FC<TranslationContentProps> = ({
  content,
}) => {
  const { languages } = useLanguageStore();
  const { fetchTranslations } = TranslationEditorService;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nodeLanguages = content?.content ? Object.entries(content.content) : [];
  const [translations, setTranslations] = useState<
    Record<string, { name: string; content: string }>
  >({});

  useEffect(() => {
    const fetchAndSetTranslations = async () => {
      try {
        setIsLoading(true);
        const fetchedTranslations = await fetchTranslations({
          nodeLanguages,
          targetLanguages: languages,
        });

        const translationsRecord = fetchedTranslations.reduce(
          (acc, translation) => ({
            ...acc,
            [translation.name]: translation,
          }),
          {} as Record<string, { name: string; content: string }>
        );

        setTranslations(translationsRecord);
      } catch (error) {
        toast({
          type: "background",
          variant: "destructive",
          description: `Failed to fetch translations: ${error}`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetTranslations();
  }, [content, languages]);

  if (!content?.type) {
    return (
      <h1 className="flex text-xl items-center justify-center h-full text-gray-600">
        Select a translation from the list
      </h1>
    );
  }

  console.log("tasdas", translations);

  return (
    <section>
      <Card className="p-4 bg-card">
        <h3 className="text-lg font-medium mb-4">
          Translation: {content?.label}
        </h3>
        <div className="space-y-4 mt-5">
          {nodeLanguages.map(([lang, content]) => (
            <div key={lang}>
              <div className="flex items-center gap-4">
                <label className="text-sm min-w-[50px]">{lang}</label>
                <Input readOnly value={content} />
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
            {languages.map((language, index) => (
              <div
                key={`${language.id}-${index}`}
                className="flex items-center gap-4"
              >
                <label className="text-sm min-w-[50px]">{language.name}</label>
                <Input
                  className="flex-1"
                  value={translations[language.name]?.content || ""}
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
