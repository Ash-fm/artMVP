// Example store using Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useExampleStore = create(
  persist(
    (set, get) => {
      return {
        selected: [1,2,3],
        setSelected: (selected_item) =>
          set({
            selected: get().selected.includes(selected_item)
              ? get().selectedProviders.filter((item) => item !== selected_item)
              : [...get().selectedProviders, selected_item],
          }),

        searchValue: "",
        setSearchValue: (value) => set({ searchValue: value }),
      };
    },
    {
      name: "example-store",
    }
  )
);

export default useExampleStore;
