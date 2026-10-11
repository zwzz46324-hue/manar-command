import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { flagDetailRepo } from "../../adapters/mock/repository";
import type { FlagDetail, FlagEnv } from "../../domain/types";
import "./FeatureFlags.css";

const envs: FlagEnv[] = ["production", "staging", "development"];

export function FeatureFlags() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<FlagDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [envFilter, setEnvFilter] = useState<FlagEnv | "all">("all");
  const [stateFilter, setStateFilter] = useState<"all" | "on" | "off">("all");

  useEffect(() => {
    flagDetailRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((f) => envFilter === "all" || f.environment === envFilter)
      .filter((f) => stateFilter === "all" || (stateFilter === "on" ? f.enabled : !f.enabled));
  }, [items, envFilter, stateFilter]);

  const envLabelsAr: Record<string, string> = { all: "الكل", production: "إنتاج", staging: "تجريبي", development: "تطوير" };
  const envLabelsEn: Record<string, string> = { all: "All", production: "Production", staging: "Staging", development: "Development" };
  const envLabels = lang === "ar" ? envLabelsAr : envLabelsEn;

  const stateLabelsAr: Record<string, string> = { all: "الكل", on: "مفعّل", off: "معطّل" };
  const stateLabelsEn: Record<string, string> = { all: "All", on: "On", off: "Off" };
  const stateLabels = lang === "ar" ? stateLabelsAr : stateLabelsEn;

  const title = lang === "ar" ? "أعلام الميزات" : "Feature Flags";
  const subtitle = lang === "ar" ? "إدارة تفصيلية لكل ميزة" : "Detailed control for every feature";
  const emptyMsg = lang === "ar" ? "لا توجد أعلام مطابقة." : "No matching flags.";
  const addLabel = lang === "ar" ? "+ علم جديد" : "+ New flag";

  return (
    <div className="ff-page">
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

      <div className="ff-stats">
        <div className="ff-stat"><span className="ffs-v">{items.length}</span><span className="ffs-k">{lang === "ar" ? "إجمالي" : "Total"}</span></div>
        <div className="ff-stat"><span className="ffs-v success">{items.filter((f) => f.enabled).length}</span><span className="ffs-k">{lang === "ar" ? "مفعّل" : "On"}</span></div>
        <div className="ff-stat"><span className="ffs-v">{items.filter((f) => !f.enabled).length}</span><span className="ffs-k">{lang === "ar" ? "معطّل" : "Off"}</span></div>
        <div className="ff-stat"><span className="ffs-v warn">{items.filter((f) => f.dependencies.length > 0).length}</span><span className="ffs-k">{lang === "ar" ? "له تبعيات" : "With dependencies"}</span></div>
      </div>

      <div className="ff-toolbar">
        <button className="ff-add" type="button">{addLabel}</button>
      </div>

      <div className="ff-filters">
        <button className={"ff-filter" + (envFilter === "all" ? " active" : "")} type="button" onClick={() => setEnvFilter("all")}>{envLabels.all}</button>
        {envs.map((e) => (
          <button key={e} className={"ff-filter env-" + e + (envFilter === e ? " active" : "")} type="button" onClick={() => setEnvFilter(e)}>{envLabels[e]}</button>
        ))}
        <span className="ff-divider" />
        {(["all", "on", "off"] as const).map((s) => (
          <button key={s} className={"ff-filter" + (stateFilter === s ? " active" : "")} type="button" onClick={() => setStateFilter(s)}>{stateLabels[s]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="ff-table-wrap">
        <table className="ff-table">
          <thead>
            <tr>
              <th>{lang === "ar" ? "الحالة" : "State"}</th>
              <th>Key</th>
              <th>{lang === "ar" ? "الاسم" : "Name"}</th>
              <th>{lang === "ar" ? "البيئة" : "Env"}</th>
              <th>Rollout</th>
              <th>{lang === "ar" ? "التبعيات" : "Deps"}</th>
              <th>{lang === "ar" ? "آخر تحديث" : "Updated"}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className={f.enabled ? "row-on" : "row-off"}>
                <td>
                  <span className={"ff-toggle " + (f.enabled ? "on" : "off")}>
                    <span className="ff-toggle-dot" />
                  </span>
                </td>
                <td className="mono">{f.key}</td>
                <td>
                  <div className="ff-name">{lang === "ar" ? f.nameAr : f.nameEn}</div>
                  <div className="ff-desc">{lang === "ar" ? f.descriptionAr : f.descriptionEn}</div>
                </td>
                <td><span className={"ff-env env-" + f.environment}>{envLabels[f.environment]}</span></td>
                <td className="mono">{f.rolloutPct}%</td>
                <td>
                  {f.dependencies.length === 0 ? (
                    <span className="muted">—</span>
                  ) : (
                    f.dependencies.map((d) => <span key={d} className="ff-dep">{d}</span>)
                  )}
                </td>
                <td className="mono">{f.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
