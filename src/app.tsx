import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/app.css";
import { Home } from "@/pages/home";
import { TranslationEditor } from "@/pages/translation-editor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/translation-editor" element={<TranslationEditor />} />
    </Routes>
  );
}

export default App;
