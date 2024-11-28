import { create } from "zustand";

interface FileContent {
  name: string;
  content: any;
}

interface FileUploadStore {
  selectedFiles: File[];
  processedFiles: FileContent[];

  setSelectedFiles: (files: File[]) => void;
  removeFile: (index: number) => void;

  processFiles: () => Promise<FileContent[]>;
}

export const useFileUploadStore = create<FileUploadStore>((set, get) => ({
  selectedFiles: [],
  processedFiles: [],

  setSelectedFiles: (files) => set({ selectedFiles: files }),

  removeFile: (index) => {
    const newFiles = get().selectedFiles.filter((_, i) => i !== index);
    set({ selectedFiles: newFiles });
  },

  processFiles: async () => {
    try {
      const processedFiles = await Promise.all(
        get().selectedFiles.map(async (file) => {
          const text = await file.text();
          return {
            name: file.name,
            content: JSON.parse(text),
          };
        })
      );
      set({ processedFiles });
      return processedFiles;
    } catch (error) {
      return [];
    }
  },
}));
