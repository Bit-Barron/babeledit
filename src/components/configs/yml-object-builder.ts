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
        source_languages: nodeLanguages.map(([lang]) => lang),
        target_languages: targetLanguages.map(({ id }) => id),
      },
    },
  };
}
