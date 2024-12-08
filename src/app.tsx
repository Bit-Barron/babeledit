import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import { HomeView } from "@/pages/home-view";
import { TranslationEditor } from "@/pages/translation-editor";

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
