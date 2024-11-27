import { Input } from "@/components/ui/input";

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

  const parts = text.split(/(\{\{.*?\}\}|\{[^{}]+\})/g);

  return (
    <div className="w-full space-y-2">
      {parts.map((part, index) => {
        if (
          (part.startsWith("{{") && part.endsWith("}}")) ||
          (part.startsWith("{") && part.endsWith("}"))
        ) {
          return (
            <div key={index} className="w-full">
              <span className="font-medium">{part}</span>
            </div>
          );
        }
        return (
          <div key={index}>
            <Input value={part} className="!w-full" />
          </div>
        );
      })}
    </div>
  );
};
