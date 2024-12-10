import YAML from "js-yaml";

export function createYmlObject(
  savePath: string,
  extractedFileName: string,
  translation: Record<string, any>
) {
  console.log("asd", translation);
  const yamlStructure = {
    babeledit_project: {
      be_version: "1.0",
      version: "1.0",
      preset_collections: "",
      framework: "generic-json",
      filename: extractedFileName,
      source_root_dir: savePath,
      folder_node: {
        name: "root",
      },
    },
  };

  return YAML.dump(yamlStructure, {
    indent: 2,
    skipInvalid: true,
  });
}
