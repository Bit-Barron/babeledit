import React from "react";
import { useLocation } from "react-router-dom";

export const LanguageHeader: React.FC = () => {
  const location = useLocation();
  const files = location.state?.files || [];

  return (
    <section className="flex justify-between border-b">
      <div className="p-4 font-medium">Translations</div>
      <div className="flex">
        {files.map((lang: { name: string }) => (
          <div key={lang.name} className="p-4 text-center font-medium">
            {lang.name}
          </div>
        ))}
      </div>
    </section>
  );
};
