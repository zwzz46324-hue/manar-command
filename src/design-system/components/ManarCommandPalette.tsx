
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../i18n";
import "./ManarCommandPalette.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Cmd = {
  id: string;
  labelAr: string;
  labelEn: string;
  group: string;
  action: () => void;
};

export function ManarCommandPalette({ open, onClose }: Props) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);

  const commands: Cmd[] = useMemo(() => [
    { id: "go-home", labelAr: "اذهب إلى القيادة", labelEn: "Go to Command", group: "NAVIGATION", action: () => navigate("/") },
    { id: "go-courses", labelAr: "افتح المقررات", labelEn: "Open Courses", group: "NAVIGATION", action: () => navigate("/section/1") },
    { id: "go-users", labelAr: "افتح المستخدمين", labelEn: "Open Users", group: "NAVIGATION", action: () => navigate("/section/5") },
    { id: "go-ai", labelAr: "افتح مشغّل الذكاء", labelEn: "Open AI Operator", group: "NAVIGATION", action: () => navigate("/section/8") },
    { id: "act-review", labelAr: "مراجعة الملخصات المعلقة", labelEn: "Review pending summaries", group: "ACTION", action: () => navigate("/section/4") },
    { id: "act-backup", labelAr: "إنشاء نسخة احتياطية", labelEn: "Create backup", group: "ACTION", action: () => alert("DEMO: backup") },
    { id: "act-ai", labelAr: "فتح أمر AI", labelEn: "Open AI Command", group: "ACTION", action: () => alert("DEMO: AI command") },
  ], [navigate]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return commands;
    return commands.filter((c) =>
      (lang === "ar" ? c.labelAr : c.labelEn).toLowerCase().includes(term)
    );
  }, [commands, q, lang]);

  useEffect(() => { setCursor(0); }, [q, open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
      if (e.key === "Enter" && filtered[cursor]) {
        filtered[cursor].action();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, cursor, onClose]);

  if (!open) return null;

  const placeholder = lang === "ar" ? "اكتب أمرًا..." : "Type a command...";
  const emptyMsg = lang === "ar" ? "لا توجد نتائج" : "No results";

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette-panel" onClick={(e) => e.stopPropagation()} dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="palette-search">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="palette-input"
          />
          <kbd>ESC</kbd>
        </div>

        <ul className="palette-list">
          {filtered.length === 0 && <li className="palette-empty">{emptyMsg}</li>}
          {filtered.map((c, i) => (
            <li
              key={c.id}
              className={"palette-item" + (i === cursor ? " active" : "")}
              onMouseEnter={() => setCursor(i)}
              onClick={() => { c.action(); onClose(); }}
            >
              <span className="palette-group">{c.group}</span>
              <span className="palette-label">{lang === "ar" ? c.labelAr : c.labelEn}</span>
            </li>
          ))}
        </ul>

        <div className="palette-foot">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
