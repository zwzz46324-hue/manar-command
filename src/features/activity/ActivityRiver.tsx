import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { riverRepo } from "../../adapters/mock/repository";
import type { RiverEvent, RiverGranularity } from "../../domain/types";
import "./ActivityRiver.css";

export function ActivityRiver() {
  const { lang, t } = useLang();
  const [events, setEvents] = useState<RiverEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [granularity, setGranularity] = useState<RiverGranularity>("all");

  useEffect(() => {
    riverRepo.list().then((e) => { setEvents(e); setLoading(false); });
  }, []);

  const kinds = ["summary", "document", "publish", "ai", "auth", "security", "config", "backup", "course"];

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return events.filter((e) => {
      if (kindFilter !== "all" && e.kind !== kindFilter) return false;
      if (!term) return true;
      return (
        e.titleAr.toLowerCase().includes(term) ||
        e.titleEn.toLowerCase().includes(term) ||
        e.actorId.toLowerCase().includes(term) ||
        e.target.toLowerCase().includes(term) ||
        e.traceId.toLowerCase().includes(term)
      );
    });
  }, [events, q, kindFilter]);

  const kindLabelsAr: Record<string, string> = { all: "الكل", summary: "ملخص", document: "مستند", publish: "نشر", ai: "ذكاء", auth: "دخول", security: "أمن", config: "إعداد", backup: "نسخة", course: "مقرر" };
  const kindLabelsEn: Record<string, string> = { all: "All", summary: "Summary", document: "Document", publish: "Publish", ai: "AI", auth: "Auth", security: "Security", config: "Config", backup: "Backup", course: "Course" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const grainLabelsAr: Record<string, string> = { hour: "آخر ساعة", day: "اليوم", week: "هذا الأسبوع", all: "الكل" };
  const grainLabelsEn: Record<string, string> = { hour: "Last hour", day: "Today", week: "This week", all: "All" };
  const grainLabels = lang === "ar" ? grainLabelsAr : grainLabelsEn;

  const title = lang === "ar" ? "نهر النشاط" : "Activity River";
  const subtitle = lang === "ar" ? "كل الأحداث في المنظومة، بالتفصيل والتتبع" : "All events in the ecosystem, with detail and trace";

  const formatTime = (iso: string) => iso.slice(11, 16);
  const formatDate = (iso: string) => iso.slice(0, 10);

  // Group by date
  const grouped = useMemo(() => {
    const map: Record<string, RiverEvent[]> = {};
    filtered.forEach((e) => {
      const d = formatDate(e.at);
      if (!map[d]) map[d] = [];
      map[d].push(e);
    });
    return map;
  }, [filtered]);

  return (
    <div className="ar-page">
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

      <div className="ar-toolbar">
        <input className="ar-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "ar" ? "ابحث بالفاعل، الهدف، أو رقم التتبع..." : "Search by actor, target, or trace ID..."} />
      </div>

      <div className="ar-filters">
        <button className={"ar-filter" + (kindFilter === "all" ? " active" : "")} type="button" onClick={() => setKindFilter("all")}>{kindLabels.all}</button>
        {kinds.map((k) => (
          <button key={k} className={"ar-filter" + (kindFilter === k ? " active" : "")} type="button" onClick={() => setKindFilter(k)}>{kindLabels[k]}</button>
        ))}
      </div>

      <div className="ar-granularity">
        {(["hour", "day", "week", "all"] as const).map((g) => (
          <button key={g} className={"ar-grain" + (granularity === g ? " active" : "")} type="button" onClick={() => setGranularity(g)}>{grainLabels[g]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}

      <div className="ar-stream">
        {Object.keys(grouped).sort().reverse().map((date) => (
          <section key={date} className="ar-day">
            <header className="ar-day-head">
              <span className="ar-day-label">{date}</span>
              <span className="ar-day-count">{grouped[date].length} {lang === "ar" ? "حدث" : "events"}</span>
            </header>
            <ol className="ar-list">
              {grouped[date].map((e) => (
                <li key={e.id} className={"ar-item res-" + e.result}>
                  <span className={"ar-time"}>{formatTime(e.at)}</span>
                  <span className={"ar-dot dot-" + e.kind} />
                  <div className="ar-body">
                    <div className="ar-title">{lang === "ar" ? e.titleAr : e.titleEn}</div>
                    <div className="ar-meta">
                      <span className="ar-actor">{e.actorId}</span>
                      <span className="ar-role">{e.actorRole}</span>
                      <span className="ar-target">{e.target}</span>
                      <span className={"ar-source src-" + e.source}>{e.source}</span>
                      <span className="ar-trace">{e.traceId}</span>
                    </div>
                  </div>
                  <span className={"ar-result res-chip-" + e.result}>{e.result}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
