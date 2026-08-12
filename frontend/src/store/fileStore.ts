import { create } from "zustand";
import { presets } from "./presets";

type PresetName = keyof typeof presets;

interface FileStore {
  content: string;
  active: PresetName | "custom";
  setContent: (content: string) => void;
  loadPreset: (name: PresetName) => void;
  loadCustom: () => void;
}

export const useFileStore = create<FileStore>((set) => ({
  content: "",
  active: "custom",
  setContent: (content) => set({ content, active: "custom" }),
  loadPreset: (name) => set({ content: presets[name], active: name }),
  loadCustom: () => set({ content: "", active: "custom" }),
}));
