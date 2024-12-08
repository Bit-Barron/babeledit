import React from "react";
import { MyDialog } from "@/components/elements/custom-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/shared/utils/constants";
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
  const {
    languages,
    searchQuery,
    addLanguage,
    removeLanguage,
    setSearchQuery,
  } = useLanguageStore();

  return (
    <MyDialog title="Select language" isOpen={isOpen} setIsOpen={onClose}>
      <Input
        placeholder="Search languages..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      <ScrollArea className="h-[300px]">
        {LANGUAGES.filter((language) =>
          language.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((language) => (
          <div key={language.name} className="p-1">
            <Button
              onClick={() =>
                languages.some((lang) => lang.name === language.name)
                  ? removeLanguage(language.name)
                  : addLanguage(language.name)
              }
              variant="outline"
              className={`w-full justify-start ${
                languages.some((lang) => lang.name === language.name) &&
                "bg-secondary"
              }`}
            >
              {language.name}
            </Button>
          </div>
        ))}
      </ScrollArea>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="default" className="w-full" onClick={onClose}>
          Save
        </Button>
      </div>
    </MyDialog>
  );
};
