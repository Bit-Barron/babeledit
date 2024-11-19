import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  fileName: string;
}

export const Header: React.FC<HeaderProps> = ({ fileName }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-800">
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="text-white hover:text-white hover:bg-gray-800"
      >
        Back
      </Button>
      <span>Translation Editor - {fileName || "No file"}</span>
    </div>
    <Button
      variant="outline"
      className="text-white border-gray-600 hover:bg-gray-800 hover:text-white"
    >
      Save Changes
    </Button>
  </div>
);
