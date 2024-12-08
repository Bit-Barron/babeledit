import React, { useState, useMemo } from "react";
import { MyDialog } from "@/components/elements/custom-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguageStore } from "@/store/language-store";

interface LanguageSelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectDialog: React.FC<LanguageSelectDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { languages, addLanguage, removeLanguage } = useLanguageStore();

  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter((language) =>
      language.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const isLanguageSelected = (languageName: string) =>
    languages.some((lang) => lang.name === languageName);

  const handleLanguageToggle = (languageName: string) => {
    const isCurrentlySelected = isLanguageSelected(languageName);

    if (isCurrentlySelected) {
      removeLanguage(languageName);
    } else {
      addLanguage(languageName);
    }
  };

  return (
    <MyDialog title="Select language" isOpen={isOpen} setIsOpen={onClose}>
      <Input
        placeholder="Search languages..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      <ScrollArea className="h-[300px]">
        {filteredLanguages.map((language) => (
          <div key={language.name} className="p-1">
            <Button
              onClick={() => handleLanguageToggle(language.name)}
              variant="outline"
              className={`w-full justify-start ${
                isLanguageSelected(language.name) ? "bg-secondary" : ""
              }`}
            >
              {language.name}
            </Button>
          </div>
        ))}
      </ScrollArea>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => onClose()}>
          Save
        </Button>
      </div>
    </MyDialog>
  );
};
