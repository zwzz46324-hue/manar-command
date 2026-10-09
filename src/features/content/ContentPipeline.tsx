import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { pipelineRepo } from "../../adapters/mock/repository";
import type { PipelineEntry, PipelineStage } from "../../domain/types";
import "./ContentPipeline.css";

const stages: PipelineStage[] = ["ingest", "extract", "normalize", "enrich", "review", "approve", "publish"];

export function ContentPipeline() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<PipelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState<PipelineStage | "all">("all");

  useEffect(() => {
    pipelineRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return stageFilter === "all" ? items : items.filter((i) => i.currentStage === stageFilter);
  }, [items, stageFilter]);

  const countByStage = useMemo(() => {
    const map: Record<string, number> = {};
    stages.forEach((s) => { map[s] = 0; });
    items.forEach((i) => { map[i.currentStage] = (map[i.currentStage] || 0) + 1; });
    return map;
  }, [items]);

  const stageLabelsAr: Record<string, string> = { ingest: "إدخال", extract: "استخراج", normalize: "توحيد", enrich: "إثراء", review: "مراجعة", approve: "اعتماد", publish: "نشر", all: "الكل" };
  const stageLabelsEn: Record<string, string> = { ingest: "Ingest", extract: "Extract", normalize: "Normalize", enrich: "Enrich", review: "Review", approve: "Approve", publish: "Publish", all: "All" };
  const stageLabels = lang === "ar" ? stageLabelsAr : stageLabelsEn;

  const kindLabelsAr: Record<string, string> = { audio: "صوت", video: "فيديو", slides: "شرائح", pdf: "PDF", image: "صورة", other: "أخرى" };
  const kindLabelsEn: Record<string, string> = { audio: "Audio", video: "Video", slides: "Slides", pdf: "PDF", image: "Image", other: "Other" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const title = lang === "ar" ? "خط أنابيب المحتوى" : "Content Pipeline";
  const subtitle = lang === "ar" ? "مراحل معالجة المحتوى من الإدخال إلى النشر" : "Content processing stages from ingest to publish";
  const emptyMsg = lang === "ar" ? "لا يوجد محتوى في هذه المرحلة." : "No content in this stage.";

  const stageIndex = (s: PipelineStage) => stages.indexOf(s);

  return (
    <div className="cp-page">
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

      <section className="cp-stages">
        {stages.map((s) => (
          <button
            key={s}
            className={"cp-stage" + (stageFilter === s ? " active" : "")}
            type="button"
            onClick={() => setStageFilter(stageFilter === s ? "all" : s)}
          >
            <span className="cp-stage-name">{stageLabels[s]}</span>
            <span className="cp-stage-count">{countByStage[s] || 0}</span>
          </button>
        ))}
      </section>

      {stageFilter !== "all" && (
        <button className="cp-clear" type="button" onClick={() => setStageFilter("all")}>
          {lang === "ar" ? "إظهار الكل" : "Show all"}
        </button>
      )}

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="cp-list">
        {filtered.map((p) => (
          <article key={p.id} className={"cp-card" + (p.errorAr ? " has-error" : "")}>
            <div className="cp-card-head">
              <div>
                <span className={"cp-kind kind-" + p.kind}>{kindLabels[p.kind]}</span>
                <span className="cp-code">{p.courseCode}</span>
              </div>
              <span className="cp-processor">{p.processor}</span>
            </div>
            <h3 className="cp-title">{lang === "ar" ? p.contentTitleAr : p.contentTitleEn}</h3>

            <div className="cp-flow">
              {stages.map((s, i) => {
                const idx = stageIndex(p.currentStage);
                const cls = i < idx ? "done" : i === idx ? "current" : "pending";
                return (
                  <div key={s} className={"cp-step " + cls}>
                    <span className="cp-step-dot" />
                    <span className="cp-step-label">{stageLabels[s]}</span>
                  </div>
                );
              })}
            </div>

            {p.errorAr && (
              <div className="cp-error">
                <span className="cp-error-icon">!</span>
                {lang === "ar" ? p.errorAr : p.errorEn}
              </div>
            )}

            <div className="cp-card-foot">
              <span className="cp-owner">{p.ownerId}</span>
              <span className="cp-date">{p.lastUpdateAt.slice(0, 16).replace("T", " ")}</span>
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
