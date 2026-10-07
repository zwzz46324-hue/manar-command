import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../i18n";
import { commandRepo, searchRepo } from "../../adapters/mock/repository";
import type { Command, CommandGroup, SearchHit } from "../../domain/types";
import "./ManarCommandPalette.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Item =
  | { kind: "command"; command: Command }
  | { kind: "search"; hit: SearchHit };

export function ManarCommandPalette({ open, onClose }: Props) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const [commands, setCommands] = useState<Command[]>([]);
  const [search, setSearch] = useState<SearchHit[]>([]);
  const [activeGroup, setActiveGroup] = useState<CommandGroup | "all">("all");

  useEffect(() => {
    if (!open) return;
    Promise.all([commandRepo.list(), searchRepo.all()]).then(([c, s]) => {
      setCommands(c);
      setSearch(s);
    });
  }, [open]);

  const groupLabelsAr: Record<string, string> = { all: "الكل", navigate: "التنقل", action: "إجراءات", search: "البحث", admin: "الإدارة" };
  const groupLabelsEn: Record<string, string> = { all: "All", navigate: "Navigate", action: "Actions", search: "Search", admin: "Admin" };
  const groupLabels = lang === "ar" ? groupLabelsAr : groupLabelsEn;

  const items: Item[] = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list: Item[] = [];

    // Commands
    commands
      .filter((c) => activeGroup === "all" || c.group === activeGroup)
      .filter((c) => {
        if (!term) return true;
        const lbl = (lang === "ar" ? c.labelAr : c.labelEn).toLowerCase();
        return lbl.includes(term) || c.id.toLowerCase().includes(term);
      })
      .forEach((c) => list.push({ kind: "command", command: c }));

    // Search hits (always appended at the end, filter by term)
    if (term) {
      search
        .filter((h) => {
          const t = (lang === "ar" ? h.titleAr : h.titleEn).toLowerCase();
          const s = (lang === "ar" ? h.subtitleAr : h.subtitleEn).toLowerCase();
          return t.includes(term) || s.includes(term);
        })
        .slice(0, 10)
        .forEach((h) => list.push({ kind: "search", hit: h }));
    }

    return list;
  }, [commands, search, q, lang, activeGroup]);

  useEffect(() => { setCursor(0); }, [q, open, activeGroup]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, items.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
      if (e.key === "Enter" && items[cursor]) {
        run(items[cursor]);
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, items, cursor, onClose]);

  const run = (it: Item) => {
    if (it.kind === "command") {
      if (it.command.route) navigate(it.command.route);
    } else {
      navigate(it.hit.route);
    }
  };

  if (!open) return null;

  const placeholder = lang === "ar" ? "ابحث أو نفّذ أمرًا..." : "Search or run a command...";
  const emptyMsg = lang === "ar" ? "لا توجد نتائج" : "No results";
  const cmdTitle = lang === "ar" ? "أوامر" : "Commands";
  const searchTitle = lang === "ar" ? "نتائج البحث" : "Search results";

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

        <div className="palette-groups">
          {(["all", "navigate", "action", "admin"] as const).map((g) => (
            <button
              key={g}
              className={"palette-group-btn" + (activeGroup === g ? " active" : "")}
              type="button"
              onClick={() => setActiveGroup(g)}
            >
              {groupLabels[g]}
            </button>
          ))}
        </div>

        <ul className="palette-list">
          {items.length === 0 && <li className="palette-empty">{emptyMsg}</li>}
          {items.map((it, i) => {
            const active = i === cursor;
            if (it.kind === "command") {
              const c = it.command;
              const disabled = !!c.requiresAr && c.requiresAr !== "OWNER" && c.requiresAr !== "SUPERVISOR";
              return (
                <li
                  key={"c-" + c.id}
                  className={"palette-item" + (active ? " active" : "") + (disabled ? " disabled" : "")}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => { if (!disabled) { run(it); onClose(); } }}
                >
                  <span className={"palette-group-chip pg-" + c.group}>{groupLabels[c.group] || c.group}</span>
                  <span className="palette-label">{lang === "ar" ? c.labelAr : c.labelEn}</span>
                  {c.requiresAr && (
                    <span className="palette-req">{lang === "ar" ? c.requiresAr : c.requiresEn}</span>
                  )}
                  {c.shortcut && <span className="palette-shortcut">{c.shortcut}</span>}
                </li>
              );
            }
            const h = it.hit;
            return (
              <li
                key={"s-" + h.id}
                className={"palette-item palette-search-item" + (active ? " active" : "")}
                onMouseEnter={() => setCursor(i)}
                onClick={() => { run(it); onClose(); }}
              >
                <span className="palette-group-chip pg-search">{searchTitle}</span>
                <span className="palette-label">{lang === "ar" ? h.titleAr : h.titleEn}</span>
                <span className="palette-sub">{lang === "ar" ? h.subtitleAr : h.subtitleEn}</span>
              </li>
            );
          })}
        </ul>

        <div className="palette-foot">
          <span>↑↓ {lang === "ar" ? "تنقل" : "navigate"}</span>
          <span>↵ {lang === "ar" ? "اختر" : "select"}</span>
          <span>esc {lang === "ar" ? "إغلاق" : "close"}</span>
          <span className="palette-count">{items.length} {lang === "ar" ? "عنصر" : "items"}</span>
        </div>
      </div>
    </div>
  );
}
