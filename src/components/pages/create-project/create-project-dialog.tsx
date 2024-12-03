import React from "react";
import { PROJECT_CONFIGS } from "@/components/configs/project-configs";
import { MyDialog } from "@/components/elements/custom-dialog";
import { FileUpload } from "@/components/pages/create-project/create-project-file-upload";
import { LanguageDisplay } from "@/components/pages/create-project/create-project-language-list";
import { LanguageSelectDialog } from "@/components/pages/create-project/create-project-language-select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFileUploadStore } from "@/store/file-upload-store";
import { useLanguageStore } from "@/store/language-store";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoClose } from "react-icons/io5";

interface CreateProjectProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projectType: string;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  isOpen,
  setIsOpen,
  projectType,
}) => {
  const { toast } = useToast();
  const { languages, removeLanguage } = useLanguageStore();
  const { selectedFiles, processFiles } = useFileUploadStore();
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const CONFIG =
    PROJECT_CONFIGS[projectType] || PROJECT_CONFIGS["Generic JSON"];

  return (
    <MyDialog
      title={CONFIG.title}
      description={CONFIG.description}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="space-y-4">
        <FileUpload
          maxSize={CONFIG.maxSize}
          acceptedTypes={CONFIG.acceptedTypes}
          onUpload={(files) =>
            useFileUploadStore.getState().setSelectedFiles(files)
          }
        />

        <div className="flex justify-between items-center">
          <Button onClick={() => setIsLanguageOpen(true)} variant="outline">
            Add Language
          </Button>
          <Button
            onClick={async () => {
              try {
                await processFiles();
                navigate("/translation-editor");

                toast({
                  type: "background",
                  variant: "default",
                  description: `Project created successfully`,
                });
              } catch (error) {
                toast({
                  type: "background",
                  variant: "destructive",
                  description: `Failed to create project: ${error}`,
                });
              }
            }}
            variant="default"
            disabled={selectedFiles.length === 0}
          >
            Create {projectType} Project
          </Button>
        </div>

        {languages.length > 0 && (
          <div className="space-y-2 mt-4">
            <h3 className="text-sm font-medium text-gray-300">
              Selected Languages
            </h3>
            <ScrollArea className="w-full h-20 rounded-md">
              <div className="flex flex-col space-y-3">
                {languages.map((language) => (
                  <Button variant="secondary" key={language.id}>
                    <span className="text-gray-200 truncate">
                      {language.name}
                    </span>
                    <span onClick={() => removeLanguage(language.id)}>
                      <IoClose className="h-4 w-4 text-gray-400 hover:text-gray-200" />
                    </span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        <Separator className="my-4" />
        <LanguageDisplay />
        <LanguageSelectDialog
          isOpen={isLanguageOpen}
          onClose={() => setIsLanguageOpen(false)}
        />
      </div>
    </MyDialog>
  );
};

export default CreateProject;
