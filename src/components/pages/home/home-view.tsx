import React, { useState } from "react";
import { CreateProject } from "@/components/pages/create-project/create-project-dialog";
import { Button } from "@/components/ui/button";
import { TRANSLATION_PROJECTS } from "@/utils/constants";
import { FaPlus } from "react-icons/fa";

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

  return (
    <main className="h-screen flex flex-col bg-black">
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 pt-12 pb-6">
        <div className="flex flex-col h-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Create New Project
            </h1>
            <p className="text-gray-400">
              Select a project type to get started
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              className="text-gray-400 hover:text-white border-gray-800 hover:border-gray-700 hover:bg-gray-900"
            >
              Open project...
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
            {TRANSLATION_PROJECTS.map(({ title, Icon }) => (
              <button
                onClick={() => {
                  setSelectedProjectType(title);
                  setIsCreateProjectOpen(true);
                }}
                key={title}
                className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:scale-105"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlus className="w-4 h-4 text-blue-400" />
                </div>
                <Icon className="w-10 h-10 mb-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm font-medium text-center text-gray-300 group-hover:text-white transition-colors">
                  {title}
                </span>
              </button>
            ))}
          </div>
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
