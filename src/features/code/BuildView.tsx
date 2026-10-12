import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { buildRepo } from "../../adapters/mock/repository";
import type { BuildDetail, BuildStatus } from "../../domain/types";
import "./BuildView.css";

const statuses: BuildStatus[] = ["success", "failed", "running", "queued"];

export function BuildView() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<BuildDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<BuildStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    buildRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return statusFilter === "all" ? items : items.filter((b) => b.status === statusFilter);
  }, [items, statusFilter]);

  const statusLabelsAr: Record<string, string> = { all: "الكل", success: "نجح", failed: "فشل", running: "قيد التنفيذ", queued: "في الطابور" };
  const statusLabelsEn: Record<string, string> = { all: "All", success: "Success", failed: "Failed", running: "Running", queued: "Queued" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const title = lang === "ar" ? "البناء والاختبارات" : "Build & Tests";
  const subtitle = lang === "ar" ? "عمليات البناء والاختبار لكل إصدار" : "Build and test runs for each release";
  const emptyMsg = lang === "ar" ? "لا توجد عمليات مطابقة." : "No matching builds.";

  const totalPassed = items.reduce((a, b) => a + b.testsPassed, 0);
  const totalFailed = items.reduce((a, b) => a + b.testsFailed, 0);
  const avgCoverage = items.length > 0 ? Math.round(items.reduce((a, b) => a + b.coveragePct, 0) / items.length) : 0;
  const successCount = items.filter((b) => b.status === "success").length;

  return (
    <div className="bv-page">
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

      <div className="bv-stats">
        <div className="bv-stat"><span className="bvs-v success">{successCount}</span><span className="bvs-k">{lang === "ar" ? "بناء ناجح" : "Successful"}</span></div>
        <div className="bv-stat"><span className="bvs-v">{totalPassed}</span><span className="bvs-k">{lang === "ar" ? "اختبار نجح" : "Tests passed"}</span></div>
        <div className="bv-stat"><span className={"bvs-v" + (totalFailed > 0 ? " danger" : "")}>{totalFailed}</span><span className="bvs-k">{lang === "ar" ? "اختبار فشل" : "Tests failed"}</span></div>
        <div className="bv-stat"><span className="bvs-v">{avgCoverage}%</span><span className="bvs-k">{lang === "ar" ? "متوسط التغطية" : "Avg coverage"}</span></div>
      </div>

      <div className="bv-filters">
        <button className={"bv-filter" + (statusFilter === "all" ? " active" : "")} type="button" onClick={() => setStatusFilter("all")}>{statusLabels.all} ({items.length})</button>
        {statuses.map((s) => (
          <button key={s} className={"bv-filter st-" + s + (statusFilter === s ? " active" : "")} type="button" onClick={() => setStatusFilter(s)}>
            {statusLabels[s]} ({items.filter((b) => b.status === s).length})
          </button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="bv-list">
        {filtered.map((b) => (
          <article key={b.id} className={"bv-card st-" + b.status + (expanded === b.id ? " expanded" : "")}>
            <div className="bv-card-head" onClick={() => setExpanded(expanded === b.id ? null : b.id)}>
              <div className="bv-card-main">
                <span className="bv-num">#{b.number}</span>
                <span className="bv-msg">{b.message}</span>
              </div>
              <span className={"bv-status st-" + b.status}>{statusLabels[b.status]}</span>
            </div>

            <div className="bv-card-meta">
              <span className="bv-branch">{b.branch}</span>
              <span className="bv-commit">{b.commit}</span>
              <span className="bv-duration">{b.durationSec}s</span>
              <span className="bv-by">{b.triggeredBy}</span>
              <span className="bv-date">{b.startedAt.slice(0, 16).replace("T", " ")}</span>
            </div>

            <div className="bv-tests">
              <div className="bv-test-item">
                <span className="bv-test-label">{lang === "ar" ? "نجحت" : "Passed"}</span>
                <span className="bv-test-val ok">{b.testsPassed}</span>
              </div>
              <div className="bv-test-item">
                <span className="bv-test-label">{lang === "ar" ? "فشلت" : "Failed"}</span>
                <span className={"bv-test-val" + (b.testsFailed > 0 ? " bad" : "")}>{b.testsFailed}</span>
              </div>
              <div className="bv-test-item">
                <span className="bv-test-label">{lang === "ar" ? "التغطية" : "Coverage"}</span>
                <span className="bv-test-val">{b.coveragePct}%</span>
              </div>
              <div className="bv-test-item">
                <span className="bv-test-label">{lang === "ar" ? "المخرجات" : "Artifacts"}</span>
                <span className="bv-test-val">{b.artifacts}</span>
              </div>
            </div>

            {expanded === b.id && b.logs && b.logs.length > 0 && (
              <div className="bv-logs">
                <div className="bv-logs-head">{lang === "ar" ? "السجل" : "Logs"}</div>
                <pre className="bv-logs-body">
                  {b.logs.map((l, i) => <div key={i} className="bv-log-line">{l}</div>)}
                </pre>
              </div>
            )}

            {expanded === b.id && (!b.logs || b.logs.length === 0) && (
              <div className="bv-no-logs">{lang === "ar" ? "لا توجد سجلات." : "No logs."}</div>
            )}
          </article>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
