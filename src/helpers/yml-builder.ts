import { FileContent } from "@/shared/types/translation-editor.types";
import YAML from "js-yaml";

export function createYmlObject(
  savePath: string,
  extractedFileName: string,
  translation: FileContent[]
) {
  const yamlStructure = {
    babeledit_project: {
      be_version: "1.0",
      version: "1.0",
      preset_collections: "",
      framework: "generic-json",
      filename: extractedFileName,
      source_root_dir: savePath,
      folder_node: {
        name: null,
        children: {
          package_node: {
            name: "main",
            children: {
              folder_node: {
                name: translation.map((t) => t.name),
                children: {
                  concept_node: {
                    name: translation.map((t) => t.name),
                    translations: {
                      translation: {
                        language: translation.map((t) => t.name),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  return YAML.dump(yamlStructure, {
    indent: 2,
    skipInvalid: true,
  });
}
