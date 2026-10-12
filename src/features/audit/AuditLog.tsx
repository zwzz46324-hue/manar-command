import { useEffect, useMemo, useState } from "react";
import { auditRepo } from "../../adapters/mock/repository";
import { useLang } from "../../i18n";
import type { AuditEvent, AuditCategory, AuditSeverity } from "../../domain/types";
import "./AuditLog.css";

const CATS: (AuditCategory | "all")[] = ["all", "auth", "data", "restore", "ai", "admin", "system"];
const SEVS: (AuditSeverity | "all")[] = ["all", "info", "warn", "critical"];

export function AuditLog() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [cat, setCat] = useState<AuditCategory | "all">("all");
  const [sev, setSev] = useState<AuditSeverity | "all">("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    auditRepo.events().then(setEvents);
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (sev !== "all" && e.severity !== sev) return false;
      if (q) {
        const t = q.toLowerCase();
        const hay = (e.id + e.actorId + e.target + e.actionAr + e.actionEn).toLowerCase();
        if (!hay.includes(t)) return false;
      }
      return true;
    });
  }, [events, cat, sev, q]);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-log.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="al-page">
      <div className="al-banner">
        🔒 {ar
          ? "سجل غير قابل للتعديل — append-only. كل حدث مرتبط بالتالي عبر hash chain."
          : "Immutable log — append-only. Each event linked to next via hash chain."}
      </div>

      <input
        className="al-search"
        placeholder={ar ? "🔎 بحث بالمعرّف، الفاعل، الهدف…" : "🔎 Search by ID, actor, target…"}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="al-filters">
        {CATS.map((c) => (
          <button
            key={c}
            className={"al-filter" + (cat === c ? " active" : "")}
            onClick={() => setCat(c)}
          >
            {c === "all" ? (ar ? "الكل" : "All") : c.toUpperCase()}
          </button>
        ))}
        <span style={{ width: 1, background: "var(--manar-border)", margin: "0 6px" }} />
        {SEVS.map((s) => (
          <button
            key={s}
            className={"al-filter c-" + s + (sev === s ? " active" : "")}
            onClick={() => setSev(s)}
          >
            {s === "all" ? (ar ? "كل الخطورة" : "All sev") : s}
          </button>
        ))}
      </div>

      <div className="al-list">
        <div className="al-row head">
          <span></span>
          <span>ID</span>
          <span>{ar ? "الفئة" : "CATEGORY"}</span>
          <span>{ar ? "الفاعل" : "ACTOR"}</span>
          <span>{ar ? "الإجراء" : "ACTION"}</span>
          <span>{ar ? "الهدف" : "TARGET"}</span>
          <span>{ar ? "الوقت" : "TIME"}</span>
        </div>

        {filtered.length === 0 && (
          <div className="al-empty">{ar ? "لا توجد أحداث مطابقة" : "No matching events"}</div>
        )}

        {filtered.map((e) => (
          <div key={e.id} className={"al-row c-" + e.severity} onClick={() => setOpenId(openId === e.id ? null : e.id)}>
            <span><span className={"al-dot " + e.severity} /></span>
            <span className="al-actor">{e.id}</span>
            <span className={"al-cat " + e.category}>{e.category.toUpperCase()}</span>
            <span className="al-actor">{e.actorId}</span>
            <span className="al-action">{ar ? e.actionAr : e.actionEn}</span>
            <span className="al-target">{e.target}</span>
            <span className="al-at">{e.at.replace("T", " ").slice(0, 16)}</span>

            {openId === e.id && (
              <div className="al-detail">
                <p>{ar ? e.detailsAr : e.detailsEn}</p>
                <div className="al-hashes">
                  <span>hash: {e.hash}</span>
                  <span>prev: {e.prevHash}</span>
                  <span>sev: {e.severity}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="al-foot">
        <span className="al-count">
          {filtered.length} / {events.length} {ar ? "حدث" : "events"}
        </span>
        <button className="al-export" onClick={exportJson}>
          ⬇ {ar ? "تصدير JSON" : "Export JSON"}
        </button>
      </div>
    </div>
  );
}
