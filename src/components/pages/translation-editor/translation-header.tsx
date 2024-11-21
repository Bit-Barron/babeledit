import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  fileName: string;
  onSave?: () => void;
}

export const TranslationHeader: React.FC<HeaderProps> = ({
  fileName = "No file",
  onSave = () => {},
}) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-800 p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-medium">Translation Editor - {fileName}</h1>
      </div>

      <Button
        onClick={onSave}
        variant="outline"
        className="border-gray-600 text-white transition-colors hover:bg-gray-800 hover:text-white"
      >
        Save Changes
      </Button>
    </header>
  );
};
