import { writeTextFile } from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";
import YAML from "yaml";
import { toast } from "@/hooks/use-toast";
import { TRANSLATION_API_URL } from "@/utils/constants";

interface FetchTranslationsProps {
  nodeLanguages: [string, string][];
  targetLanguages: { id: string; name: string }[];
}

export class TranslationEditorService {
  static async saveProject(): Promise<void> {
    try {
      const savePath = await save({
        filters: [
          {
            name: "Translation Project",
            extensions: ["yaml"],
          },
        ],
        defaultPath: "translation.yaml",
      });

      if (!savePath) {
        toast({
          title: "Save Cancelled",
          description: "No file was saved.",
          variant: "default",
        });
        return;
      }

      const extractedFileName = savePath.split("/").pop() || "Untitled Project";

      const ymlObject = {
        babeledit_project: {
          be_version: "1.0",
          version: "1.0",
          preset_collections: "",
          framework: "generic-json",
          filename: extractedFileName,
          source_root_dir: savePath,
        },
      };

      const yamlContent = YAML.stringify(ymlObject);
      await writeTextFile(savePath, yamlContent);

      toast({
        title: "Project Saved",
        description: `Successfully saved translation project to ${savePath}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error Saving Project",
        description: `An error occurred while saving the project: ${error}`,
        variant: "destructive",
      });
    }
  }
  static async fetchTranslations({
    nodeLanguages,
    targetLanguages,
  }: FetchTranslationsProps): Promise<Record<string, string>> {
    const translations: Record<string, string> = {};

    for (const [sourceLang, content] of nodeLanguages) {
      const baseLang = sourceLang.split("-")[0];
      for (const targetLanguage of targetLanguages) {
        try {
          const response = await fetch(
            `${TRANSLATION_API_URL}/get?q=${encodeURIComponent(
              content
            )}&langpair=${baseLang}|${targetLanguage.name}`
          );
          const responseData = await response.json();
          translations[targetLanguage.name] =
            responseData.responseData.translatedText;
        } catch (error) {
          console.error(
            `Error translating content "${content}" to "${targetLanguage.name}":`,
            error
          );
        }
      }
    }

    return translations;
  }
}
