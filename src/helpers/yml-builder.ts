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
        name: "root",
        children: translation.map((t) => ({
          package_node: {
            name: t.name,
            children: {
              folder_node: {
                name: "translations",
                children: Object.keys(t.content).map((key) => ({
                  concept_node: {
                    name: key,
                    description: "",
                    comment: "",
                    translations: {
                      translation: [
                        {
                          language: "de-DE",
                          approved: false,
                        },
                        {
                          language: "en-US",
                          approved: false,
                        },
                      ],
                    },
                  },
                })),
              },
            },
          },
        })),
      },
    },
  };

  return YAML.dump(yamlStructure, {
    indent: 2,
    skipInvalid: true,
  });
}
