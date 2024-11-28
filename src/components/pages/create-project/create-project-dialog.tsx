import { PROJECT_CONFIGS } from "@/components/configs/project-configs";
import { MyDialog } from "@/components/elements/my-dialog";
import { FileUpload } from "@/components/pages/create-project/create-project-file-upload";
import { LanguageDisplay } from "@/components/pages/create-project/create-project-language-list";
import { LanguageSelectDialog } from "@/components/pages/create-project/create-project-language-select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFileUploadStore } from "@/store/file-upload-store";
import { useLanguageStore } from "@/store/language-store";
import { PRIMARY_LANG } from "@/utils/constants";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const { languages } = useLanguageStore();
  const { selectedFiles, processFiles } = useFileUploadStore();
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const config =
    PROJECT_CONFIGS[projectType] || PROJECT_CONFIGS["Generic JSON"];

  const handleCreateProject = async () => {
    const processedFiles = await processFiles();

    if (processedFiles.length > 0) {
      setIsOpen(false);
      navigate("/translation-editor");
      toast({
        title: "Project created",
        description: `Your ${projectType} project has been created successfully`,
        variant: "success",
      });
    } else {
      toast({
        title: "Error processing files",
        description: `Please make sure your files are valid ${projectType} files`,
        variant: "destructive",
      });
    }
  };

  return (
    <MyDialog
      title={config.title}
      description={config.description}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="space-y-4">
        <FileUpload
          maxSize={config.maxSize}
          acceptedTypes={config.acceptedTypes}
          onUpload={(files) =>
            useFileUploadStore.getState().setSelectedFiles(files)
          }
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
            Create {projectType} Project
          </Button>
        </div>

        <div className="space-y-2">
          {languages.map((language) => (
            <div key={language.id} className="p-2 bg-gray-800 rounded-md">
              {language.name}
            </div>
          ))}
        </div>

        <Separator />
        <LanguageDisplay primaryLang={PRIMARY_LANG} />
        <LanguageSelectDialog
          isOpen={isLanguageOpen}
          onClose={() => setIsLanguageOpen(false)}
        />
      </div>
    </MyDialog>
  );
};

export default CreateProject;
