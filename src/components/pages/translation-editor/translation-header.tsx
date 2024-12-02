import React from "react";
import { Button } from "@/components/ui/button";
import { FaSave, FaFolderOpen } from "react-icons/fa";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";
import { useToast } from "@/hooks/use-toast";
import { Builder } from "xml2js";

interface HeaderProps {
  fileName: string;
}

export const TranslationHeader: React.FC<HeaderProps> = ({ fileName }) => {
  const { toast } = useToast();

  const handleSaveProject = async () => {
    try {
      const savePath = await save({
        filters: [
          {
            name: "Translation Project",
            extensions: ["babel"],
          },
        ],
        defaultPath: "translation.babel",
      });

      if (savePath) {
        const extractedFileName =
          savePath.split("/").pop() || "Untitled Project";

        const xmlObject = {
          babeledit_project: {
            $: {
              be_version: "1.0",
              version: "1.0",
            },
            preset_collections: "",
            framework: "generic-json",
            filename: extractedFileName,
            source_root_dir: "dev/cryptotracker",
          },
        };

        const builder = new Builder({
          xmldec: { version: "1.0", encoding: "UTF-8" },
          renderOpts: { pretty: true, indent: "\t" },
        });

        const xmlContent = builder.buildObject(xmlObject);

        await writeTextFile(savePath, xmlContent);

        toast({
          title: "Project Saved",
          description: `Successfully saved translation project to ${savePath}`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error processing files",
        description: `Please make sure your files are valid: ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-800 p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-medium">Translation Editor - {fileName}</h1>
      </div>
      <section className="flex space-x-4">
        <Button
          onClick={handleSaveProject}
          variant="outline"
          className="border-gray-600 text-white transition-colors hover:bg-gray-800 hover:text-white"
        >
          <FaSave className="mr-2 h-4 w-4" />
          Save Project
        </Button>
        <Button
          variant="outline"
          className="border-gray-600 text-white transition-colors hover:bg-gray-800 hover:text-white"
        >
          <FaFolderOpen className="mr-2 h-4 w-4" />
          Open Project
        </Button>
      </section>
    </header>
  );
};
