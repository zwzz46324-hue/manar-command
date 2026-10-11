import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../i18n";
import { useCommandData } from "../../hooks/useCommandData";
import { ManarConstellation, ManarCounter } from "../../design-system/components";
import { constellationNodes, constellationEdges } from "../../adapters/mock/constellation";
import { useSelection } from "../../state/selection";
import { homeRepo } from "../../adapters/mock/repository";
import type { KPI, QuickAction } from "../../domain/types";
import "./CommandPage.css";

export function CommandPage() {
  const { t, lang } = useLang();
  const { attention, activity, loading } = useCommandData();
  const { select, clear } = useSelection();
  const navigate = useNavigate();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [actions, setActions] = useState<QuickAction[]>([]);
  const dateLocale = lang === "ar" ? "ar-EG" : "en-US";

  useEffect(() => {
    Promise.all([homeRepo.kpis(), homeRepo.quickActions()]).then(([k, a]) => {
      setKpis(k);
      setActions(a);
    });
  }, []);

  const handleSelect = (id: string | null) => {
    if (!id) { clear(); return; }
    const node = constellationNodes.find((n) => n.id === id);
    if (!node) return;
    select({ id: node.id, kind: node.kind, labelAr: node.labelAr, labelEn: node.labelEn });
  };

  return (
    <div className="command-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{t.pageTitle}</h1>
          <p className="page-sub">{t.pageSub}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{new Date().toLocaleDateString(dateLocale)}</span>
        </div>
      </header>

      <section className="kpi-strip">
        {kpis.map((k) => (
          <article key={k.id} className={"kpi-card st-" + k.state}>
            <div className="kpi-top">
              <span className="kpi-label">{lang === "ar" ? k.labelAr : k.labelEn}</span>
              <span className={"kpi-trend tr-" + k.trend}>{k.trend === "up" ? "↑" : k.trend === "down" ? "↓" : "→"}</span>
            </div>
            <div className="kpi-value"><ManarCounter value={k.value} /></div>
            <div className="kpi-hint">{lang === "ar" ? k.hintAr : k.hintEn}</div>
          </article>
        ))}
      </section>

      <section className="attention-field" aria-label={t.attentionTitle}>
        <div className="section-head">
          <h2>{t.attentionTitle}</h2>
          <span className="section-count">{attention.length}</span>
        </div>
        {loading && <p className="muted-line">...</p>}
        {attention.map((a) => (
          <article key={a.id} className={"attention-item " + a.severity}>
            <div className={"attention-marker " + a.severity} />
            <div className="attention-body">
              <h3>{lang === "ar" ? a.titleAr : a.titleEn}</h3>
              <p>{lang === "ar" ? a.descAr : a.descEn}</p>
            </div>
            <span className="attention-state">{lang === "ar" ? a.stateAr : a.stateEn}</span>
          </article>
        ))}
      </section>

      <section className="quick-actions">
        <div className="section-head">
          <h2>{lang === "ar" ? "إجراءات سريعة" : "QUICK ACTIONS"}</h2>
          <span className="section-count">{actions.length}</span>
        </div>
        <div className="qa-grid">
          {actions.map((a) => (
            <button key={a.id} className="qa-btn" type="button" onClick={() => navigate(a.route)}>
              <span className="qa-icon">{a.icon}</span>
              <span className="qa-label">{lang === "ar" ? a.labelAr : a.labelEn}</span>
              {a.requiresAr && (
                <span className="qa-req">{lang === "ar" ? a.requiresAr : a.requiresEn}</span>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="constellation-section" aria-label="MANAR Constellation">
        <div className="section-head">
          <h2>{lang === "ar" ? "كوكبة منار" : "MANAR CONSTELLATION"}</h2>
          <span className="section-count">{constellationNodes.length}</span>
        </div>
        <ManarConstellation nodes={constellationNodes} edges={constellationEdges} lang={lang} onSelect={handleSelect} />
      </section>

      <section className="activity-river" aria-label={t.activityTitle}>
        <div className="section-head">
          <h2>{t.activityTitle}</h2>
          <span className="section-count">{activity.length}</span>
        </div>
        <ul className="river-list">
          {activity.map((ev) => (
            <li key={ev.id}>
              <span className="river-time">{ev.time}</span>
              <span className={"river-dot " + ev.result} />
              <span className="river-text">{lang === "ar" ? ev.actionAr + " — " + ev.objectAr : ev.actionEn + " — " + ev.objectEn}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
