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
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { languages } = useLanguageStore();
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const { selectedFiles, processFiles, isLoading } = useFileUploadStore();

  const handleCreateProject = async () => {
    const processedFiles = await processFiles();

    if (processedFiles.length > 0) {
      setIsOpen(false);
      navigate("/translation-editor");
      toast({
        title: "Project created",
        description: "You can now start translating your files",
        variant: "success",
      });
    } else {
      toast({
        title: "Error processing files",
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
            disabled={selectedFiles.length === 0 || isLoading}
          >
            {selectedFiles.length === 0
              ? "Upload files to continue"
              : isLoading
              ? "Processing..."
              : "Save changes"}
          </Button>
        </div>
        <div>
          {languages.map((language) => (
            <div key={language.id}>{language.name}</div>
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
