import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { jobControlRepo } from "../../adapters/mock/repository";
import type { JobControlItem, JobControlState } from "../../domain/types";
import "./JobControl.css";

const states: JobControlState[] = ["active", "queued", "failed", "dead-letter"];

export function JobControl() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<JobControlItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState<JobControlState | "all">("all");

  useEffect(() => {
    jobControlRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return stateFilter === "all" ? items : items.filter((i) => i.state === stateFilter);
  }, [items, stateFilter]);

  const countByState = useMemo(() => {
    const map: Record<string, number> = {};
    states.forEach((s) => { map[s] = 0; });
    items.forEach((i) => { map[i.state] = (map[i.state] || 0) + 1; });
    return map;
  }, [items]);

  const stateLabelsAr: Record<string, string> = { all: "الكل", active: "نشطة", queued: "في الطابور", failed: "فاشلة", "dead-letter": "ميتة (DLQ)" };
  const stateLabelsEn: Record<string, string> = { all: "All", active: "Active", queued: "Queued", failed: "Failed", "dead-letter": "Dead-letter" };
  const stateLabels = lang === "ar" ? stateLabelsAr : stateLabelsEn;

  const title = lang === "ar" ? "تحكم المهام" : "Job Control";
  const subtitle = lang === "ar" ? "الطوابير، العمال، وإعادة المعالجة" : "Queues, workers, and reprocessing";
  const emptyMsg = lang === "ar" ? "لا توجد مهام مطابقة." : "No matching jobs.";

  return (
    <div className="jcp-page">
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

      <div className="jcp-filters">
        <button className={"jcp-filter" + (stateFilter === "all" ? " active" : "")} type="button" onClick={() => setStateFilter("all")}>{stateLabels.all} ({items.length})</button>
        {states.map((s) => (
          <button key={s} className={"jcp-filter st-" + s + (stateFilter === s ? " active" : "")} type="button" onClick={() => setStateFilter(s)}>
            {stateLabels[s]} ({countByState[s] || 0})
          </button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="jcp-list">
        {filtered.map((j) => (
          <article key={j.id} className={"jcp-card st-" + j.state}>
            <div className="jcp-head">
              <span className="jcp-type">{lang === "ar" ? j.typeAr : j.typeEn}</span>
              <span className={"jcp-state st-" + j.state}>{stateLabels[j.state]}</span>
            </div>

            <div className="jcp-grid">
              <div className="jcp-item"><span className="jcp-k">{lang === "ar" ? "المزوّد" : "Provider"}</span><span className="jcp-v">{j.provider}</span></div>
              <div className="jcp-item"><span className="jcp-k">{lang === "ar" ? "النموذج" : "Model"}</span><span className="jcp-v">{j.model}</span></div>
              <div className="jcp-item"><span className="jcp-k">{lang === "ar" ? "الهدف" : "Target"}</span><span className="jcp-v">{j.targetId}</span></div>
              <div className="jcp-item"><span className="jcp-k">{lang === "ar" ? "الطابور" : "Queue"}</span><span className="jcp-v">{j.queue}</span></div>
              <div className="jcp-item"><span className="jcp-k">{lang === "ar" ? "المحاولة" : "Attempt"}</span><span className="jcp-v">{j.attempt} / {j.maxAttempts}</span></div>
              <div className="jcp-item"><span className="jcp-k">{lang === "ar" ? "التتبع" : "Trace"}</span><span className="jcp-v accent">{j.traceId}</span></div>
            </div>

            {j.state === "active" && (
              <div className="jcp-progress-wrap">
                <div className="jcp-progress-bar"><div className="jcp-progress-fill" style={{ width: j.progress + "%" }} /></div>
                <span className="jcp-progress-val">{j.progress}%</span>
              </div>
            )}

            {(j.errorAr || j.errorEn) && (
              <div className="jcp-error">
                <span className="jcp-error-icon">!</span>
                {lang === "ar" ? j.errorAr : j.errorEn}
              </div>
            )}

            <div className="jcp-foot">
              <span className="jcp-time">{j.createdAt.slice(0, 16).replace("T", " ")}</span>
              <div className="jcp-actions">
                {j.state === "failed" && <button className="jcp-btn" type="button">{lang === "ar" ? "إعادة" : "Retry"}</button>}
                {j.state === "dead-letter" && <button className="jcp-btn" type="button">{lang === "ar" ? "فحص" : "Inspect"}</button>}
                {(j.state === "active" || j.state === "queued") && <button className="jcp-btn danger" type="button">{lang === "ar" ? "إلغاء" : "Cancel"}</button>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
