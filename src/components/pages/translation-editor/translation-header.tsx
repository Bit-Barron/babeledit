import React from "react";
import { Button } from "@/components/ui/button";
import { FaSave, FaFolderOpen } from "react-icons/fa";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";
import { useToast } from "@/hooks/use-toast";

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
        const content = JSON.stringify(
          {
            fileName: "translation.babel",
            timestamp: new Date().toISOString(),
          },
          null,
          2
        );

        await writeTextFile(savePath, content);
      }
    } catch (error) {
      toast({
        title: "Error processing files",
        description: `Please make sure your files are valid`,
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
