import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { attentionRepo } from "../../adapters/mock/repository";
import type { AttentionEntry, AttentionKind, AttentionSeverity } from "../../domain/types";
import "./AttentionCenter.css";

const kindOrder: AttentionKind[] = ["summary", "ai-job", "security", "backup", "service", "user"];
const severityOrder: AttentionSeverity[] = ["critical", "high", "medium", "low"];

export function AttentionCenter() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<AttentionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [kindFilter, setKindFilter] = useState<AttentionKind | "all">("all");
  const [severityFilter, setSeverityFilter] = useState<AttentionSeverity | "all">("all");

  useEffect(() => {
    attentionRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const kindLabelsAr: Record<string, string> = { all: "الكل", summary: "ملخص", "ai-job": "مهمة AI", security: "أمن", backup: "نسخة", service: "خدمة", user: "مستخدم" };
  const kindLabelsEn: Record<string, string> = { all: "All", summary: "Summary", "ai-job": "AI job", security: "Security", backup: "Backup", service: "Service", user: "User" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const severityLabelsAr: Record<string, string> = { all: "الكل", critical: "حرج", high: "عالٍ", medium: "متوسط", low: "منخفض" };
  const severityLabelsEn: Record<string, string> = { all: "All", critical: "Critical", high: "High", medium: "Medium", low: "Low" };
  const severityLabels = lang === "ar" ? severityLabelsAr : severityLabelsEn;

  const filtered = useMemo(() => {
    return items
      .filter((i) => kindFilter === "all" || i.kind === kindFilter)
      .filter((i) => severityFilter === "all" || i.severity === severityFilter)
      .sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity));
  }, [items, kindFilter, severityFilter]);

  const countBySeverity = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach((i) => { map[i.severity] = (map[i.severity] || 0) + 1; });
    return map;
  }, [items]);

  const title = lang === "ar" ? "مركز الانتباه" : "Attention Center";
  const subtitle = lang === "ar" ? "كل ما يحتاج قرارًا أو مراجعة، بترتيب الأولوية" : "Everything that needs a decision or review, ordered by priority";
  const emptyMsg = lang === "ar" ? "لا يوجد ما يحتاج الانتباه." : "Nothing requires attention.";

  return (
    <div className="att-page">
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

      <div className="att-stats">
        {severityOrder.map((s) => (
          <button
            key={s}
            className={"att-stat sev-" + s + (severityFilter === s ? " active" : "")}
            type="button"
            onClick={() => setSeverityFilter(severityFilter === s ? "all" : s)}
          >
            <span className="att-stat-val">{countBySeverity[s] || 0}</span>
            <span className="att-stat-lbl">{severityLabels[s]}</span>
          </button>
        ))}
      </div>

      <div className="att-filters">
        <button className={"att-filter" + (kindFilter === "all" ? " active" : "")} type="button" onClick={() => setKindFilter("all")}>{kindLabels.all}</button>
        {kindOrder.map((k) => (
          <button key={k} className={"att-filter" + (kindFilter === k ? " active" : "")} type="button" onClick={() => setKindFilter(k)}>{kindLabels[k]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="att-list">
        {filtered.map((it) => (
          <article key={it.id} className={"att-card sev-" + it.severity}>
            <div className={"att-marker sev-" + it.severity} />
            <div className="att-body">
              <div className="att-head">
                <span className={"att-kind kind-" + it.kind}>{kindLabels[it.kind]}</span>
                <span className={"att-severity sev-" + it.severity}>{severityLabels[it.severity]}</span>
                <span className="att-date">{it.at.slice(0, 10)}</span>
              </div>
              <h3 className="att-title">{lang === "ar" ? it.titleAr : it.titleEn}</h3>
              <p className="att-desc">{lang === "ar" ? it.descriptionAr : it.descriptionEn}</p>
              <div className="att-foot">
                <span className="att-target">{it.targetId}</span>
                <Link to={it.route} className="att-action">
                  {lang === "ar" ? it.actionAr : it.actionEn} →
                </Link>
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
