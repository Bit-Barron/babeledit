export async function validateJSON(file: File): Promise<File | null> {
  try {
    const text = await file.text();
    JSON.parse(text); // Throws if not valid JSON
    return file; // Return the file itself if valid
  } catch (e) {
    return null; // Return null if invalid
  }
}
