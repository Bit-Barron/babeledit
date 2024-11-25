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
  return parts.map((part, index) => {
    if (
      (part.startsWith("{{") && part.endsWith("}}")) ||
      (part.startsWith("{") && part.endsWith("}"))
    ) {
      return (
        <span key={index} className="font-medium">
          {part}
        </span>
      );
    }
    return (
      <span key={index}>
        <Input value={part} />
      </span>
    );
  });
};

export const remomveJsonFromFile = (filename: string) => {
  return filename.replace(".json", "");
};
