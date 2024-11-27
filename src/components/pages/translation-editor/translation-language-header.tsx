import { LocationState } from "@/types/translation-editor.types";
import { Separator } from "@/components/ui/separator";
import { remomveJsonFromFile } from "@/utils/client-helper";
import React from "react";
import { useLocation } from "react-router-dom";

export const LanguageHeader: React.FC = () => {
  const location = useLocation();
  const files = (location.state as LocationState)?.files ?? [];

  return (
    <header className="flex justify-between border-b">
      <div className="p-4">
        <h1 className="font-medium text-lg">Translations</h1>
      </div>

      <nav className="flex items-center">
        {files.map((lang) => (
          <>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <div
              className="p-4 text-center font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              role="tab"
              tabIndex={0}
            >
              {remomveJsonFromFile(lang.name)}
            </div>
          </>
        ))}
      </nav>
    </header>
  );
};
