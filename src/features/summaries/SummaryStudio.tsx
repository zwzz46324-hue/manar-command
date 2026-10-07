import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { mockRepository, summaryStudioRepo } from "../../adapters/mock/repository";
import type { Summary, SummarySection, SummaryVersion } from "../../domain/types";
import "./SummaryStudio.css";

export function SummaryStudio() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [item, setItem] = useState<Summary | undefined>();
  const [versions, setVersions] = useState<SummaryVersion[]>([]);
  const [sections, setSections] = useState<SummarySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVersion, setActiveVersion] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!id) return;
    Promise.all([
      mockRepository.getSummary(id),
      summaryStudioRepo.listVersions(id),
      summaryStudioRepo.listSections(),
    ]).then(([s, v, sec]) => {
      setItem(s);
      setVersions(v);
      setSections(sec);
      if (v.length > 0) {
        setActiveVersion(v[v.length - 1].id);
        setDraft(v[v.length - 1].contentAr);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="ss-page"><p className="muted-line">...</p></div>;
  if (!item) return (
    <div className="ss-page">
      <p className="muted-line">{lang === "ar" ? "الملخص غير موجود." : "Summary not found."}</p>
      <Link to="/review" className="back-link">{lang === "ar" ? "رجوع إلى الطابور" : "Back to queue"}</Link>
    </div>
  );

  const title = lang === "ar" ? item.titleAr : item.titleEn;
  const course = lang === "ar" ? item.courseTitleAr : item.courseTitleEn;

  const pickVersion = (v: SummaryVersion) => {
    setActiveVersion(v.id);
    setDraft(v.contentAr);
  };

  return (
    <div className="ss-page">
      <nav className="breadcrumb">
        <Link to="/review" className="crumb">{lang === "ar" ? "طابور المراجعة" : "Review Queue"}</Link>
        <span className="crumb-sep">/</span>
        <Link to={"/review/" + item.id} className="crumb">{item.courseCode}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{lang === "ar" ? "استوديو الملخص" : "Summary Studio"}</span>
      </nav>

      <header className="ss-header">
        <div>
          <p className="ss-eyebrow">{item.courseCode}</p>
          <h1 className="ss-title">{title}</h1>
          <p className="ss-sub">{course}</p>
        </div>
        <span className={"ss-status status-" + item.status}>{item.status}</span>
      </header>

      <div className="ss-grid">
        <section className="ss-pane transcript-pane">
          <h3 className="pane-title">{lang === "ar" ? "النص الأصلي" : "Transcript"}</h3>
          <div className="pane-body">
            {item.transcriptAr.split("\n").map((line, i) => (<p key={i}>{line}</p>))}
          </div>
        </section>

        <section className="ss-pane editor-pane">
          <h3 className="pane-title">{lang === "ar" ? "محرّر الملخص" : "Summary Editor"}</h3>
          <div className="editor-meta">
            <span className="editor-version">{lang === "ar" ? "الإصدار" : "Version"} v{item.version}</span>
            <span className="editor-actor">{versions.find((v) => v.id === activeVersion)?.editedBy}</span>
          </div>
          <textarea className="editor-area" value={draft} onChange={(e) => setDraft(e.target.value)} dir={lang === "ar" ? "rtl" : "ltr"} />
          <div className="editor-actions">
            <button className="ed-btn primary" type="button">{lang === "ar" ? "حفظ كنسخة جديدة" : "Save as new version"}</button>
            <button className="ed-btn" type="button">{lang === "ar" ? "إعادة توليد AI" : "Regenerate with AI"}</button>
          </div>
        </section>

        <aside className="ss-rail">
          <section className="rail-block">
            <h4 className="rail-title">{lang === "ar" ? "النسخ" : "Versions"}</h4>
            <ul className="version-list">
              {versions.map((v) => (
                <li key={v.id} className={"version-item" + (v.id === activeVersion ? " active" : "")} onClick={() => pickVersion(v)}>
                  <span className="v-num">v{v.version}</span>
                  <span className="v-who">{v.editedBy}</span>
                  <span className="v-date">{v.createdAt.slice(0, 10)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rail-block">
            <h4 className="rail-title">{lang === "ar" ? "الأقسام" : "Sections"}</h4>
            <ul className="section-list">
              {sections.map((s) => (
                <li key={s.id} className="section-item">
                  <span className="s-title">{lang === "ar" ? s.titleAr : s.titleEn}</span>
                  <span className="s-body">{lang === "ar" ? s.bodyAr : s.bodyEn}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rail-block">
            <h4 className="rail-title">{lang === "ar" ? "البيانات" : "Metadata"}</h4>
            <dl className="meta-list">
              <div><dt>{lang === "ar" ? "المصدر" : "Source"}</dt><dd>{item.sourceType}</dd></div>
              <div><dt>{lang === "ar" ? "المدة" : "Duration"}</dt><dd>{item.sourceDurationMin} {lang === "ar" ? "د" : "min"}</dd></div>
              <div><dt>{lang === "ar" ? "المؤلف" : "Author"}</dt><dd>{item.authorId}</dd></div>
              <div><dt>{lang === "ar" ? "المراجع" : "Reviewer"}</dt><dd>{item.reviewerId || "—"}</dd></div>
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
