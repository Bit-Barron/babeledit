import { LANGUAGES } from "@/utils/constants";
import React from "react";

export const LanguageHeader: React.FC = () => (
  <div className="grid grid-cols-[1fr,100px,100px,100px,100px] border-b border-gray-800">
    <div className="p-4 font-medium">Translations</div>
    {LANGUAGES.map((lang) => (
      <div key={lang} className="p-4 text-center font-medium">
        {lang}
      </div>
    ))}
  </div>
);
