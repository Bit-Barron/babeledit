import {
  TranslationsStatuses,
  TreeNode,
} from "@/@types/translation-editor.types";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { highlightPlaceholders } from "@/utils/client-helper";
import { TRANSLATION_API_URL } from "@/utils/constants";
import { useEffect, useState, useCallback } from "react";

interface TranslationContentProps {
  node: TreeNode | null;
}

export const TranslationContent = ({ node }: TranslationContentProps) => {
  const [translationStatuses, setTranslationStatuses] =
    useState<TranslationsStatuses>({});

  const cleanLanguage = useCallback((lang: string): string => {
    let code = lang
      .replace(/\s*\(\d+\)$/, "")
      .trim()
      .toLowerCase();
    return code.replace("_", "-");
  }, []);

  const checkIfApproved = useCallback(
    async (sourceContent: string, sourceLang: string, targetLang: string) => {
      if (!sourceContent) return false;

      const EMAIL = "qadoazer@gmail.com";

      try {
        const normalizedSourceLang = cleanLanguage(sourceLang);
        const normalizedTargetLang = cleanLanguage(targetLang);

        const url = `${TRANSLATION_API_URL}/get?q=${encodeURIComponent(
          sourceContent
        )}&langpair=${normalizedSourceLang}|${normalizedTargetLang}${
          EMAIL ? `&de=${EMAIL}` : ""
        }`;

        const response = await fetch(url);
        const data = await response.json();

        setTranslationStatuses((prev) => ({
          ...prev,
          [targetLang]: {
            isApproved: true,
            isPending: false,
            matchPercentage: data.responseData?.match,
          },
        }));
      } catch (error) {
        console.error("Error fetching translation", error);
        setTranslationStatuses((prev) => ({
          ...prev,
          [targetLang]: {
            isApproved: false,
            isPending: false,
            matchPercentage: 0,
          },
        }));
      }
    },
    [cleanLanguage]
  );

  useEffect(() => {
    if (node?.content) {
      // Initialize statuses
      const initialStatuses: TranslationsStatuses = {};
      Object.entries(node.content).forEach(([lang]) => {
        initialStatuses[lang] = {
          isApproved: false,
          isPending: true,
        };
      });
      setTranslationStatuses(initialStatuses);

      // Start checks
      Object.entries(node.content).forEach(([lang, content]) => {
        checkIfApproved(content || "", "en", lang);
      });
    }
  }, [node, checkIfApproved]);

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
            const status = translationStatuses[lang] || {
              isApproved: false,
              isPending: true,
            };

            return (
              <div key={lang}>
                <div className="flex space-y-5">
                  <label className="block text-sm text-gray-400 mb-2 mr-4 mt-7">
                    {cleanedLang}
                  </label>
                  {highlightPlaceholders(content || "")}
                  <div className="flex space-x-2">
                    <Checkbox
                      checked={status.isApproved}
                      disabled={status.isPending}
                      className="mt-2 ml-3"
                    />
                    <h1 className="mt-1">
                      {status.isPending ? "Checking..." : "Approved"}
                    </h1>
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
