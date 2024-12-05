export function createYmlObject(
  nodeLanguages: [string, string][],
  targetLanguages: { id: string; name: string }[],
  savePath: string,
  extractedFileName: string
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
        source_languages: nodeLanguages.map(([lang]) => ({
          code: lang,
          name: lang,
        })),
        target_languages: targetLanguages.map(({ id, name }) => ({
          code: id,
          name: name,
        })),
      },
      metadata: {
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        author: "Current User",
      },
      translation_files: {},
      settings: {
        auto_translate: false,
        merge_strategy: "replace", // Beispiel
      },
    },
  };
}
