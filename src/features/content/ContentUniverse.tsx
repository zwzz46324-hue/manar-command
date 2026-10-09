import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { contentRepo } from "../../adapters/mock/repository";
import type { ContentItem, ContentKind } from "../../domain/types";
import "./ContentUniverse.css";

const kinds: ContentKind[] = [
  "audio", "video", "transcript", "summary", "slides", "flashcards",
  "quiz", "ocr", "lecture-file", "reference", "exam-model",
  "course-link", "video-link", "other",
];

export function ContentUniverse() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kindFilter, setKindFilter] = useState<ContentKind | "all">("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  useEffect(() => {
    contentRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const courses = useMemo(() => {
    const set = new Set(items.map((i) => i.courseCode));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((i) => {
      if (kindFilter !== "all" && i.kind !== kindFilter) return false;
      if (courseFilter !== "all" && i.courseCode !== courseFilter) return false;
      if (!term) return true;
      return (
        i.titleAr.toLowerCase().includes(term) ||
        i.titleEn.toLowerCase().includes(term) ||
        i.courseCode.toLowerCase().includes(term) ||
        i.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });
  }, [items, q, kindFilter, courseFilter]);

  const kindLabelsAr: Record<string, string> = { all: "الكل", audio: "صوت", video: "فيديو", transcript: "نص أصلي", summary: "ملخص", slides: "شرائح", flashcards: "بطاقات", quiz: "اختبار", ocr: "OCR", "lecture-file": "ملف محاضرة", reference: "مرجع", "exam-model": "نموذج اختبار", "course-link": "رابط مقرر", "video-link": "رابط فيديو", other: "أخرى" };
  const kindLabelsEn: Record<string, string> = { all: "All", audio: "Audio", video: "Video", transcript: "Transcript", summary: "Summary", slides: "Slides", flashcards: "Flashcards", quiz: "Quiz", ocr: "OCR", "lecture-file": "Lecture file", reference: "Reference", "exam-model": "Exam model", "course-link": "Course link", "video-link": "Video link", other: "Other" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const statusLabelsAr: Record<string, string> = { draft: "مسودة", processing: "قيد المعالجة", review: "قيد المراجعة", approved: "معتمد", published: "منشور", failed: "فشل" };
  const statusLabelsEn: Record<string, string> = { draft: "Draft", processing: "Processing", review: "Review", approved: "Approved", published: "Published", failed: "Failed" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const title = lang === "ar" ? "الكون المحتوى" : "Content Universe";
  const subtitle = lang === "ar" ? "كل أنواع المحتوى في المنظومة" : "All content types across the ecosystem";
  const searchPlaceholder = lang === "ar" ? "ابحث بالعنوان أو الرمز أو الوسم..." : "Search by title, code, or tag...";
  const allCoursesLabel = lang === "ar" ? "كل المقررات" : "All courses";
  const emptyMsg = lang === "ar" ? "لا يوجد محتوى مطابق." : "No matching content.";

  const formatSize = (kb: number) => {
    if (kb === 0) return "—";
    return kb >= 1024 ? (Math.round(kb / 1024 * 10) / 10) + " MB" : kb + " KB";
  };

  return (
    <div className="cu-page">
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

      <div className="cu-toolbar">
        <input className="cu-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} />
        <select className="cu-select" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="all">{allCoursesLabel}</option>
          {courses.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="cu-filters">
        <button className={"cu-filter" + (kindFilter === "all" ? " active" : "")} type="button" onClick={() => setKindFilter("all")}>{kindLabels.all}</button>
        {kinds.map((k) => (
          <button key={k} className={"cu-filter" + (kindFilter === k ? " active" : "")} type="button" onClick={() => setKindFilter(k)}>{kindLabels[k]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="cu-grid">
        {filtered.map((i) => (
          <Link key={i.id} to={"/content/" + i.id} className={"cu-card status-" + i.status}>
            <div className="cu-head">
              <span className={"cu-kind kind-" + i.kind}>{kindLabels[i.kind]}</span>
              <span className={"cu-status st-" + i.status}>{statusLabels[i.status]}</span>
            </div>
            <h3 className="cu-title">{lang === "ar" ? i.titleAr : i.titleEn}</h3>
            <p className="cu-course">{i.courseCode} · {lang === "ar" ? i.courseTitleAr : i.courseTitleEn}</p>
            <div className="cu-foot">
              <span className="cu-size">{formatSize(i.sizeKb)}</span>
              {i.durationMin > 0 && <span className="cu-duration">{i.durationMin} {lang === "ar" ? "د" : "min"}</span>}
              <span className={"cu-lang lang-" + i.language}>{i.language.toUpperCase()}</span>
              <span className="cu-date">{i.updatedAt}</span>
            </div>
            <div className="cu-tags">
              {i.tags.map((tag) => <span key={tag} className="cu-tag">#{tag}</span>)}
            </div>
          </Link>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
