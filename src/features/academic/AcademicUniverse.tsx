
import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { mockRepository } from "../../adapters/mock/repository";
import type { College, Department, University } from "../../domain/types";
import "./AcademicUniverse.css";

type Uni = University & { sector?: "public" | "private"; city?: string };

export function AcademicUniverse() {
  const { lang, t } = useLang();
  const [unis, setUnis] = useState<Uni[]>([]);
  const [cols, setCols] = useState<College[]>([]);
  const [deps, setDeps] = useState<Department[]>([]);
  const [openUni, setOpenUni] = useState<string | null>(null);
  const [openCol, setOpenCol] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");

  useEffect(() => {
    Promise.all([
      mockRepository.listUniversities(),
      mockRepository.listColleges(),
      mockRepository.listDepartments(),
    ]).then(([u, c, d]) => { setUnis(u as Uni[]); setCols(c); setDeps(d); });
  }, []);

  const filtered = filter === "all" ? unis : unis.filter((u) => u.sector === filter);
  const title = lang === "ar" ? "الكون الأكاديمي" : "Academic Universe";
  const subtitle = lang === "ar" ? "الجامعات والكليات والأقسام" : "Universities, colleges, and departments";
  const labelAll = lang === "ar" ? "الكل" : "All";
  const labelPub = lang === "ar" ? "حكومية" : "Public";
  const labelPri = lang === "ar" ? "خاصة" : "Private";

  return (
    <div className="academic-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      <div className="uni-filters">
        <button className={"uni-filter" + (filter === "all" ? " active" : "")} type="button" onClick={() => setFilter("all")}>{labelAll} ({unis.length})</button>
        <button className={"uni-filter" + (filter === "public" ? " active" : "")} type="button" onClick={() => setFilter("public")}>{labelPub}</button>
        <button className={"uni-filter" + (filter === "private" ? " active" : "")} type="button" onClick={() => setFilter("private")}>{labelPri}</button>
      </div>

      <section className="tree">
        {filtered.map((u) => (
          <div key={u.id} className="tree-node">
            <button className="tree-row" type="button" onClick={() => setOpenUni(openUni === u.id ? null : u.id)}>
              <span className="tree-caret">{openUni === u.id ? "v" : ">"}</span>
              <span className="tree-code">{u.code}</span>
              <span className="tree-label">{lang === "ar" ? u.nameAr : u.nameEn}</span>
              {u.city && <span className="tree-city">{u.city}</span>}
              {u.sector && <span className={"tree-sector sector-" + u.sector}>{u.sector === "public" ? (lang === "ar" ? "حكومية" : "PUBLIC") : (lang === "ar" ? "خاصة" : "PRIVATE")}</span>}
            </button>
            {openUni === u.id && (
              <div className="tree-children">
                {cols.filter((c) => c.universityId === u.id).map((c) => (
                  <div key={c.id} className="tree-node">
                    <button className="tree-row" type="button" onClick={() => setOpenCol(openCol === c.id ? null : c.id)}>
                      <span className="tree-caret">{openCol === c.id ? "v" : ">"}</span>
                      <span className="tree-code">{c.code}</span>
                      <span className="tree-label">{lang === "ar" ? c.nameAr : c.nameEn}</span>
                    </button>
                    {openCol === c.id && (
                      <div className="tree-children">
                        {deps.filter((d) => d.collegeId === c.id).map((d) => (
                          <div key={d.id} className="tree-row leaf">
                            <span className="tree-code">{d.code}</span>
                            <span className="tree-label">{lang === "ar" ? d.nameAr : d.nameEn}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
