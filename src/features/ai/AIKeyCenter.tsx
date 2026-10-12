import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { aiKeysRepo } from "../../adapters/mock/repository";
import type { AIKey, AIKeyStatus, AIProviderName } from "../../domain/types";
import "./AIKeyCenter.css";

const providers: AIProviderName[] = ["Gemini", "OpenAI", "Anthropic", "Whisper", "Local"];
const statuses: AIKeyStatus[] = ["active", "rotating", "disabled", "invalid"];

export function AIKeyCenter() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<AIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [providerFilter, setProviderFilter] = useState<AIProviderName | "all">("all");
  const [statusFilter, setStatusFilter] = useState<AIKeyStatus | "all">("all");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    aiKeysRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((k) => providerFilter === "all" || k.provider === providerFilter)
      .filter((k) => statusFilter === "all" || k.status === statusFilter);
  }, [items, providerFilter, statusFilter]);

  const statusLabelsAr: Record<string, string> = { all: "الكل", active: "نشط", rotating: "قيد التدوير", disabled: "معطّل", invalid: "غير صالح" };
  const statusLabelsEn: Record<string, string> = { all: "All", active: "Active", rotating: "Rotating", disabled: "Disabled", invalid: "Invalid" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const title = lang === "ar" ? "مفاتيح AI" : "AI Keys";
  const subtitle = lang === "ar" ? "إدارة مفاتيح المزوّدين بأمان" : "Safely manage provider API keys";
  const emptyMsg = lang === "ar" ? "لا توجد مفاتيح مطابقة." : "No matching keys.";
  const addKeyLabel = lang === "ar" ? "+ إضافة مفتاح" : "+ Add key";
  const allProvidersLabel = lang === "ar" ? "كل المزوّدين" : "All providers";

  const totalCost = items.reduce((a, k) => a + k.costUsd, 0);
  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="ak-page">
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

      <div className="ak-stats">
        <div className="ak-stat"><span className="aks-v">{items.length}</span><span className="aks-k">{lang === "ar" ? "مفتاح" : "Keys"}</span></div>
        <div className="ak-stat"><span className="aks-v success">{items.filter((k) => k.status === "active").length}</span><span className="aks-k">{lang === "ar" ? "نشط" : "Active"}</span></div>
        <div className="ak-stat"><span className="aks-v warn">{items.filter((k) => k.status === "rotating").length}</span><span className="aks-k">{lang === "ar" ? "يحتاج انتباه" : "Needs attention"}</span></div>
        <div className="ak-stat"><span className="aks-v">${totalCost.toFixed(2)}</span><span className="aks-k">{lang === "ar" ? "التكلفة الإجمالية" : "Total cost"}</span></div>
      </div>

      <div className="ak-toolbar">
        <select className="ak-select" value={providerFilter} onChange={(e) => setProviderFilter(e.target.value as AIProviderName | "all")}>
          <option value="all">{allProvidersLabel}</option>
          {providers.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div className="ak-filters">
          <button className={"ak-filter" + (statusFilter === "all" ? " active" : "")} type="button" onClick={() => setStatusFilter("all")}>{statusLabels.all}</button>
          {statuses.map((s) => (
            <button key={s} className={"ak-filter" + (statusFilter === s ? " active" : "")} type="button" onClick={() => setStatusFilter(s)}>{statusLabels[s]}</button>
          ))}
        </div>
        <button className="ak-add" type="button">{addKeyLabel}</button>
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="ak-list">
        {filtered.map((k) => (
          <article key={k.id} className={"ak-card st-" + k.status}>
            <div className="ak-head">
              <span className={"ak-provider pv-" + k.provider.toLowerCase()}>{k.provider}</span>
              <span className={"ak-status st-" + k.status}>{statusLabels[k.status]}</span>
            </div>
            <div className="ak-alias">{k.alias}</div>
            <div className="ak-mask">
              <code className="ak-code">{revealed.has(k.id) ? "••••• •••• (مخفي لأمان)" : k.masked}</code>
              <button className="ak-reveal" type="button" onClick={() => toggleReveal(k.id)}>
                {revealed.has(k.id) ? (lang === "ar" ? "إخفاء" : "Hide") : (lang === "ar" ? "كشف" : "Reveal")}
              </button>
            </div>
            {(k.noteAr || k.noteEn) && <div className="ak-note">{lang === "ar" ? k.noteAr : k.noteEn}</div>}
            <div className="ak-meta">
              <div className="ak-meta-item"><span className="ak-meta-k">{lang === "ar" ? "آخر تحقق" : "Last verified"}</span><span className="ak-meta-v">{k.lastVerifiedAt.slice(0, 16).replace("T", " ")}</span></div>
              <div className="ak-meta-item"><span className="ak-meta-k">{lang === "ar" ? "أُنشئ" : "Created"}</span><span className="ak-meta-v">{k.createdAt}</span></div>
              <div className="ak-meta-item"><span className="ak-meta-k">{lang === "ar" ? "المهام" : "Jobs"}</span><span className="ak-meta-v">{k.jobsUsed.toLocaleString()}</span></div>
              <div className="ak-meta-item"><span className="ak-meta-k">{lang === "ar" ? "التكلفة" : "Cost"}</span><span className="ak-meta-v">${k.costUsd.toFixed(2)}</span></div>
            </div>
            <div className="ak-actions">
              <button className="ak-btn" type="button">{lang === "ar" ? "تحقق" : "Verify"}</button>
              <button className="ak-btn" type="button">{lang === "ar" ? "تدوير" : "Rotate"}</button>
              <button className="ak-btn danger" type="button">{lang === "ar" ? "تعطيل" : "Disable"}</button>
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
