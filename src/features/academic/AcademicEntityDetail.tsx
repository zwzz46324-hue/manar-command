import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { mockRepository, universityMetaRepo } from "../../adapters/mock/repository";
import type { College, Course, Department, University, UniversitySector } from "../../domain/types";
import "./AcademicEntityDetail.css";

type Kind = "university" | "college" | "department";

type EntityData = {
  sector?: UniversitySector;
  city?: string;
  kind: Kind;
  code: string;
  nameAr: string;
  nameEn: string;
  pathAr: string[];
  pathEn: string[];
  stats: { colleges: number; departments: number; courses: number };
  colleges: College[];
  departments: Department[];
  courses: Course[];
};

export function AcademicEntityDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [entity, setEntity] = useState<EntityData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      mockRepository.listUniversities(),
      mockRepository.listColleges(),
      mockRepository.listDepartments(),
      mockRepository.listCourses(),
      universityMetaRepo.list(),
    ]).then(([unis, cols, deps, courses, metas]) => {
      let kind: Kind | null = null;
      let theUni: University | undefined;
      let theCol: College | undefined;
      let theDep: Department | undefined;

      if (/^u-\d+$/.test(id)) {
        kind = "university";
        theUni = unis.find((u) => u.id === id);
      } else if (id.startsWith("col-")) {
        kind = "college";
        theCol = cols.find((c) => c.id === id);
        if (theCol) theUni = unis.find((u) => u.id === theCol!.universityId);
      } else if (id.startsWith("dep-")) {
        kind = "department";
        theDep = deps.find((d) => d.id === id);
        if (theDep) {
          theCol = cols.find((c) => c.id === theDep!.collegeId);
          if (theCol) theUni = unis.find((u) => u.id === theCol!.universityId);
        }
      }

      if (!kind) { setLoading(false); return; }

      const colsOfUni = theUni ? cols.filter((c) => c.universityId === theUni!.id) : [];
      const uniMeta = theUni ? metas.find((m) => m.id === theUni!.id) : undefined;
      const depsOfCol = theCol ? deps.filter((d) => d.collegeId === theCol!.id) : [];
      const coursesOfDep = theDep ? courses.filter((c) => c.path.department === theDep!.nameEn) : [];
      const coursesOfCol = theCol ? courses.filter((c) => c.path.college === theCol!.nameEn) : [];
      const coursesOfUni = theUni ? courses.filter((c) => c.path.university === theUni!.nameEn) : [];

      let data: EntityData;

      if (kind === "university" && theUni) {
        data = {
          kind: "university",
          code: theUni.code,
          nameAr: theUni.nameAr,
          nameEn: theUni.nameEn,
          pathAr: [theUni.nameAr],
          pathEn: [theUni.nameEn],
          stats: { colleges: colsOfUni.length, departments: colsOfUni.reduce((a, c) => a + deps.filter((d) => d.collegeId === c.id).length, 0), courses: coursesOfUni.length },
          sector: uniMeta?.sector,
          city: uniMeta?.city,
          colleges: colsOfUni,
          departments: [],
          courses: coursesOfUni.slice(0, 12),
        };
      } else if (kind === "college" && theCol && theUni) {
        data = {
          kind: "college",
          code: theCol.code,
          nameAr: theCol.nameAr,
          nameEn: theCol.nameEn,
          pathAr: [theUni.nameAr, theCol.nameAr],
          pathEn: [theUni.nameEn, theCol.nameEn],
          stats: { colleges: 0, departments: depsOfCol.length, courses: coursesOfCol.length },
          colleges: [],
          departments: depsOfCol,
          courses: coursesOfCol.slice(0, 12),
        };
      } else if (kind === "department" && theDep && theCol && theUni) {
        data = {
          kind: "department",
          code: theDep.code,
          nameAr: theDep.nameAr,
          nameEn: theDep.nameEn,
          pathAr: [theUni.nameAr, theCol.nameAr, theDep.nameAr],
          pathEn: [theUni.nameEn, theCol.nameEn, theDep.nameEn],
          stats: { colleges: 0, departments: 0, courses: coursesOfDep.length },
          colleges: [],
          departments: [],
          courses: coursesOfDep.slice(0, 24),
        };
      } else {
        setLoading(false);
        return;
      }

      setEntity(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="aed-page"><p className="muted-line">...</p></div>;
  if (!entity) return (
    <div className="aed-page">
      <p className="muted-line">{lang === "ar" ? "الكيان غير موجود." : "Entity not found."}</p>
      <Link to="/academic" className="back-link">{lang === "ar" ? "رجوع للكون الأكاديمي" : "Back to Academic Universe"}</Link>
    </div>
  );

  const kindLabelsAr: Record<string, string> = { university: "جامعة", college: "كلية", department: "قسم" };
  const kindLabelsEn: Record<string, string> = { university: "University", college: "College", department: "Department" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const path = lang === "ar" ? entity.pathAr : entity.pathEn;
  const name = lang === "ar" ? entity.nameAr : entity.nameEn;

  return (
    <div className="aed-page">
      <nav className="breadcrumb">
        <Link to="/academic" className="crumb">{lang === "ar" ? "الكون الأكاديمي" : "Academic Universe"}</Link>
        {path.map((p, i) => (
          <span key={i}>
            <span className="crumb-sep">/</span>
            <span className="crumb">{p}</span>
          </span>
        ))}
      </nav>

      <header className="aed-header">
        <div>
          <p className="aed-kind">{kindLabels[entity.kind]}</p>
          <h1 className="aed-title">{name}</h1>
          <p className="aed-code">{entity.code}</p>
        </div>
        <div className="aed-tags">
          {entity.sector && <span className={"aed-chip sector-" + entity.sector}>{entity.sector === "public" ? (lang === "ar" ? "حكومية" : "PUBLIC") : (lang === "ar" ? "خاصة" : "PRIVATE")}</span>}
          {entity.city && <span className="aed-chip city">📍 {entity.city}</span>}
          <span className="aed-chip active">{lang === "ar" ? "نشط" : "Active"}</span>
        </div>
      </header>

      <section className="aed-stats">
        {entity.kind === "university" && (
          <div className="aed-stat"><span className="as-v">{entity.stats.colleges}</span><span className="as-k">{lang === "ar" ? "كليات" : "Colleges"}</span></div>
        )}
        {entity.kind !== "department" && (
          <div className="aed-stat"><span className="as-v">{entity.stats.departments}</span><span className="as-k">{lang === "ar" ? "أقسام" : "Departments"}</span></div>
        )}
        <div className="aed-stat"><span className="as-v">{entity.stats.courses}</span><span className="as-k">{lang === "ar" ? "مقررات" : "Courses"}</span></div>
      </section>

      {entity.kind === "university" && (
        <section className="aed-section">
          <div className="aed-section-head">
            <h2>{lang === "ar" ? "الكليات" : "Colleges"}</h2>
            <span className="aed-count">{entity.colleges.length}</span>
          </div>
          <div className="aed-grid">
            {entity.colleges.map((c) => (
              <Link key={c.id} to={"/academic/entity/" + c.id} className="aed-card">
                <span className="aed-card-code">{c.code}</span>
                <span className="aed-card-name">{lang === "ar" ? c.nameAr : c.nameEn}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {entity.kind === "college" && (
        <section className="aed-section">
          <div className="aed-section-head">
            <h2>{lang === "ar" ? "الأقسام" : "Departments"}</h2>
            <span className="aed-count">{entity.departments.length}</span>
          </div>
          <div className="aed-grid">
            {entity.departments.map((d) => (
              <Link key={d.id} to={"/academic/entity/" + d.id} className="aed-card">
                <span className="aed-card-code">{d.code}</span>
                <span className="aed-card-name">{lang === "ar" ? d.nameAr : d.nameEn}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="aed-section">
        <div className="aed-section-head">
          <h2>{lang === "ar" ? "المقررات" : "Courses"}</h2>
          <span className="aed-count">{entity.courses.length}</span>
        </div>
        {entity.courses.length === 0 && (
          <p className="muted-line">{lang === "ar" ? "لا توجد مقررات." : "No courses."}</p>
        )}
        <div className="aed-grid">
          {entity.courses.map((c) => (
            <Link key={c.id} to={"/courses/" + c.id} className="aed-card">
              <span className="aed-card-code">{c.code}</span>
              <span className="aed-card-name">{lang === "ar" ? c.titleAr : c.titleEn}</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="aed-actions">
        <button className="aed-btn" type="button">{lang === "ar" ? "تعديل" : "Edit"}</button>
        <button className="aed-btn" type="button">{lang === "ar" ? "أرشفة" : "Archive"}</button>
        <div className="aed-spacer" />
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
