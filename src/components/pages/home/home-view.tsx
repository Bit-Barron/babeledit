import React, { useState } from "react";
import { CreateProject } from "@/components/pages/create-project/create-project-dialog";
import { Button } from "@/components/ui/button";
import { TRANSLATION_PROJECTS } from "@/utils/constants";
import { Plus } from "lucide-react";

interface HomeViewProps {
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  isCreateProjectOpen,
  setIsCreateProjectOpen,
}) => {
  const [selectedProjectType, setSelectedProjectType] =
    useState<string>("Generic JSON");

  const handleProjectSelect = (projectType: string) => {
    setSelectedProjectType(projectType);
    setIsCreateProjectOpen(true);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
          <p className="text-gray-400">Select a project type to get started</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {TRANSLATION_PROJECTS.map(({ title, Icon }) => (
            <button
              onClick={() => handleProjectSelect(title)}
              key={title}
              className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition-all duration-200 aspect-square hover:bg-gray-800 hover:shadow-lg hover:scale-105"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="w-4 h-4 text-blue-400" />
              </div>
              <Icon className="w-12 h-12 mb-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-medium text-center text-gray-300 group-hover:text-white transition-colors">
                {title}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="text-gray-400 hover:text-white border-gray-800 hover:border-gray-700 hover:bg-gray-900"
          >
            Open example project...
          </Button>
        </div>

        <CreateProject
          isOpen={isCreateProjectOpen}
          setIsOpen={setIsCreateProjectOpen}
          projectType={selectedProjectType}
        />
      </div>
    </main>
  );
};

export default HomeView;
