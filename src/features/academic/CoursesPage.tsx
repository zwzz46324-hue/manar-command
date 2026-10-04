
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../i18n";
import { mockRepository } from "../../adapters/mock/repository";
import type { Course } from "../../domain/types";
import { useSelection } from "../../state/selection";
import "./CoursesPage.css";

export function CoursesPage() {
  const { lang, t } = useLang();
  const { select } = useSelection();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [q, setQ] = useState("");
  const [uniFilter, setUniFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockRepository.listCourses().then((c) => { setCourses(c); setLoading(false); });
  }, []);

  const universities = useMemo(() => {
    const set = new Set(courses.map((c) => c.path.university));
    return Array.from(set).sort();
  }, [courses]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (uniFilter !== "all" && c.path.university !== uniFilter) return false;
      if (!term) return true;
      return (
        c.titleAr.toLowerCase().includes(term) ||
        c.titleEn.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term)
      );
    });
  }, [courses, q, uniFilter]);

  const title = lang === "ar" ? "المقررات" : "Courses";
  const subtitle = lang === "ar" ? "كل المقررات في المنظومة" : "All courses across the ecosystem";
  const searchPlaceholder = lang === "ar" ? "ابحث باسم المقرر أو الرمز..." : "Search by title or code...";
  const allLabel = lang === "ar" ? "كل الجامعات" : "All universities";
  const emptyMsg = lang === "ar" ? "لا توجد مقررات مطابقة." : "No matching courses.";
  const colTitle = lang === "ar" ? "المقرر" : "Course";
  const colCode = lang === "ar" ? "الرمز" : "Code";
  const colUni = lang === "ar" ? "الجامعة" : "University";
  const colCollege = lang === "ar" ? "الكلية" : "College";
  const colLevel = lang === "ar" ? "المستوى" : "Level";
  const colContent = lang === "ar" ? "محتوى" : "Content";
  const colPending = lang === "ar" ? "معلق" : "Pending";

  const handleRow = (c: Course) => {
    select({ id: c.id, kind: "academic", labelAr: c.titleAr, labelEn: c.titleEn });
    navigate("/courses/" + c.id);
  };

  return (
    <div className="courses-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {courses.length}</span>
        </div>
      </header>

      <div className="courses-toolbar">
        <input
          className="courses-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={searchPlaceholder}
        />
        <select className="courses-select" value={uniFilter} onChange={(e) => setUniFilter(e.target.value)}>
          <option value="all">{allLabel}</option>
          {universities.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>

      <div className="courses-table-wrap">
        <table className="courses-table">
          <thead>
            <tr>
              <th>{colCode}</th>
              <th>{colTitle}</th>
              <th>{colUni}</th>
              <th>{colCollege}</th>
              <th>{colLevel}</th>
              <th>{colContent}</th>
              <th>{colPending}</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} className="courses-empty">...</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={7} className="courses-empty">{emptyMsg}</td></tr>}
            {!loading && filtered.map((c) => (
              <tr key={c.id} onClick={() => handleRow(c)} className="courses-row">
                <td className="mono">{c.code}</td>
                <td>{lang === "ar" ? c.titleAr : c.titleEn}</td>
                <td>{c.path.university}</td>
                <td>{c.path.college}</td>
                <td>{c.path.level}</td>
                <td>{c.contentCount}</td>
                <td>{c.pendingReview > 0 ? <span className="pill warn">{c.pendingReview}</span> : <span className="muted">—</span>}</td>
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
