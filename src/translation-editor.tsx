import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const LANGUAGES = ["de-DE", "en-US", "es-ES", "fr-FR"];

interface FileData {
  name: string;
  content: any;
}

export const TranslationEditor = () => {
  const location = useLocation();
  const files = (location.state?.files || []) as FileData[];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-gray-800"
          >
            Back
          </Button>
          <span>Translation Editor - {files[0]?.name || "No file"}</span>
        </div>
        <Button
          variant="outline"
          className="text-white border-gray-600 hover:bg-gray-800 hover:text-white"
        >
          Save Changes
        </Button>
      </div>

      <div className="flex">
        <div className="w-[300px] border-r border-gray-800">
          <div className="p-4 border-b border-gray-800 font-medium">
            Translation IDs
          </div>
          <pre className="p-4 text-xs whitespace-pre-wrap">
            {JSON.stringify(files[0]?.content, null, 2)}
          </pre>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-[1fr,100px,100px,100px,100px] border-b border-gray-800">
            <div className="p-4 font-medium">Translations</div>
            {LANGUAGES.map((lang) => (
              <div key={lang} className="p-4 text-center font-medium">
                {lang}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationEditor;
