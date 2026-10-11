import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { overviewRepo, riverRepo } from "../../adapters/mock/repository";
import { ManarCounter } from "../../design-system/components";
import type { OverviewKPI, RiverEvent } from "../../domain/types";
import "./SystemOverview.css";

export function SystemOverview() {
  const { lang, t } = useLang();
  const [kpis, setKpis] = useState<OverviewKPI[]>([]);
  const [activity, setActivity] = useState<RiverEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([overviewRepo.kpis(), riverRepo.list()]).then(([k, a]) => {
      setKpis(k);
      setActivity(a.slice(0, 6));
      setLoading(false);
    });
  }, []);

  const title = lang === "ar" ? "نظرة عامة على النظام" : "System Overview";
  const subtitle = lang === "ar" ? "صورة شاملة لمنظومة منار في الوقت الحقيقي" : "Real-time snapshot of the MANAR ecosystem";
  const lastActivity = lang === "ar" ? "أحدث الأحداث" : "Latest activity";
  const quickNav = lang === "ar" ? "الوصول السريع" : "Quick navigation";

  const renderSparkline = (values: number[], state: string) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 30 - ((v - min) / range) * 28;
      return x + "," + y;
    }).join(" ");
    return (
      <svg viewBox="0 0 100 30" className={"sparkline sp-" + state} preserveAspectRatio="none">
        <polyline points={points} fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  if (loading) return <div className="so-page"><p className="muted-line">...</p></div>;

  return (
    <div className="so-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{new Date().toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span>
        </div>
      </header>

      <section className="so-kpi-grid">
        {kpis.map((k) => (
          <article key={k.id} className={"so-kpi sp-" + k.state}>
            <div className="so-kpi-head">
              <span className="so-kpi-label">{lang === "ar" ? k.labelAr : k.labelEn}</span>
              <span className={"so-kpi-state st-" + k.state} />
            </div>
            <div className="so-kpi-value"><ManarCounter value={k.value} />{k.suffix}</div>
            <div className="so-kpi-spark">{renderSparkline(k.sparkline, k.state)}</div>
          </article>
        ))}
      </section>

      <div className="so-grid">
        <section className="so-panel">
          <div className="so-panel-head">
            <h2>{lastActivity}</h2>
            <Link to="/activity" className="so-link">{lang === "ar" ? "الكل" : "All"} →</Link>
          </div>
          <ul className="so-activity">
            {activity.map((ev) => (
              <li key={ev.id} className="so-act-item">
                <span className="so-act-time">{ev.at.slice(11, 16)}</span>
                <span className={"so-act-dot k-" + ev.kind} />
                <span className="so-act-text">{lang === "ar" ? ev.titleAr : ev.titleEn}</span>
                <span className={"so-act-result r-" + ev.result}>{ev.result}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="so-panel">
          <div className="so-panel-head">
            <h2>{quickNav}</h2>
          </div>
          <div className="so-quick">
            <Link to="/academic" className="so-qbtn">🎓 {lang === "ar" ? "الكون الأكاديمي" : "Academic"}</Link>
            <Link to="/courses" className="so-qbtn">📚 {lang === "ar" ? "المقررات" : "Courses"}</Link>
            <Link to="/review" className="so-qbtn">📝 {lang === "ar" ? "المراجعة" : "Review"}</Link>
            <Link to="/documents" className="so-qbtn">📄 {lang === "ar" ? "المستندات" : "Documents"}</Link>
            <Link to="/people" className="so-qbtn">👥 {lang === "ar" ? "الأشخاص" : "People"}</Link>
            <Link to="/ai" className="so-qbtn">🤖 {lang === "ar" ? "الذكاء" : "AI"}</Link>
            <Link to="/bots" className="so-qbtn">💬 {lang === "ar" ? "البوتات" : "Bots"}</Link>
            <Link to="/security" className="so-qbtn">🔒 {lang === "ar" ? "الأمن" : "Security"}</Link>
            <Link to="/audit" className="so-qbtn">📜 {lang === "ar" ? "سجل الحقيقة" : "Truth Log"}</Link>
            <Link to="/system-map" className="so-qbtn">🗺️ {lang === "ar" ? "خريطة المنظومة" : "System Map"}</Link>
            <Link to="/search" className="so-qbtn">🔍 {lang === "ar" ? "البحث" : "Search"}</Link>
            <Link to="/code" className="so-qbtn">💻 {lang === "ar" ? "الكود" : "Code"}</Link>
          </div>
        </section>
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
