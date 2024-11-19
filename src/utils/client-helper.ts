export function validateJSON(body: string) {
  try {
    let data = JSON.parse(body);
    return data;
  } catch (e) {
    return null;
  }
}
