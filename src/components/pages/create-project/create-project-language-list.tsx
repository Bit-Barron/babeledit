import { Button } from "@/components/ui/button";

interface LanguageDisplayProps {
  primaryLang?: string;
}

export const LanguageDisplay: React.FC<LanguageDisplayProps> = ({
  primaryLang,
}) => (
  <div className="flex space-x-5">
    <Button variant="default">
      {primaryLang || "Select Primary Language"}
    </Button>
  </div>
);
