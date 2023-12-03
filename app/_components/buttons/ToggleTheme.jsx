"use client";

import useThemeStore from "@/app/_hooks/store/useThemeStore";
import useStore from "@/app/_hooks/store/useStore";

import { ThemeToggle } from "../_styles/buttons/ThemeToggle";

export default function ToggleTheme() {
  const mode = useStore(useThemeStore, (state) => state.mode);
  const { changeMode } = useThemeStore();

  const handleChange = () => {
    changeMode();
  };

  return (
    <ThemeToggle checked={mode === "light"} onChange={handleChange} mode={mode} />
  );
}
