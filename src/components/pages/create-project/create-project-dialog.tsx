import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyDialog } from "@/components/elements/my-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LanguageDisplay } from "@/components/pages/create-project/create-project-language-list";
import { LanguageSelectDialog } from "@/components/pages/create-project/create-project-language-select";
import { useFileUploadStore } from "@/store/file-upload-store";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/pages/create-project/create-project-file-upload";

interface CreateProjectProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [primaryLang, setPrimaryLang] = useState<string>("English");
  const [languages, setLanguages] = useState<Language[]>([
    { code: "en", name: "English" },
  ]);
  const { selectedFiles } = useFileUploadStore();

  const handleAddLanguage = (language: Language) => {
    setLanguages((prev) => [...prev, language]);
    setPrimaryLang(language.name);
  };

  const handleCreateProject = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload files to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileContents = await Promise.all(
        selectedFiles.map(async (file) => {
          const text = await file.text();
          return {
            name: file.name,
            content: JSON.parse(text),
          };
        })
      );

      setIsOpen(false);
      navigate("/translation-editor", {
        state: {
          languages,
          primaryLang,
          files: fileContents,
        },
      });
      toast({
        title: "Project created",
        description: "You can now start translating your files",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error reading files",
        description: "Please make sure your files are valid JSON",
        variant: "destructive",
      });
    }
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
            console.log(files);
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
