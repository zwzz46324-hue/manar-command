import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "manar-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setThemeState((p) => (p === "dark" ? "light" : "dark"));
  const setTheme = (t: Theme) => setThemeState(t);

  return { theme, toggle, setTheme };
}
