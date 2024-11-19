import { Button } from "@/components/ui/button";

export const LanguageDisplay: React.FC<{ primaryLang: string }> = ({
  primaryLang,
}) => (
  <div className="flex justify-between items-center">
    <h1 className="text-sm">{primaryLang}</h1>
    <Button variant="outline" className="h-6">
      {primaryLang === "English" ? "Add Language" : "Change Language"}
    </Button>
  </div>
);
