import { useState } from "react";
import "./App.css";
import { TRANSLATION_PROJECTS } from "./utils/constants";
import { MyDialog } from "./components/elements/my-dialog";
import FileUpload from "@/components/elements/translation-file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function App() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);

  const handleUpload = () => {
    console.log("testabrakadabar");
  };

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
        <MyDialog
          title="Configure languages"
          description="Add or remove languages and their corresponding translations"
          isOpen={isCreateProjectOpen}
          setIsOpen={setIsCreateProjectOpen}
        >
          <FileUpload maxSize={0} acceptedTypes={[]} onUpload={handleUpload} />
          <Button
            onClick={() => setIsLanguageOpen(true)}
            className="mt-5"
            variant="outline"
          >
            Add Language
          </Button>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <h1 className="text-sm">Primary language</h1>
              <Button variant="outline" className="h-6">
                English
              </Button>
            </div>
            <Button variant="destructive">Close</Button>
          </div>
          <MyDialog
            description=""
            title="Select language"
            isOpen={isLanguageOpen}
            setIsOpen={setIsLanguageOpen}
          >
            <Input placeholder="Search languages..." />
            <div className="flex items-end justify-end">
              <Button className="mt-5" variant="outline">
                Cancel
              </Button>
              <Button variant="secondary" className="mt-5 ml-2">
                Ok
              </Button>
            </div>
          </MyDialog>
        </MyDialog>

        <button className="mt-8 text-gray-400 hover:text-gray-300 text-sm">
          Open example project...
        </button>
      </div>
    </main>
  );
}

export default App;
