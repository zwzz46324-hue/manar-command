import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { templateRepo } from "../../adapters/mock/repository";
import type { DocumentTemplate, TemplateKind } from "../../domain/types";
import "./TemplateCenter.css";

const kinds: TemplateKind[] = ["cover", "content", "footer", "watermark", "publish"];

export function TemplateCenter() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<DocumentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [kindFilter, setKindFilter] = useState<TemplateKind | "all">("all");

  useEffect(() => {
    templateRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const unique = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((i) => { if (seen.has(i.id)) return false; seen.add(i.id); return true; });
  }, [items]);

  const filtered = useMemo(() => {
    return kindFilter === "all" ? unique : unique.filter((i) => i.kind === kindFilter);
  }, [unique, kindFilter]);

  const kindLabelsAr: Record<string, string> = { all: "الكل", cover: "غلاف", content: "محتوى", footer: "تذييل", watermark: "علامة مائية", publish: "نشر" };
  const kindLabelsEn: Record<string, string> = { all: "All", cover: "Cover", content: "Content", footer: "Footer", watermark: "Watermark", publish: "Publish" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const statusLabelsAr: Record<string, string> = { draft: "مسودة", active: "نشط", archived: "مؤرشف" };
  const statusLabelsEn: Record<string, string> = { draft: "Draft", active: "Active", archived: "Archived" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const title = lang === "ar" ? "قوالب المستندات" : "Document Templates";
  const subtitle = lang === "ar" ? "القوالب الموحّدة لإنتاج مستندات منار" : "Unified templates for MANAR document production";
  const emptyMsg = lang === "ar" ? "لا توجد قوالب مطابقة." : "No matching templates.";
  const usedByLabel = lang === "ar" ? "استُخدم في" : "Used by";
  const versionLabel = lang === "ar" ? "إصدار" : "Version";

  return (
    <div className="tc-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {unique.length}</span>
        </div>
      </header>

      <div className="tc-filters">
        <button className={"tc-filter" + (kindFilter === "all" ? " active" : "")} type="button" onClick={() => setKindFilter("all")}>{kindLabels.all}</button>
        {kinds.map((k) => (
          <button key={k} className={"tc-filter" + (kindFilter === k ? " active" : "")} type="button" onClick={() => setKindFilter(k)}>{kindLabels[k]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="tc-grid">
        {filtered.map((tpl) => (
          <article key={tpl.id} className={"tc-card kind-" + tpl.kind + " status-" + tpl.status}>
            <div className="tc-head">
              <span className={"tc-kind kind-" + tpl.kind}>{kindLabels[tpl.kind]}</span>
              <span className={"tc-status st-" + tpl.status}>{statusLabels[tpl.status]}</span>
            </div>
            <h3 className="tc-title">{lang === "ar" ? tpl.nameAr : tpl.nameEn}</h3>
            <p className="tc-desc">{lang === "ar" ? tpl.descriptionAr : tpl.descriptionEn}</p>

            <div className="tc-components">
              <p className="tc-comp-label">{lang === "ar" ? "المكوّنات:" : "Components:"}</p>
              <div className="tc-comp-list">
                {(lang === "ar" ? tpl.componentsAr : tpl.componentsEn).map((c) => (
                  <span key={c} className="tc-comp">{c}</span>
                ))}
              </div>
            </div>

            <div className="tc-foot">
              <span className="tc-ver">{versionLabel} v{tpl.version}</span>
              <span className="tc-used">{usedByLabel} {tpl.usedBy.toLocaleString()}</span>
              <span className="tc-date">{tpl.updatedAt}</span>
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
