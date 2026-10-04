
import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { truthRepo } from "../../adapters/mock/repository";
import type { TruthEvent, TruthEventKind } from "../../domain/types";
import "./TruthLog.css";

const kinds: TruthEventKind[] = [
  "auth", "permission", "course", "content", "summary",
  "review", "document", "publish", "bot", "ai",
  "backup", "security", "config", "code", "audit",
];

export function TruthLog() {
  const { lang, t } = useLang();
  const [events, setEvents] = useState<TruthEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TruthEventKind | "all">("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    truthRepo.list().then((e) => { setEvents(e); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return events.filter((e) => {
      if (filter !== "all" && e.kind !== filter) return false;
      if (!term) return true;
      return (
        e.actorId.toLowerCase().includes(term) ||
        e.targetId.toLowerCase().includes(term) ||
        e.traceId.toLowerCase().includes(term) ||
        e.actionAr.toLowerCase().includes(term) ||
        e.actionEn.toLowerCase().includes(term)
      );
    });
  }, [events, filter, query]);

  const labelsAr: Record<string, string> = {
    all: "الكل", auth: "دخول", permission: "صلاحيات",
    course: "مقررات", content: "محتوى", summary: "ملخصات",
    review: "مراجعة", document: "مستندات", publish: "نشر",
    bot: "بوتات", ai: "ذكاء", backup: "نسخ", security: "أمن",
    config: "إعداد", code: "كود", audit: "تدقيق",
  };
  const labelsEn: Record<string, string> = {
    all: "All", auth: "Auth", permission: "Permission",
    course: "Course", content: "Content", summary: "Summary",
    review: "Review", document: "Document", publish: "Publish",
    bot: "Bot", ai: "AI", backup: "Backup", security: "Security",
    config: "Config", code: "Code", audit: "Audit",
  };
  const labels = lang === "ar" ? labelsAr : labelsEn;

  const title = lang === "ar" ? "سجل الحقيقة" : "Truth Log";
  const subtitle = lang === "ar" ? "كل فعل في المنظومة موثق بالمصدر والنتيجة" : "Every action in the ecosystem, with source and result";
  const searchPlaceholder = lang === "ar" ? "ابحث بالفاعل أو الهدف أو رقم التتبع..." : "Search by actor, target or trace ID...";
  const emptyMsg = lang === "ar" ? "لا توجد أحداث مطابقة." : "No matching events.";
  const colTime = lang === "ar" ? "الوقت" : "Time";
  const colActor = lang === "ar" ? "الفاعل" : "Actor";
  const colAction = lang === "ar" ? "الفعل" : "Action";
  const colTarget = lang === "ar" ? "الهدف" : "Target";
  const colSource = lang === "ar" ? "المصدر" : "Source";
  const colResult = lang === "ar" ? "النتيجة" : "Result";
  const colTrace = lang === "ar" ? "التتبع" : "Trace";

  return (
    <div className="truth-log">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {events.length}</span>
        </div>
      </header>

      <div className="truth-toolbar">
        <input className="truth-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} />
      </div>

      <div className="truth-filters">
        <button className={"truth-filter" + (filter === "all" ? " active" : "")} type="button" onClick={() => setFilter("all")}>{labels.all}</button>
        {kinds.map((k) => (
          <button key={k} className={"truth-filter" + (filter === k ? " active" : "")} type="button" onClick={() => setFilter(k)}>{labels[k]}</button>
        ))}
      </div>

      <div className="truth-table-wrap">
        <table className="truth-table">
          <thead>
            <tr>
              <th>{colTime}</th>
              <th>{colActor}</th>
              <th>{colAction}</th>
              <th>{colTarget}</th>
              <th>{colSource}</th>
              <th>{colResult}</th>
              <th>{colTrace}</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} className="truth-empty">...</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={7} className="truth-empty">{emptyMsg}</td></tr>}
            {!loading && filtered.map((e) => (
              <tr key={e.id}>
                <td className="mono">{e.at.slice(11, 16)}</td>
                <td><span className="actor-id">{e.actorId}</span><span className="actor-role">{e.actorRole}</span></td>
                <td className="action-cell"><span className={"kind-badge kind-" + e.kind}>{labels[e.kind]}</span>{lang === "ar" ? e.actionAr : e.actionEn}</td>
                <td className="mono">{e.targetType} / {e.targetId}</td>
                <td><span className="source-pill">{e.source}</span></td>
                <td><span className={"result-pill res-" + e.result}>{e.result}</span></td>
                <td className="mono trace-cell">{e.traceId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
