import { Input } from "@/components/ui/input";
import { PlaceholderPart } from "@/types/translation-editor.types";

export async function validateJSON(file: File): Promise<File | null> {
  try {
    const text = await file.text();
    JSON.parse(text); // Throws if not valid JSON
    return file; // Return the file itself if valid
  } catch (e) {
    return null; // Return null if invalid
  }
}

export const highlightPlaceholders = (text: string) => {
  if (!text) return null;

  const parts = text.split(/(\{\{.*?\}\}|\{[^{}]+\})/g).filter(Boolean);
  const processedParts: PlaceholderPart[] = parts.map((part) => ({
    type:
      (part.startsWith("{{") && part.endsWith("}}")) ||
      (part.startsWith("{") && part.endsWith("}"))
        ? "placeholder"
        : "text",
    content: part,
  }));

  return (
    <div className="w-full space-y-2">
      {processedParts.map((part, index) => (
        <div key={`${part.content}-${index}`} className="w-full">
          {part.type === "placeholder" ? (
            <span className="font-medium text-primary">{part.content}</span>
          ) : (
            <Input
              value={part.content}
              className="w-full"
              aria-label={`Text part ${index + 1}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
