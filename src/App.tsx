import { useState } from "react";
import "./App.css";
import { TRANSLATION_PROJECTS } from "./utils/constants";
import { TranslationDialog } from "./components/elements/my-dialog";
import FileUpload from "@/components/elements/translation-file-upload";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = (file: File) => {
    console.log(file);
  };

  return (
    <main className="min-h-screen text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl mb-8">Create a new translation project</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TRANSLATION_PROJECTS.map((option) => (
            <button
              onClick={() => setIsOpen(true)}
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
        <TranslationDialog
          title="Create a new translation project"
          description="Select a project to get started."
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <FileUpload maxSize={0} acceptedTypes={[]} onUpload={handleUpload} />
        </TranslationDialog>

        <button className="mt-8 text-gray-400 hover:text-gray-300 text-sm">
          Open example project...
        </button>
      </div>
    </main>
  );
}

export default App;
