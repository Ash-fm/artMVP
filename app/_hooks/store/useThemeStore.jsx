import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: "dark",
      changeMode: () => set({ mode: get().mode === "light" ? "dark" : "light" }),
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;
