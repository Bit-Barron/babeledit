import React, { useState } from "react";
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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { setLanguages, languages } = useLanguageStore();

  return (
    <MyDialog title="Select language" isOpen={isOpen} setIsOpen={onClose}>
      <Input
        placeholder="Search languages..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ScrollArea className="h-[300px] mt-4">
        {LANGUAGES.map((language) => (
          <div key={language.name} className="p-1 rounded-lg">
            <Button
              onClick={() => {
                if (selectedLanguages.includes(language.name)) {
                  setSelectedLanguages(
                    selectedLanguages.filter((lang) => lang !== language.name)
                  );
                  setLanguages(
                    languages
                      .filter((lang) => lang.name !== language.name)
                      .map((lang) => lang.name)
                  );
                  return;
                }
                setSelectedLanguages([...selectedLanguages, language.name]);
                setLanguages([
                  ...languages.map((lang) => lang.name),
                  language.name,
                ]);
              }}
              variant="outline"
              className="w-full justify-start"
            >
              <span>{language.name}</span>
            </Button>
          </div>
        ))}
      </ScrollArea>
      <div className="flex items-end justify-end gap-2 mt-5">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Save
        </Button>
      </div>
    </MyDialog>
  );
};
