import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockRepository } from "../../adapters/mock/repository";
import { useLang } from "../../i18n";
import type { Summary, SummaryStatus } from "../../domain/types";
import "./SummariesList.css";

const STATUSES: { id: SummaryStatus | "all"; ar: string; en: string }[] = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "pending", ar: "مسودة", en: "Draft" },
  { id: "in-review", ar: "قيد المراجعة", en: "In review" },
  { id: "needs-changes", ar: "يحتاج تعديل", en: "Needs changes" },
  { id: "approved", ar: "معتمد", en: "Approved" },
  { id: "rejected", ar: "مرفوض", en: "Rejected" },
];

export function SummariesList() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [items, setItems] = useState<Summary[]>([]);
  const [status, setStatus] = useState<SummaryStatus | "all">("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockRepository.listSummaries().then((s) => { setItems(s); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return items.filter((s) => {
      if (status !== "all" && s.status !== status) return false;
      if (q) {
        const t = q.toLowerCase();
        const hay = (s.id + s.courseCode + s.titleAr + s.titleEn + s.courseTitleAr + s.courseTitleEn).toLowerCase();
        if (!hay.includes(t)) return false;
      }
      return true;
    });
  }, [items, status, q]);

  const counts = useMemo(() => {
    const by: Record<string, number> = {};
    items.forEach((s) => { by[s.status] = (by[s.status] || 0) + 1; });
    return by;
  }, [items]);

  const statusLabel = (s: SummaryStatus) => {
    const found = STATUSES.find((x) => x.id === s);
    return found ? (ar ? found.ar : found.en) : s;
  };

  const srcLabel = (src: Summary["sourceType"]) => {
    const map: Record<string, [string, string]> = {
      audio: ["صوت", "Audio"],
      video: ["فيديو", "Video"],
      slides: ["شرائح", "Slides"],
      pdf: ["PDF", "PDF"],
      image: ["صورة", "Image"],
    };
    const m = map[src] || [src, src];
    return ar ? m[0] : m[1];
  };

  if (loading) return <div className="sl-empty">{ar ? "جارٍ التحميل…" : "Loading…"}</div>;

  return (
    <div className="sl-page">
      <div className="sl-stats">
        <div className="sl-stat">
          <span className="sl-stat-v">{items.length}</span>
          <span className="sl-stat-k">{ar ? "كل الملخصات" : "TOTAL"}</span>
        </div>
        <div className="sl-stat">
          <span className="sl-stat-v ok">{counts["approved"] || 0}</span>
          <span className="sl-stat-k">{ar ? "معتمد" : "APPROVED"}</span>
        </div>
        <div className="sl-stat">
          <span className="sl-stat-v info">{counts["in_review"] || 0}</span>
          <span className="sl-stat-k">{ar ? "قيد المراجعة" : "IN REVIEW"}</span>
        </div>
        <div className="sl-stat">
          <span className="sl-stat-v warn">{(counts["needs_changes"] || 0) + (counts["draft"] || 0)}</span>
          <span className="sl-stat-k">{ar ? "بحاجة عمل" : "NEEDS WORK"}</span>
        </div>
      </div>

      <input
        className="sl-search"
        placeholder={ar ? "🔎 ابحث بالعنوان أو الكود…" : "🔎 Search by title or code…"}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="sl-filters">
        {STATUSES.map((s) => (
          <button
            key={s.id}
            className={"sl-filter" + (status === s.id ? " active" : "")}
            onClick={() => setStatus(s.id)}
          >
            {ar ? s.ar : s.en}
            {s.id !== "all" && counts[s.id] ? ` (${counts[s.id]})` : ""}
          </button>
        ))}
      </div>

      <div className="sl-list">
        {filtered.length === 0 && (
          <div className="sl-empty">{ar ? "لا توجد ملخصات مطابقة" : "No matching summaries"}</div>
        )}
        {filtered.map((s) => (
          <Link key={s.id} to={"/summaries/" + s.id} className={"sl-card st-" + s.status}>
            <div className="sl-head">
              <span className="sl-title">{ar ? s.titleAr : s.titleEn}</span>
              <span className={"sl-status st-" + s.status}>{statusLabel(s.status)}</span>
            </div>
            <div className="sl-meta">
              <span className="sl-code">{s.courseCode}</span>
              <span>{ar ? s.courseTitleAr : s.courseTitleEn}</span>
              <span className="sl-src">🎙 {srcLabel(s.sourceType)} · {s.sourceDurationMin}{ar ? "د" : "min"}</span>
              <span>👤 {s.authorId}</span>
              <span>v{s.version}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="sl-count">
        {filtered.length} / {items.length} {ar ? "ملخص" : "summaries"}
      </div>
    </div>
  );
}
