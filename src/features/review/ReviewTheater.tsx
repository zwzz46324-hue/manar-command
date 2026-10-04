
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { mockRepository } from "../../adapters/mock/repository";
import type { Decision, Summary } from "../../domain/types";
import "./ReviewTheater.css";

export function ReviewTheater() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [item, setItem] = useState<Summary | undefined>();
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      mockRepository.getSummary(id),
      mockRepository.listDecisions(id),
    ]).then(([s, d]) => { setItem(s); setDecisions(d); setLoading(false); });
  }, [id]);

  const decide = async (decision: Decision["decision"], status: Summary["status"]) => {
    if (!item) return;
    setBusy(true);
    const updated = await mockRepository.updateSummaryStatus(item.id, status);
    setItem(updated ? { ...updated } : item);
    setDecisions((prev) => [
      ...prev,
      {
        id: "dec-" + Date.now(),
        summaryId: item.id,
        decision,
        actorId: "user-9",
        reasonAr: "-",
        reasonEn: "-",
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ]);
    setBusy(false);
  };

  if (loading) return <div className="review-theater"><p className="muted-line">...</p></div>;
  if (!item) return (
    <div className="review-theater">
      <p className="muted-line">{lang === "ar" ? "الملخص غير موجود." : "Summary not found."}</p>
      <Link to="/review" className="back-link">{lang === "ar" ? "رجوع إلى الطابور" : "Back to queue"}</Link>
    </div>
  );

  const statusLabelsAr: Record<string, string> = { pending: "معلق", "in-review": "قيد المراجعة", "needs-changes": "يحتاج تعديل", approved: "معتمد", rejected: "مرفوض" };
  const statusLabelsEn: Record<string, string> = { pending: "Pending", "in-review": "In review", "needs-changes": "Needs changes", approved: "Approved", rejected: "Rejected" };
  const statusLabel = lang === "ar" ? statusLabelsAr[item.status] : statusLabelsEn[item.status];

  return (
    <div className="review-theater">
      <nav className="breadcrumb">
        <Link to="/review" className="crumb">{lang === "ar" ? "طابور المراجعة" : "Review Queue"}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{item.courseCode}</span>
      </nav>

      <header className="review-header">
        <div>
          <p className="review-code-small">{item.courseCode}</p>
          <h1 className="review-h1">{lang === "ar" ? item.titleAr : item.titleEn}</h1>
          <p className="review-sub">{lang === "ar" ? item.courseTitleAr : item.courseTitleEn}</p>
        </div>
        <div className="review-meta">
          <span className={"review-status status-" + item.status}>{statusLabel}</span>
          <span className="meta-chip">v{item.version}</span>
          <span className="meta-chip">{item.updatedAt}</span>
        </div>
      </header>

      <div className="review-split">
        <section className="review-pane">
          <h3 className="pane-title">{lang === "ar" ? "النص الأصلي" : "Transcript"}</h3>
          <div className="pane-body">
            {item.transcriptAr.split("\\n").map((line, i) => (<p key={i}>{line}</p>))}
          </div>
        </section>

        <section className="review-pane">
          <h3 className="pane-title">{lang === "ar" ? "الملخص" : "Summary"}</h3>
          <div className="pane-body">
            <p>{item.summaryAr}</p>
          </div>
        </section>
      </div>

      <section className="review-decisions">
        <h3 className="pane-title">{lang === "ar" ? "القرارات السابقة" : "Past decisions"}</h3>
        {decisions.length === 0 && <p className="muted-line">{lang === "ar" ? "لا توجد قرارات سابقة." : "No past decisions."}</p>}
        <ul className="decision-list">
          {decisions.map((d) => (
            <li key={d.id} className="decision-item">
              <span className={"decision-badge dec-" + d.decision}>{d.decision}</span>
              <span className="decision-reason">{lang === "ar" ? d.reasonAr : d.reasonEn}</span>
              <span className="decision-meta">{d.actorId} · {d.createdAt}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="review-actions">
        <button className="act-btn approve" type="button" disabled={busy} onClick={() => decide("approve", "approved")}>{lang === "ar" ? "اعتماد" : "Approve"}</button>
        <button className="act-btn reject" type="button" disabled={busy} onClick={() => decide("reject", "rejected")}>{lang === "ar" ? "رفض" : "Reject"}</button>
        <button className="act-btn changes" type="button" disabled={busy} onClick={() => decide("request-changes", "needs-changes")}>{lang === "ar" ? "طلب تعديل" : "Request changes"}</button>
        <button className="act-btn back" type="button" disabled={busy} onClick={() => decide("return-to-editing", "pending")}>{lang === "ar" ? "إرجاع للتحرير" : "Return to editing"}</button>
        <div className="actions-spacer" />
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
