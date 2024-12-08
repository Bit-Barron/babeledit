import { Separator } from "@/components/ui/separator";
import { useLanguageStore } from "@/store/language-store";
import React from "react";

export const LanguageHeader: React.FC = () => {
  const { languages } = useLanguageStore();

  return (
    <header className="flex justify-between border-b">
      <h1 className="font-medium text-sm p-2.5">Translations</h1>
      <section className="flex items-center">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center">
            <Separator orientation="vertical" className="h-6 mx-1" />
            <div className="p-1 text-center font-medium transition-colors cursor-pointer">
              {lang.name}
            </div>
          </div>
        ))}
      </section>
    </header>
  );
};
