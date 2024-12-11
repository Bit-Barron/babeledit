import { create } from "zustand";

interface HomeStore {
  selectedProjectType: string;
  setSelectedProjectType: (projectType: string) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  selectedProjectType: "Generic JSON",
  setSelectedProjectType: (projectType) =>
    set({ selectedProjectType: projectType }),
}));
