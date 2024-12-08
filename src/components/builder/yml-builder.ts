import { FileContent } from "@/types/translation-editor.types";

export function createYmlObject(
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
      translations: translation.map((t) => ({
        key: t.name,
        value: t.content,
      })),
      metadata: {
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        author: "Current User",
      },
      translation_files: {},
    },
  };
}
