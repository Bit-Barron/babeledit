import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TranslationEditorProps {}

export const TranslationEditor: React.FC<TranslationEditorProps> = ({}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <section>
      <Button onClick={() => goBack()}>Back</Button>
      <h1>Translation Editor</h1>
    </section>
  );
};
