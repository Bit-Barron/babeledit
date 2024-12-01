import React from "react";
import { Button } from "@/components/ui/button";
import { FaSave, FaFolderOpen } from "react-icons/fa";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";

interface HeaderProps {
  fileName: string;
}

export const TranslationHeader: React.FC<HeaderProps> = ({ fileName }) => {
  const handleSaveProject = async () => {
    try {
      const savePath = await save({
        filters: [
          {
            name: "Translation Project",
            extensions: ["babel"],
          },
        ],
        defaultPath: fileName,
      });

      if (savePath) {
        await writeTextFile(
          savePath,
          JSON.stringify({
            fileName: fileName,
          })
        );

        console.log("Projekt erfolgreich gespeichert unter:", savePath);
      }
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
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
          <FaSave />
          Save Project
        </Button>
        <Button
          variant="outline"
          className="border-gray-600 text-white transition-colors hover:bg-gray-800 hover:text-white"
        >
          <FaFolderOpen />
          Open Project
        </Button>
      </section>
    </header>
  );
};
