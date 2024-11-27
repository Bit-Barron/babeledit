import { create } from "zustand";

interface FileContent {
  name: string;
  content: any;
}

interface FileUploadStore {
  selectedFiles: File[];
  processedFiles: FileContent[];
  isLoading: boolean;

  setSelectedFiles: (files: File[]) => void;
  removeFile: (index: number) => void;

  setIsLoading: (loading: boolean) => void;
  processFiles: () => Promise<FileContent[]>;
}

export const useFileUploadStore = create<FileUploadStore>((set, get) => ({
  selectedFiles: [],
  processedFiles: [],
  isLoading: false,

  setSelectedFiles: (files) => set({ selectedFiles: files }),

  removeFile: (index) => {
    const newFiles = get().selectedFiles.filter((_, i) => i !== index);
    set({ selectedFiles: newFiles });
  },

  setIsLoading: (loading) => set({ isLoading: loading }),

  processFiles: async () => {
    set({ isLoading: true });

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
      set({ isLoading: false });
      return processedFiles;
    } catch (error) {
      set({ isLoading: false });

      return [];
    }
  },
}));
