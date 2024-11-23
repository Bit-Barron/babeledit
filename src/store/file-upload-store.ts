import { create } from "zustand";

interface FileUploadStore {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
}

export const useFileUploadStore = create<FileUploadStore>((set, get) => ({
  selectedFiles: [],

  setSelectedFiles: (files) => set({ selectedFiles: files }),

  addFiles: (files) => {
    const currentFiles = get().selectedFiles;
    set({ selectedFiles: [...currentFiles, ...files] });
  },

  removeFile: (index) => {
    const newFiles = get().selectedFiles.filter((_, i) => i !== index);
    set({ selectedFiles: newFiles });
  },
}));
