import { useState } from "react";
import "./app.css";
import { TRANSLATION_PROJECTS } from "./utils/constants";
import { CreateProject } from "@/components/pages/create-project/create-project";

function App() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState<boolean>(false);

  return (
    <main className="min-h-screen text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl mb-8">Create a new translation project</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TRANSLATION_PROJECTS.map((option) => (
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              key={option.title}
              className="flex flex-col items-center justify-center p-4 border rounded-lg transition-colors cursor-pointer aspect-square"
            >
              <option.icon className="text-3xl mb-2" />
              <span className="text-sm text-center text-gray-300">
                {option.title}
              </span>
            </button>
          ))}
        </div>
        <CreateProject
          isOpen={isCreateProjectOpen}
          setIsOpen={setIsCreateProjectOpen}
        />
        <button className="mt-8 text-gray-400 hover:text-gray-300 text-sm">
          Open example project...
        </button>
      </div>
    </main>
  );
}

export default App;
