import { MyDialog } from "@/components/elements/my-dialog";
import FileUpload from "@/components/elements/translation-file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

interface CreateProjectProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);

  const handleUpload = () => {
    console.log("testabrakadabar");
  };

  const handleCreateProject = () => {
    console.log("testabrakadabar");
  };

  return (
    <MyDialog
      title="Configure languages"
      description="Add or remove languages and their corresponding translations"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <FileUpload maxSize={0} acceptedTypes={[]} onUpload={handleUpload} />
      <div className="flex justify-between">
        <Button
          onClick={() => setIsLanguageOpen(true)}
          className="mt-5"
          variant="outline"
        >
          Add Language
        </Button>
        <Button
          onClick={handleCreateProject}
          className="mt-5"
          variant="default"
        >
          Save changes
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <h1 className="text-sm">Primary language</h1>
          <Button variant="outline" className="h-6">
            English
          </Button>
        </div>
        <Button variant="destructive" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </div>
      <MyDialog
        description=""
        title="Select language"
        isOpen={isLanguageOpen}
        setIsOpen={setIsLanguageOpen}
      >
        <Input placeholder="Search languages..." />
        <div className="flex items-end justify-end">
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => setIsLanguageOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="secondary" className="mt-5 ml-2">
            Ok
          </Button>
        </div>
      </MyDialog>
    </MyDialog>
  );
};
