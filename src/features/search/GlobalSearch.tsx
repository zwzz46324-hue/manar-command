import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { searchRepo } from "../../adapters/mock/repository";
import type { SearchEntityType, SearchHit } from "../../domain/types";
import "./GlobalSearch.css";

const typeOrder: SearchEntityType[] = ["course", "summary", "document", "user", "audit", "ai-job", "bot", "backup", "flag"];

export function GlobalSearch() {
  const { lang, t } = useLang();
  const [all, setAll] = useState<SearchHit[]>([]);
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<SearchEntityType | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchRepo.all().then((h) => { setAll(h); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return all.filter((h) => {
      if (typeFilter !== "all" && h.type !== typeFilter) return false;
      if (!term) return true;
      return (
        h.titleAr.toLowerCase().includes(term) ||
        h.titleEn.toLowerCase().includes(term) ||
        h.subtitleAr.toLowerCase().includes(term) ||
        h.subtitleEn.toLowerCase().includes(term)
      );
    });
  }, [all, q, typeFilter]);

  const typeLabelsAr: Record<string, string> = { all: "الكل", course: "مقرر", summary: "ملخص", document: "مستند", user: "مستخدم", audit: "حدث", "ai-job": "مهمة AI", bot: "بوت", backup: "نسخة", flag: "ميزة" };
  const typeLabelsEn: Record<string, string> = { all: "All", course: "Course", summary: "Summary", document: "Document", user: "User", audit: "Audit event", "ai-job": "AI job", bot: "Bot", backup: "Backup", flag: "Flag" };
  const typeLabels = lang === "ar" ? typeLabelsAr : typeLabelsEn;

  const title = lang === "ar" ? "البحث الشامل" : "Global Search";
  const subtitle = lang === "ar" ? "كل كيانات منار في مكان واحد" : "All MANAR entities in one place";
  const searchPlaceholder = lang === "ar" ? "ابحث في المقررات، الملخصات، المستندات، المستخدمين..." : "Search courses, summaries, documents, users...";
  const emptyMsg = lang === "ar" ? "لا توجد نتائج مطابقة." : "No matching results.";
  const openLabel = lang === "ar" ? "افتح" : "Open";

  const countByType = useMemo(() => {
    const map: Record<string, number> = {};
    all.forEach((h) => { map[h.type] = (map[h.type] || 0) + 1; });
    return map;
  }, [all]);

  return (
    <div className="gs-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {all.length}</span>
        </div>
      </header>

      <div className="gs-search-wrap">
        <input className="gs-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} autoFocus />
      </div>

      <div className="gs-filters">
        <button className={"gs-filter" + (typeFilter === "all" ? " active" : "")} type="button" onClick={() => setTypeFilter("all")}>{typeLabels.all} ({all.length})</button>
        {typeOrder.map((k) => (
          <button key={k} className={"gs-filter" + (typeFilter === k ? " active" : "")} type="button" onClick={() => setTypeFilter(k)}>{typeLabels[k]} ({countByType[k] || 0})</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="gs-results">
        {filtered.map((h) => (
          <Link key={h.id} to={h.route} className="gs-hit">
            <span className={"gs-type-chip gst-" + h.type}>{typeLabels[h.type]}</span>
            <div className="gs-hit-body">
              <div className="gs-hit-title">{lang === "ar" ? h.titleAr : h.titleEn}</div>
              <div className="gs-hit-sub">{lang === "ar" ? h.subtitleAr : h.subtitleEn}</div>
            </div>
            {h.status && <span className={"gs-status gs-" + h.status}>{h.status}</span>}
            <span className="gs-hit-date">{h.at}</span>
            <span className="gs-open">{openLabel} →</span>
          </Link>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
