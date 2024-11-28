import { Button } from "@/components/ui/button";

interface LanguageDisplayProps {
  primaryLang: string;
}

export const LanguageDisplay: React.FC<LanguageDisplayProps> = ({
  primaryLang,
}) => (
  <div className="flex space-x-5">
    <h1 className="mt-2">Primary Language</h1>
    <Button variant="secondary">{primaryLang}</Button>
  </div>
);
