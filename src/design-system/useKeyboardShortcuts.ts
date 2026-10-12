import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Handlers = {
  onToggleLang?: () => void;
  onToggleTheme?: () => void;
  onOpenPalette?: () => void;
  onEscape?: () => void;
};

export function useKeyboardShortcuts(h: Handlers) {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const target = e.target as HTMLElement | null;
      const inInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Esc يعمل دائمًا
      if (e.key === "Escape") {
        if (h.onEscape) h.onEscape();
        return;
      }

      // Ctrl+K يعمل دائمًا (حتى في input)
      if (ctrl && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (h.onOpenPalette) h.onOpenPalette();
        return;
      }

      // البقية لا تعمل داخل input
      if (inInput) return;

      if (ctrl && e.key.toLowerCase() === "l") {
        e.preventDefault();
        if (h.onToggleLang) h.onToggleLang();
      } else if (ctrl && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (h.onToggleTheme) h.onToggleTheme();
      } else if (ctrl && e.key.toLowerCase() === "h") {
        e.preventDefault();
        navigate("/");
      } else if (ctrl && e.key === "/") {
        e.preventDefault();
        navigate("/settings");
      } else if (ctrl && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        navigate("/audit");
      } else if (ctrl && e.key.toLowerCase() === "j") {
        e.preventDefault();
        navigate("/jobs");
      } else if (ctrl && e.key.toLowerCase() === "u") {
        e.preventDefault();
        navigate("/summaries");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [h, navigate]);
}
