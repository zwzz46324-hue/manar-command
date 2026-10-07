import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { mockRepository, transcriptRepo } from "../../adapters/mock/repository";
import type { Summary, TranscriptSegment } from "../../domain/types";
import "./TranscriptReview.css";

export function TranscriptReview() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [item, setItem] = useState<Summary | undefined>();
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!id) return;
    Promise.all([
      mockRepository.getSummary(id),
      transcriptRepo.list(id),
    ]).then(([s, seg]) => {
      setItem(s);
      setSegments(seg);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="tr-page"><p className="muted-line">...</p></div>;
  if (!item) return (
    <div className="tr-page">
      <p className="muted-line">{lang === "ar" ? "الملخص غير موجود." : "Summary not found."}</p>
      <Link to="/review" className="back-link">{lang === "ar" ? "رجوع إلى الطابور" : "Back to queue"}</Link>
    </div>
  );

  const title = lang === "ar" ? item.titleAr : item.titleEn;
  const course = lang === "ar" ? item.courseTitleAr : item.courseTitleEn;

  const startEdit = (seg: TranscriptSegment) => {
    setEditingId(seg.id);
    setDraftText(lang === "ar" ? seg.textAr : seg.textEn);
  };

  const saveEdit = (segId: string) => {
    setSegments((prev) => prev.map((s) => {
      if (s.id !== segId) return s;
      return lang === "ar"
        ? { ...s, textAr: draftText, editedBy: "user-1", editedAt: new Date().toISOString().slice(0, 10) }
        : { ...s, textEn: draftText, editedBy: "user-1", editedAt: new Date().toISOString().slice(0, 10) };
    }));
    setEditingId(null);
    setDraftText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftText("");
  };

  const accept = (segId: string) => {
    setAcceptedIds((prev) => {
      const next = new Set(prev);
      if (next.has(segId)) next.delete(segId);
      else next.add(segId);
      return next;
    });
  };

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return m + ":" + s;
  };

  return (
    <div className="tr-page">
      <nav className="breadcrumb">
        <Link to="/review" className="crumb">{lang === "ar" ? "طابور المراجعة" : "Review Queue"}</Link>
        <span className="crumb-sep">/</span>
        <Link to={"/review/" + item.id} className="crumb">{item.courseCode}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{lang === "ar" ? "مراجعة النص" : "Transcript Review"}</span>
      </nav>

      <header className="tr-header">
        <div>
          <p className="tr-eyebrow">{item.courseCode}</p>
          <h1 className="tr-title">{title}</h1>
          <p className="tr-sub">{course}</p>
        </div>
        <div className="tr-meta">
          <span className="tr-chip">{item.sourceType}</span>
          <span className="tr-chip">{item.sourceDurationMin} {lang === "ar" ? "د" : "min"}</span>
          <span className="tr-chip">{segments.length} {lang === "ar" ? "مقطع" : "segments"}</span>
        </div>
      </header>

      <div className="tr-grid">
        <section className="tr-pane source-pane">
          <h3 className="pane-title">{lang === "ar" ? "المصدر الأصلي" : "Original Source"}</h3>
          <div className="source-player">
            <div className="source-icon">{item.sourceType.toUpperCase()}</div>
            <div className="source-name">{lang === "ar" ? "المصدر المرتبط بهذا الملخص" : "The source linked to this summary"}</div>
            <div className="source-controls">
              <button className="src-btn" type="button" aria-label="Play">▶</button>
              <div className="src-timeline">
                <div className="src-progress" />
              </div>
              <span className="src-time">00:00 / {Math.floor(item.sourceDurationMin)}:00</span>
            </div>
          </div>
        </section>

        <section className="tr-pane transcript-pane">
          <h3 className="pane-title">{lang === "ar" ? "النص الأصلي" : "Transcript"}</h3>
          <div className="segments-list">
            {segments.map((seg) => (
              <article key={seg.id} className={"segment" + (acceptedIds.has(seg.id) ? " accepted" : "") + (editingId === seg.id ? " editing" : "")}>
                <div className="seg-head">
                  <span className="seg-time">{fmt(seg.startSec)}–{fmt(seg.endSec)}</span>
                  <span className="seg-speaker">{seg.speaker}</span>
                  <span className="seg-conf">{seg.confidence}%</span>
                  {seg.editedBy && <span className="seg-edited">{lang === "ar" ? "مُعدّل" : "edited"}</span>}
                </div>

                {editingId === seg.id ? (
                  <div className="seg-edit">
                    <textarea className="seg-textarea" value={draftText} onChange={(e) => setDraftText(e.target.value)} dir={lang === "ar" ? "rtl" : "ltr"} />
                    <div className="seg-actions">
                      <button className="seg-btn primary" type="button" onClick={() => saveEdit(seg.id)}>{lang === "ar" ? "حفظ" : "Save"}</button>
                      <button className="seg-btn" type="button" onClick={cancelEdit}>{lang === "ar" ? "إلغاء" : "Cancel"}</button>
                    </div>
                  </div>
                ) : (
                  <p className="seg-text">{lang === "ar" ? seg.textAr : seg.textEn}</p>
                )}

                <div className="seg-tools">
                  <button className="seg-btn" type="button" onClick={() => startEdit(seg)}>{lang === "ar" ? "تعديل" : "Edit"}</button>
                  <button className={"seg-btn" + (acceptedIds.has(seg.id) ? " ok" : "")} type="button" onClick={() => accept(seg.id)}>
                    {acceptedIds.has(seg.id) ? (lang === "ar" ? "✓ مقبول" : "✓ Accepted") : (lang === "ar" ? "قبول" : "Accept")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="tr-rail">
          <section className="rail-block">
            <h4 className="rail-title">{lang === "ar" ? "ملخص الحالة" : "Status Summary"}</h4>
            <div className="stat-row"><span>{lang === "ar" ? "المقاطع" : "Segments"}</span><strong>{segments.length}</strong></div>
            <div className="stat-row"><span>{lang === "ar" ? "مقبولة" : "Accepted"}</span><strong>{acceptedIds.size}</strong></div>
            <div className="stat-row"><span>{lang === "ar" ? "المتبقية" : "Remaining"}</span><strong>{segments.length - acceptedIds.size}</strong></div>
          </section>

          <section className="rail-block">
            <h4 className="rail-title">{lang === "ar" ? "الإجراءات" : "Actions"}</h4>
            <button className="rail-btn primary" type="button" disabled={acceptedIds.size === 0}>
              {lang === "ar" ? "إرسال للمراجعة" : "Submit for review"}
            </button>
            <button className="rail-btn" type="button">
              {lang === "ar" ? "إعادة التشغيل من النص" : "Re-run from transcript"}
            </button>
          </section>

          <section className="rail-block">
            <h4 className="rail-title">{lang === "ar" ? "البيانات" : "Metadata"}</h4>
            <dl className="meta-list">
              <div><dt>{lang === "ar" ? "المؤلف" : "Author"}</dt><dd>{item.authorId}</dd></div>
              <div><dt>{lang === "ar" ? "النسخة" : "Version"}</dt><dd>v{item.version}</dd></div>
              <div><dt>{lang === "ar" ? "آخر تحديث" : "Updated"}</dt><dd>{item.updatedAt}</dd></div>
            </dl>
          </section>
        </aside>
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
