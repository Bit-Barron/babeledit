export async function validateJSON(file: File): Promise<File | null> {
  try {
    const text = await file.text();
    JSON.parse(text);
    return file;
  } catch (e) {
    return null;
  }
}
