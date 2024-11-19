import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyDialog } from "@/components/elements/my-dialog";
import FileUpload from "@/components/pages/create-project/create-project-file-upload";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LanguageDisplay } from "@/components/pages/create-project/create-project-language-list";
import { LanguageSelectDialog } from "@/components/pages/create-project/create-project-language-select";
import { useFileUploadStore } from "@/store/file-upload-store";
import { toast } from "sonner";

export const CreateProject: React.FC<CreateProjectProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const navigate = useNavigate();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [primaryLang, setPrimaryLang] = useState<string>("English");
  const [languages, setLanguages] = useState<Language[]>([
    { code: "en", name: "English" },
  ]);

  const { selectedFiles } = useFileUploadStore();

  const handleAddLanguage = (language: Language) => {
    setLanguages((prev) => [...prev, language]);
    setPrimaryLang(language.name);
    console.log(languages);
  };

  const handleCreateProject = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please upload files to continue");
      return;
    }

    setIsOpen(false);
    navigate("/translation-editor", {
      state: {
        languages,
        primaryLang,
        files: selectedFiles,
      },
    });
    toast.success("Project created successfully");
  };

  return (
    <MyDialog
      title="Configure languages"
      description="Add or remove languages and their corresponding translations"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="space-y-4">
        <FileUpload
          maxSize={0}
          acceptedTypes={[]}
          onUpload={function (files: File[]): void {
            console.log("Files uploaded:", files);
          }}
        />

        <div className="flex justify-between">
          <Button onClick={() => setIsLanguageOpen(true)} variant="outline">
            Add Language
          </Button>
          <Button
            onClick={handleCreateProject}
            variant="default"
            disabled={selectedFiles.length === 0}
          >
            {selectedFiles.length === 0
              ? "Upload files to continue"
              : "Save changes"}
          </Button>
        </div>

        <Separator />

        <LanguageDisplay primaryLang={primaryLang} />

        <LanguageSelectDialog
          isOpen={isLanguageOpen}
          onClose={() => setIsLanguageOpen(false)}
          onSelect={handleAddLanguage}
        />
      </div>
    </MyDialog>
  );
};
