"use client";

import React, { useState } from "react";
import { CreateProject } from "@/components/pages/create-project/create-project-dialog";
import { Button } from "@/components/ui/button";
import { TRANSLATION_PROJECTS } from "@/shared/utils/constants";
import { useHomeStore } from "@/store/home/home.store";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { selectedProjectType, setSelectedProjectType } = useHomeStore();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState<boolean>(false);

  return (
    <main className="h-screen flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 pt-12 pb-6">
        <div className="flex flex-col h-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p>Select a project type to get started</p>
          </div>

          <div className="flex justify-end mb-6">
            <Button>Open project...</Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
            {TRANSLATION_PROJECTS.map(({ title, Icon }) => (
              <button
                onClick={() => {
                  setSelectedProjectType(title);
                  setIsCreateProjectOpen(true);
                }}
                key={title}
                className="flex flex-col items-center justify-center p-4 rounded-xl border"
              >
                <Icon className="w-10 h-10 mb-3" />
                <span className="text-sm font-medium text-center">{title}</span>
              </button>
            ))}
          </div>

          <CreateProject
            isOpen={isCreateProjectOpen}
            setIsOpen={setIsCreateProjectOpen}
            projectType={selectedProjectType}
          />
        </div>
      </div>
    </main>
  );
};
