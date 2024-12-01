import { Separator } from "@/components/ui/separator";
import { useLanguageStore } from "@/store/language-store";
import React from "react";

export const LanguageHeader: React.FC = () => {
  const { languages } = useLanguageStore();

  return (
    <header className="flex justify-between border-b">
      <h1 className="font-medium text-sm mt-2">Translations</h1>
      <nav className="flex items-center">
        {languages.map((lang) => (
          <>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <div className="p-1 text-center font-medium hover:bg-gray-800 transition-colors cursor-pointer">
              {lang.name}
            </div>
          </>
        ))}
      </nav>
    </header>
  );
};
