import { FileContent } from "@/types/translation-editor.types";

export function createYmlObject(
  nodeLanguages: [string, string][],
  targetLanguages: { id: string; name: string }[],
  savePath: string,
  extractedFileName: string,
  translation: FileContent[]
) {
  return {
    babeledit_project: {
      be_version: "1.0",
      version: "1.0",
      preset_collections: "",
      framework: "generic-json",
      filename: extractedFileName,
      source_root_dir: savePath,
      translations: {
        source_language: nodeLanguages[0][0],
        target_languages: targetLanguages.map((lang) => lang.id),
        translations: translation.map((file) => {
          return {
            id: file.name,
            name: file.name,
            
          };
        }),
      },
      metadata: {
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        author: "Current User",
      },
      translation_files: {},
    },
  };
}
