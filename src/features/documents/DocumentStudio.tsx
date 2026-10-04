
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { documentsRepo } from "../../adapters/mock/repository";
import type { DocumentStatus, ManarDocument } from "../../domain/types";
import "./DocumentStudio.css";

const pipeline: DocumentStatus[] = [
  "queued",
  "generating-docx",
  "generating-pdf",
  "protecting",
  "ready",
  "published",
];

export function DocumentStudio() {
  const { lang, t } = useLang();
  const [docs, setDocs] = useState<ManarDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<DocumentStatus | "all">("all");

  useEffect(() => {
    documentsRepo.list().then((d) => { setDocs(d); setLoading(false); });
  }, []);

  const filtered = filter === "all" ? docs : docs.filter((d) => d.status === filter);

  const labelsAr: Record<string, string> = {
    all: "الكل", draft: "مسودة", queued: "في الطابور",
    "generating-docx": "يولّد DOCX", "generating-pdf": "يولّد PDF",
    protecting: "يُحمى", ready: "جاهز", published: "منشور", failed: "فشل",
  };
  const labelsEn: Record<string, string> = {
    all: "All", draft: "Draft", queued: "Queued",
    "generating-docx": "Generating DOCX", "generating-pdf": "Generating PDF",
    protecting: "Protecting", ready: "Ready", published: "Published", failed: "Failed",
  };
  const statusLabels = lang === "ar" ? labelsAr : labelsEn;

  const title = lang === "ar" ? "استوديو المستندات" : "Document Studio";
  const subtitle = lang === "ar" ? "إنتاج المستندات من الملخصات المعتمدة" : "Producing documents from approved summaries";
  const pipelineLabel = lang === "ar" ? "مسار الإنتاج" : "Production pipeline";
  const emptyMsg = lang === "ar" ? "لا توجد مستندات مطابقة." : "No matching documents.";

  return (
    <div className="doc-studio">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {docs.length}</span>
        </div>
      </header>

      <section className="pipeline-strip">
        <p className="strip-label">{pipelineLabel}</p>
        <div className="strip-items">
          {pipeline.map((s) => (
            <span key={s} className={"strip-step step-" + s + (filter === s ? " active" : "")} onClick={() => setFilter(filter === s ? "all" : s)}>{statusLabels[s]}</span>
          ))}
        </div>
      </section>

      {filter !== "all" && (
        <button className="clear-filter" type="button" onClick={() => setFilter("all")}>{lang === "ar" ? "إظهار الكل" : "Show all"}</button>
      )}

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="doc-list">
        {filtered.map((d) => (
          <Link key={d.id} to={"/documents/" + d.id} className="doc-card">
            <div className="doc-card-head">
              <span className="doc-code">{d.courseCode}</span>
              <span className={"doc-status status-" + d.status}>{statusLabels[d.status]}</span>
            </div>
            <h3 className="doc-title">{lang === "ar" ? d.titleAr : d.titleEn}</h3>
            <div className="doc-card-foot">
              <span className="doc-meta">v{d.version}</span>
              {d.pagesCount > 0 && <span className="doc-meta">{d.pagesCount} {lang === "ar" ? "صفحة" : "pages"}</span>}
              {d.sizeKb > 0 && <span className="doc-meta">{Math.round(d.sizeKb / 1024 * 10) / 10} MB</span>}
              {d.hasWatermark && <span className="doc-badge">WM</span>}
              {d.isProtected && <span className="doc-badge">🔒</span>}
              <span className="doc-meta doc-date">{d.updatedAt}</span>
            </div>
            {d.publishedChannels.length > 0 && (
              <div className="doc-channels">
                {d.publishedChannels.map((ch) => (
                  <span key={ch} className="channel-chip">{ch}</span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
