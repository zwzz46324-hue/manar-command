
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { mockRepository } from "../../adapters/mock/repository";
import type { Course } from "../../domain/types";
import "./CourseCommandView.css";

type Tab = "overview" | "content" | "summaries" | "activity";

export function CourseCommandView() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [course, setCourse] = useState<Course | undefined>();
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    mockRepository.getCourse(id).then((c) => { setCourse(c); setLoading(false); });
  }, [id]);

  if (loading) return <div className="course-cmd"><p className="muted-line">...</p></div>;
  if (!course) return (
    <div className="course-cmd">
      <p className="muted-line">{lang === "ar" ? "المقرر غير موجود." : "Course not found."}</p>
      <Link to="/courses" className="back-link">{lang === "ar" ? "رجوع إلى المقررات" : "Back to courses"}</Link>
    </div>
  );

  const title = lang === "ar" ? course.titleAr : course.titleEn;
  const backLabel = lang === "ar" ? "المقررات" : "Courses";
  const tabs: { id: Tab; labelAr: string; labelEn: string }[] = [
    { id: "overview", labelAr: "نظرة عامة", labelEn: "Overview" },
    { id: "content", labelAr: "المحتوى", labelEn: "Content" },
    { id: "summaries", labelAr: "الملخصات", labelEn: "Summaries" },
    { id: "activity", labelAr: "النشاط", labelEn: "Activity" },
  ];

  return (
    <div className="course-cmd">
      <nav className="breadcrumb">
        <Link to="/courses" className="crumb">{backLabel}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{course.code}</span>
      </nav>

      <header className="course-header">
        <div>
          <p className="course-code">{course.code}</p>
          <h1 className="course-title">{title}</h1>
          <p className="course-path">
            {course.path.university} · {course.path.college} · {course.path.department}
          </p>
        </div>
        <div className="course-meta">
          <span className="meta-chip">{course.path.level}</span>
          <span className="meta-chip">{course.path.semester}</span>
        </div>
      </header>

      <nav className="course-tabs">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            type="button"
            className={"course-tab" + (tab === tb.id ? " active" : "")}
            onClick={() => setTab(tb.id)}
          >
            {lang === "ar" ? tb.labelAr : tb.labelEn}
          </button>
        ))}
      </nav>

      {tab === "overview" && (
        <section className="course-section">
          <div className="stats">
            <div className="stat"><span className="stat-val">{course.contentCount}</span><span className="stat-lbl">{lang === "ar" ? "محتوى" : "Content"}</span></div>
            <div className="stat"><span className="stat-val">{course.summaryCount}</span><span className="stat-lbl">{lang === "ar" ? "ملخص" : "Summaries"}</span></div>
            <div className="stat"><span className="stat-val">{course.pendingReview}</span><span className="stat-lbl">{lang === "ar" ? "معلق" : "Pending"}</span></div>
            <div className="stat"><span className="stat-val">{course.createdAt}</span><span className="stat-lbl">{lang === "ar" ? "أضيف" : "Added"}</span></div>
          </div>
        </section>
      )}

      {tab === "content" && (
        <section className="course-section">
          <p className="muted-line">{lang === "ar" ? "المحتوى قيد الإنشاء — DEMO" : "Content under construction — DEMO"}</p>
        </section>
      )}

      {tab === "summaries" && (
        <section className="course-section">
          <p className="muted-line">{lang === "ar" ? "الملخصات قيد الإنشاء — DEMO" : "Summaries under construction — DEMO"}</p>
        </section>
      )}

      {tab === "activity" && (
        <section className="course-section">
          <p className="muted-line">{lang === "ar" ? "النشاط قيد الإنشاء — DEMO" : "Activity under construction — DEMO"}</p>
        </section>
      )}

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
