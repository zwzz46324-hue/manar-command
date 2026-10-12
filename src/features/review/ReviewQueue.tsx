
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { mockRepository } from "../../adapters/mock/repository";
import type { Summary, SummaryStatus } from "../../domain/types";
import "./ReviewQueue.css";

const statusOrder: SummaryStatus[] = ["pending", "in-review", "needs-changes", "approved", "rejected"];

export function ReviewQueue() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SummaryStatus | "all">("all");

  useEffect(() => {
    mockRepository.listSummaries().then((s) => { setItems(s); setLoading(false); });
  }, []);

  const filtered = useMemo(() => (
    filter === "all" ? items : items.filter((i) => i.status === filter)
  ), [items, filter]);

  const labelsAr: Record<string, string> = {
    all: "الكل", pending: "معلق", "in-review": "قيد المراجعة",
    "needs-changes": "يحتاج تعديل", approved: "معتمد", rejected: "مرفوض",
  };
  const labelsEn: Record<string, string> = {
    all: "All", pending: "Pending", "in-review": "In review",
    "needs-changes": "Needs changes", approved: "Approved", rejected: "Rejected",
  };

  const priorityLabels = lang === "ar"
    ? { normal: "عادية", high: "عالية", urgent: "عاجلة" }
    : { normal: "Normal", high: "High", urgent: "Urgent" };

  const title = lang === "ar" ? "طابور المراجعة" : "Review Queue";
  const subtitle = lang === "ar" ? "الملخصات التي تنتظر قرار المراجع" : "Summaries awaiting reviewer decisions";
  const emptyMsg = lang === "ar" ? "لا توجد ملخصات مطابقة." : "No matching summaries.";
  const openLabel = lang === "ar" ? "افتح" : "Open";
  const statusLabels = lang === "ar" ? labelsAr : labelsEn;

  return (
    <div className="review-queue">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {items.length}</span>
        </div>
      </header>

      <div className="review-filters">
        <button className={"review-filter" + (filter === "all" ? " active" : "")} type="button" onClick={() => setFilter("all")}>{statusLabels.all}</button>
        {statusOrder.map((s) => (
          <button key={s} className={"review-filter" + (filter === s ? " active" : "")} type="button" onClick={() => setFilter(s)}>{statusLabels[s]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="review-list">
        {filtered.map((s) => (
          <Link key={s.id} to={"/review/" + s.id} className="review-card">
            <div className="review-card-head">
              <span className="review-code">{s.courseCode}</span>
              <span className={"review-status status-" + s.status}>{statusLabels[s.status]}</span>
            </div>
            <h3 className="review-title">{lang === "ar" ? s.titleAr : s.titleEn}</h3>
            <p className="review-course">{lang === "ar" ? s.courseTitleAr : s.courseTitleEn}</p>
            <div className="review-card-foot">
              <span className={"review-priority prio-" + s.priority}>{priorityLabels[s.priority ?? "normal"]}</span>
              <span className="review-meta">v{s.version} · {s.updatedAt}</span>
              <span className="review-open">{openLabel} →</span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
