import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { publishFlowRepo } from "../../adapters/mock/repository";
import type { PublishFlow, PublishStageState } from "../../domain/types";
import "./PublishCenter.css";

type Filter = "all" | "delivering" | "failed" | "awaiting";

export function PublishCenter() {
  const { lang, t } = useLang();
  const [flows, setFlows] = useState<PublishFlow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    publishFlowRepo.list().then((f) => { setFlows(f); setLoading(false); });
  }, []);

  const flowState = (f: PublishFlow): Filter => {
    if (f.stages.some((s) => s.state === "failed")) return "failed";
    if (f.stages.some((s) => s.state === "active" && s.id === "student")) return "delivering";
    if (f.stages.some((s) => s.state === "active")) return "awaiting";
    return "all";
  };

  const filtered = useMemo(() => {
    if (filter === "all") return flows;
    return flows.filter((f) => flowState(f) === filter);
  }, [flows, filter]);

  const channelLabelsAr: Record<string, string> = { telegram: "تلجرام", whatsapp: "واتساب", site: "الموقع" };
  const channelLabelsEn: Record<string, string> = { telegram: "Telegram", whatsapp: "WhatsApp", site: "Site" };
  const channelLabels = lang === "ar" ? channelLabelsAr : channelLabelsEn;

  const title = lang === "ar" ? "مركز النشر" : "Publish Center";
  const subtitle = lang === "ar" ? "رحلة كل مستند من المراجعة إلى الطالب" : "Every document's journey from review to student";
  const emptyMsg = lang === "ar" ? "لا توجد مسارات مطابقة." : "No matching flows.";
  const recipientsLabel = lang === "ar" ? "مستلم" : "recipients";

  const filterLabelsAr: Record<string, string> = { all: "الكل", delivering: "قيد التسليم", failed: "فشل", awaiting: "بانتظار قرار" };
  const filterLabelsEn: Record<string, string> = { all: "All", delivering: "Delivering", failed: "Failed", awaiting: "Awaiting" };
  const filterLabels = lang === "ar" ? filterLabelsAr : filterLabelsEn;

  const countBy = (s: Filter) => s === "all" ? flows.length : flows.filter((f) => flowState(f) === s).length;

  const stateColors: Record<PublishStageState, string> = {
    done: "done",
    active: "active",
    pending: "pending",
    failed: "failed",
  };

  return (
    <div className="pc-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {flows.length}</span>
        </div>
      </header>

      <div className="pc-filters">
        {(["all", "delivering", "failed", "awaiting"] as Filter[]).map((f) => (
          <button key={f} className={"pc-filter st-" + f + (filter === f ? " active" : "")} type="button" onClick={() => setFilter(f)}>
            {filterLabels[f]} ({countBy(f)})
          </button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="pc-list">
        {filtered.map((f) => {
          const pct = f.recipients > 0 ? Math.round((f.delivered / f.recipients) * 100) : 0;
          return (
            <article key={f.id} className={"pc-flow state-" + flowState(f)}>
              <div className="pc-flow-head">
                <div>
                  <span className="pc-code">{f.courseCode}</span>
                  <h3 className="pc-title">{lang === "ar" ? f.titleAr : f.titleEn}</h3>
                </div>
                <div className="pc-channels">
                  {f.channels.length === 0 ? (
                    <span className="pc-channel ch-none">—</span>
                  ) : (
                    f.channels.map((c) => <span key={c} className={"pc-channel ch-" + c}>{channelLabels[c]}</span>)
                  )}
                </div>
              </div>

              <div className="pc-pipeline">
                {f.stages.map((s, i) => (
                  <div key={s.id} className={"pc-stage " + stateColors[s.state]}>
                    <div className="pc-stage-dot">
                      {s.state === "done" && <span className="pc-check">✓</span>}
                      {s.state === "failed" && <span className="pc-x">!</span>}
                    </div>
                    <div className="pc-stage-label">{lang === "ar" ? s.labelAr : s.labelEn}</div>
                    {s.at && <div className="pc-stage-time">{s.at.slice(5, 16).replace("T", " ")}</div>}
                    {s.noteAr && <div className="pc-stage-note">{lang === "ar" ? s.noteAr : s.noteEn}</div>}
                    {i < f.stages.length - 1 && <div className={"pc-line " + stateColors[s.state]} />}
                  </div>
                ))}
              </div>

              {f.recipients > 0 && (
                <div className="pc-progress-wrap">
                  <div className="pc-progress-bar"><div className="pc-progress-fill" style={{ width: pct + "%" }} /></div>
                  <span className="pc-progress-val">{f.delivered.toLocaleString()} / {f.recipients.toLocaleString()} {recipientsLabel} ({pct}%)</span>
                </div>
              )}

              <div className="pc-foot">
                <span>{lang === "ar" ? "بدأ" : "Started"}: {f.startedAt.slice(0, 16).replace("T", " ")}</span>
                <span>{lang === "ar" ? "آخر تحديث" : "Updated"}: {f.updatedAt.slice(0, 16).replace("T", " ")}</span>
              </div>
            </article>
          );
        })}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
