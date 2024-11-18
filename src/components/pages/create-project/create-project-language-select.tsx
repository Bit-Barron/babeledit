import React, { useState } from "react";
import { MyDialog } from "@/components/elements/my-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LanguageSelectDialog: React.FC<LanguageSelectDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSelect = () => {};

  return (
    <MyDialog title="Select language" isOpen={isOpen} setIsOpen={onClose}>
      <Input
        placeholder="Search languages..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex items-end justify-end gap-2 mt-5">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleSelect}>
          Ok
        </Button>
      </div>
    </MyDialog>
  );
};
