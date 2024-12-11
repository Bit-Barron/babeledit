import { FileContent } from "@/shared/types/translation-editor.types";
import { create } from "zustand";

interface FileUploadStore {
  selectedFiles: File[];
  processedFiles: FileContent[];

  setSelectedFiles: (files: File[]) => void;

  processFiles: () => Promise<FileContent[]>;
}

export const useFileUploadStore = create<FileUploadStore>((set, get) => ({
  selectedFiles: [],
  processedFiles: [],

  setSelectedFiles: (files) => set({ selectedFiles: files }),

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
      throw new Error("Error processing files");
    }
  },
}));
