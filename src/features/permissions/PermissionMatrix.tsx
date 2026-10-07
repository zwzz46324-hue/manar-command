import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { grantsRepo } from "../../adapters/mock/repository";
import type { PermissionGrant, PolicyEffect } from "../../domain/types";
import "./PermissionMatrix.css";

export function PermissionMatrix() {
  const { lang, t } = useLang();
  const [grants, setGrants] = useState<PermissionGrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [effectFilter, setEffectFilter] = useState<PolicyEffect | "all">("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  useEffect(() => {
    grantsRepo.list().then((g) => { setGrants(g); setLoading(false); });
  }, []);

  const subjects = useMemo(() => {
    const set = new Set(grants.map((g) => g.subjectId));
    return Array.from(set).sort();
  }, [grants]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return grants.filter((g) => {
      if (effectFilter !== "all" && g.effect !== effectFilter) return false;
      if (subjectFilter !== "all" && g.subjectId !== subjectFilter) return false;
      if (!term) return true;
      return (
        g.subjectId.toLowerCase().includes(term) ||
        g.actionId.toLowerCase().includes(term) ||
        g.resourceId.toLowerCase().includes(term) ||
        g.scopeAr.includes(term) ||
        g.scopeEn.toLowerCase().includes(term)
      );
    });
  }, [grants, q, effectFilter, subjectFilter]);

  const effectLabels = lang === "ar"
    ? { all: "الكل", allow: "سماح", deny: "منع" }
    : { all: "All", allow: "Allow", deny: "Deny" };

  const title = lang === "ar" ? "مصفوفة الصلاحيات" : "Permission Matrix";
  const subtitle = lang === "ar" ? "من يفعل ماذا وأين وبأي شروط" : "Who can do what, where, and under what conditions";
  const searchPlaceholder = lang === "ar" ? "ابحث بالفاعل أو المورد أو النطاق..." : "Search by subject, resource, or scope...";
  const allSubjectsLabel = lang === "ar" ? "كل الفاعلين" : "All subjects";
  const emptyMsg = lang === "ar" ? "لا توجد صلاحيات مطابقة." : "No matching grants.";

  return (
    <div className="pm-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {grants.length}</span>
        </div>
      </header>

      <div className="pm-toolbar">
        <input className="pm-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} />
        <select className="pm-select" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="all">{allSubjectsLabel}</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="pm-effects">
          {(["all", "allow", "deny"] as const).map((e) => (
            <button key={e} className={"pm-effect" + (effectFilter === e ? " active" : "")} type="button" onClick={() => setEffectFilter(e)}>{effectLabels[e]}</button>
          ))}
        </div>
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="pm-table-wrap">
        <table className="pm-table">
          <thead>
            <tr>
              <th>{lang === "ar" ? "الفاعل" : "Subject"}</th>
              <th>{lang === "ar" ? "النوع" : "Type"}</th>
              <th>{lang === "ar" ? "الإجراء" : "Action"}</th>
              <th>{lang === "ar" ? "المورد" : "Resource"}</th>
              <th>{lang === "ar" ? "النطاق" : "Scope"}</th>
              <th>{lang === "ar" ? "الأثر" : "Effect"}</th>
              <th>{lang === "ar" ? "الشروط" : "Conditions"}</th>
              <th>{lang === "ar" ? "آخر تحديث" : "Updated"}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id}>
                <td className="mono">{g.subjectId}</td>
                <td><span className={"type-chip tt-" + g.subjectType}>{g.subjectType === "role" ? (lang === "ar" ? "دور" : "role") : (lang === "ar" ? "مستخدم" : "user")}</span></td>
                <td className="mono action-cell">{g.actionId}</td>
                <td className="mono">{g.resourceId}</td>
                <td>{lang === "ar" ? g.scopeAr : g.scopeEn}</td>
                <td><span className={"effect-chip ec-" + g.effect}>{effectLabels[g.effect]}</span></td>
                <td className="cond-cell">{(lang === "ar" ? g.conditionsAr : g.conditionsEn) || (lang === "ar" ? g.noteAr : g.noteEn) || "—"}</td>
                <td className="mono">{g.updatedAt}</td>
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
