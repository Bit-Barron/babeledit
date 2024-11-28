import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import { HomeView } from "@/components/pages/home/home-view";
import { TranslationEditor } from "@/translation-editor";
import "./fonts.css";

function App() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState<boolean>(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeView
            isCreateProjectOpen={isCreateProjectOpen}
            setIsCreateProjectOpen={setIsCreateProjectOpen}
          />
        }
      />
      <Route path="/translation-editor" element={<TranslationEditor />} />
    </Routes>
  );
}

export default App;
