import { Routes, Route } from "react-router-dom";
import "./styles/app.css";
import { Home } from "@/pages/home";
import { TranslationEditor } from "@/pages/translation-editor";
import { Button } from "@/components/ui/button";
import { navigate } from "@/shared/utils/constants";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/translation-editor" element={<TranslationEditor />} />
      <Route
        path="*"
        element={
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="">404 Error</div>
            <Button onClick={() => navigate("/")}>Go Back</Button>
          </div>
        }
      />
    </Routes>
  );
}

