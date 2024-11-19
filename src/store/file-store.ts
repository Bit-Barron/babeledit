interface FileStore {
  file: File | null;
  setFile: (file: File) => void;
}
