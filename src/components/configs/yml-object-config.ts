import { FileContent } from "@/types/translation-editor.types";

export function createYmlObject(
  nodeLanguages: [string, string][],
  targetLanguages: { id: string; name: string }[],
  savePath: string,
  extractedFileName: string,
  translations: FileContent[]
) {
  const flattenTranslations = (
    obj: any,
    prefix = ""
  ): Record<string, string> => {
    return Object.keys(obj).reduce((acc, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        return {
          ...acc,
          ...flattenTranslations(obj[key], prefixedKey),
        };
      }

      acc[prefixedKey] = obj[key];
      return acc;
    }, {} as Record<string, string>);
  };

  const translationFiles = translations.map((file) => {
    const languageCode = file.name.replace(".json", "");
    const flattenedTranslations = flattenTranslations(file.content);

    return {
      id: "3",
      language: languageCode,
      filename: file.name,
      translations: Object.entries(flattenedTranslations).map(
        ([key, value]) => ({
          key,
          value,
        })
      ),
    };
  });

  return {
    babeledit_project: {
      be_version: "1.0",
      version: "1.0",
      preset_collections: "",
      framework: "generic-json",
      filename: extractedFileName,
      source_root_dir: savePath,
      source_language: {
        code: nodeLanguages[0][0],
        name: nodeLanguages[0][1],
      },
      translations: {
        source_language: nodeLanguages[0][0],
        target_languages: targetLanguages.map((lang) => lang.id),
        translation_files: translations.map((file) => ({
          id: file.name,
          name: file.name,
        })),
      },
      metadata: {
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        author: "Current User",
      },
      translation_files: translationFiles,
    },
  };
}
