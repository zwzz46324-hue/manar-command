
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { documentsRepo } from "../../adapters/mock/repository";
import type { DocumentStatus, ManarDocument } from "../../domain/types";
import "./DocumentDetail.css";

const pipeline: DocumentStatus[] = [
  "queued",
  "generating-docx",
  "generating-pdf",
  "protecting",
  "ready",
  "published",
];

export function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [doc, setDoc] = useState<ManarDocument | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    documentsRepo.get(id).then((d) => { setDoc(d); setLoading(false); });
  }, [id]);

  if (loading) return <div className="doc-detail"><p className="muted-line">...</p></div>;
  if (!doc) return (
    <div className="doc-detail">
      <p className="muted-line">{lang === "ar" ? "المستند غير موجود." : "Document not found."}</p>
      <Link to="/documents" className="back-link">{lang === "ar" ? "رجوع إلى الاستوديو" : "Back to studio"}</Link>
    </div>
  );

  const labelsAr: Record<string, string> = { queued: "في الطابور", "generating-docx": "يولّد DOCX", "generating-pdf": "يولّد PDF", protecting: "يُحمى", ready: "جاهز", published: "منشور", failed: "فشل", draft: "مسودة" };
  const labelsEn: Record<string, string> = { queued: "Queued", "generating-docx": "Generating DOCX", "generating-pdf": "Generating PDF", protecting: "Protecting", ready: "Ready", published: "Published", failed: "Failed", draft: "Draft" };
  const statusLabels = lang === "ar" ? labelsAr : labelsEn;

  const currentIndex = pipeline.indexOf(doc.status);
  const pubLabel = lang === "ar" ? "قنوات النشر" : "Published channels";
  const noChannels = lang === "ar" ? "لم يُنشر بعد." : "Not yet published.";

  return (
    <div className="doc-detail">
      <nav className="breadcrumb">
        <Link to="/documents" className="crumb">{lang === "ar" ? "استوديو المستندات" : "Document Studio"}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{doc.courseCode}</span>
      </nav>

      <header className="doc-detail-header">
        <div>
          <p className="doc-code-small">{doc.courseCode}</p>
          <h1 className="doc-h1">{lang === "ar" ? doc.titleAr : doc.titleEn}</h1>
          <p className="doc-meta-line">v{doc.version} · {doc.updatedAt}</p>
        </div>
        <span className={"doc-status-big status-" + doc.status}>{statusLabels[doc.status]}</span>
      </header>

      <section className="doc-pipeline">
        {pipeline.map((s, i) => (
          <div key={s} className={"pipe-step" + (i < currentIndex ? " done" : i === currentIndex ? " current" : "")}>
            <span className="pipe-dot" />
            <span className="pipe-label">{statusLabels[s]}</span>
          </div>
        ))}
      </section>

      <section className="doc-grid">
        <div className="doc-cover">
          <div className="cover-frame">
            <div className="cover-brand">MANAR DATA</div>
            <div className="cover-title">{lang === "ar" ? doc.titleAr : doc.titleEn}</div>
            <div className="cover-code">{doc.courseCode}</div>
            {doc.hasWatermark && <div className="cover-wm">{lang === "ar" ? "منار البيانات" : "MANAR"}</div>}
          </div>
        </div>

        <div className="doc-info">
          <dl className="info-list">
            <div><dt>{lang === "ar" ? "الصفحات" : "Pages"}</dt><dd>{doc.pagesCount}</dd></div>
            <div><dt>{lang === "ar" ? "الحجم" : "Size"}</dt><dd>{doc.sizeKb > 0 ? (Math.round(doc.sizeKb / 1024 * 10) / 10) + " MB" : "—"}</dd></div>
            <div><dt>{lang === "ar" ? "علامة مائية" : "Watermark"}</dt><dd>{doc.hasWatermark ? (lang === "ar" ? "نعم" : "Yes") : (lang === "ar" ? "لا" : "No")}</dd></div>
            <div><dt>{lang === "ar" ? "محمي" : "Protected"}</dt><dd>{doc.isProtected ? (lang === "ar" ? "نعم" : "Yes") : (lang === "ar" ? "لا" : "No")}</dd></div>
            <div><dt>{lang === "ar" ? "أُنشئ" : "Created"}</dt><dd>{doc.createdAt}</dd></div>
            <div><dt>{lang === "ar" ? "آخر تحديث" : "Updated"}</dt><dd>{doc.updatedAt}</dd></div>
          </dl>

          <div className="doc-channels-block">
            <h4 className="block-title">{pubLabel}</h4>
            {doc.publishedChannels.length === 0 && <p className="muted-line">{noChannels}</p>}
            <div className="channels-row">
              {doc.publishedChannels.map((c) => (
                <span key={c} className="channel-pill">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="doc-actions">
        <button className="act-btn" type="button">{lang === "ar" ? "تنزيل DOCX" : "Download DOCX"}</button>
        <button className="act-btn primary" type="button">{lang === "ar" ? "تنزيل PDF" : "Download PDF"}</button>
        <button className="act-btn" type="button">{lang === "ar" ? "نشر" : "Publish"}</button>
        <div className="actions-spacer" />
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
