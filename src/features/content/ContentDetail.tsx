import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { contentRepo, mockRepository, pipelineRepo } from "../../adapters/mock/repository";
import type { ContentItem, Course, PipelineEntry, PipelineStage } from "../../domain/types";
import "./ContentDetail.css";

const stages: PipelineStage[] = ["ingest", "extract", "normalize", "enrich", "review", "approve", "publish"];

export function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [item, setItem] = useState<ContentItem | undefined>();
  const [course, setCourse] = useState<Course | undefined>();
  const [pipeline, setPipeline] = useState<PipelineEntry | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      contentRepo.get(id),
      mockRepository.listCourses(),
      pipelineRepo.list(),
    ]).then(([it, courses, pipes]) => {
      setItem(it);
      if (it) {
        setCourse(courses.find((c) => c.id === it.courseId || c.code === it.courseCode));
      }
      setPipeline(pipes.find((p) => p.contentId === id));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="cd-page"><p className="muted-line">...</p></div>;
  if (!item) return (
    <div className="cd-page">
      <p className="muted-line">{lang === "ar" ? "المحتوى غير موجود." : "Content not found."}</p>
      <Link to="/content" className="back-link">{lang === "ar" ? "رجوع إلى الكون المحتوى" : "Back to Content Universe"}</Link>
    </div>
  );

  const kindLabelsAr: Record<string, string> = { audio: "صوت", video: "فيديو", transcript: "نص أصلي", summary: "ملخص", slides: "شرائح", flashcards: "بطاقات", quiz: "اختبار", ocr: "OCR", "lecture-file": "ملف محاضرة", reference: "مرجع", "exam-model": "نموذج اختبار", "course-link": "رابط مقرر", "video-link": "رابط فيديو", other: "أخرى" };
  const kindLabelsEn: Record<string, string> = { audio: "Audio", video: "Video", transcript: "Transcript", summary: "Summary", slides: "Slides", flashcards: "Flashcards", quiz: "Quiz", ocr: "OCR", "lecture-file": "Lecture file", reference: "Reference", "exam-model": "Exam model", "course-link": "Course link", "video-link": "Video link", other: "Other" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const statusLabelsAr: Record<string, string> = { draft: "مسودة", processing: "قيد المعالجة", review: "قيد المراجعة", approved: "معتمد", published: "منشور", failed: "فشل" };
  const statusLabelsEn: Record<string, string> = { draft: "Draft", processing: "Processing", review: "Review", approved: "Approved", published: "Published", failed: "Failed" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const stageLabelsAr: Record<string, string> = { ingest: "إدخال", extract: "استخراج", normalize: "توحيد", enrich: "إثراء", review: "مراجعة", approve: "اعتماد", publish: "نشر" };
  const stageLabelsEn: Record<string, string> = { ingest: "Ingest", extract: "Extract", normalize: "Normalize", enrich: "Enrich", review: "Review", approve: "Approve", publish: "Publish" };
  const stageLabels = lang === "ar" ? stageLabelsAr : stageLabelsEn;

  const title = lang === "ar" ? item.titleAr : item.titleEn;
  const formatSize = (kb: number) => kb === 0 ? "—" : (kb >= 1024 ? (Math.round(kb / 1024 * 10) / 10) + " MB" : kb + " KB");
  const stageIdx = pipeline ? stages.indexOf(pipeline.currentStage) : -1;

  return (
    <div className="cd-page">
      <nav className="breadcrumb">
        <Link to="/content" className="crumb">{lang === "ar" ? "الكون المحتوى" : "Content Universe"}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{item.courseCode}</span>
      </nav>

      <header className="cd-header">
        <div>
          <div className="cd-tags">
            <span className={"cd-kind kind-" + item.kind}>{kindLabels[item.kind]}</span>
            <span className={"cd-status st-" + item.status}>{statusLabels[item.status]}</span>
          </div>
          <h1 className="cd-title">{title}</h1>
          <Link to={"/courses/" + item.courseId} className="cd-course">
            {item.courseCode} · {lang === "ar" ? item.courseTitleAr : item.courseTitleEn}
          </Link>
        </div>
      </header>

      <section className="cd-section">
        <h2>{lang === "ar" ? "بيانات المحتوى" : "Content Metadata"}</h2>
        <dl className="cd-meta">
          <div><dt>{lang === "ar" ? "النوع" : "Kind"}</dt><dd>{kindLabels[item.kind]}</dd></div>
          <div><dt>{lang === "ar" ? "الحالة" : "Status"}</dt><dd>{statusLabels[item.status]}</dd></div>
          <div><dt>{lang === "ar" ? "الحجم" : "Size"}</dt><dd>{formatSize(item.sizeKb)}</dd></div>
          <div><dt>{lang === "ar" ? "المدة" : "Duration"}</dt><dd>{item.durationMin > 0 ? item.durationMin + " " + (lang === "ar" ? "د" : "min") : "—"}</dd></div>
          <div><dt>{lang === "ar" ? "اللغة" : "Language"}</dt><dd>{item.language.toUpperCase()}</dd></div>
          <div><dt>{lang === "ar" ? "المؤلف" : "Author"}</dt><dd>{item.authorId}</dd></div>
          <div><dt>{lang === "ar" ? "أُنشئ" : "Created"}</dt><dd>{item.createdAt}</dd></div>
          <div><dt>{lang === "ar" ? "آخر تحديث" : "Updated"}</dt><dd>{item.updatedAt}</dd></div>
        </dl>
      </section>

      {pipeline && (
        <section className="cd-section">
          <h2>{lang === "ar" ? "مسار المعالجة" : "Processing pipeline"}</h2>
          <div className="cd-flow">
            {stages.map((s, i) => {
              const cls = i < stageIdx ? "done" : i === stageIdx ? "current" : "pending";
              return (
                <div key={s} className={"cd-step " + cls}>
                  <span className="cd-step-dot" />
                  <span className="cd-step-label">{stageLabels[s]}</span>
                </div>
              );
            })}
          </div>
          {pipeline.errorAr && (
            <div className="cd-error">
              <span className="cd-error-icon">!</span>
              {lang === "ar" ? pipeline.errorAr : pipeline.errorEn}
            </div>
          )}
        </section>
      )}

      <section className="cd-section">
        <h2>{lang === "ar" ? "الوسوم" : "Tags"}</h2>
        <div className="cd-tag-list">
          {item.tags.map((tag) => <span key={tag} className="cd-tag">#{tag}</span>)}
        </div>
      </section>

      {course && (
        <section className="cd-section">
          <h2>{lang === "ar" ? "المقرر المرتبط" : "Linked course"}</h2>
          <Link to={"/courses/" + course.id} className="cd-course-card">
            <span className="cd-course-code">{course.code}</span>
            <span className="cd-course-title">{lang === "ar" ? course.titleAr : course.titleEn}</span>
            <span className="cd-course-meta">{course.contentCount} {lang === "ar" ? "محتوى" : "content"} · {course.summaryCount} {lang === "ar" ? "ملخص" : "summaries"}</span>
          </Link>
        </section>
      )}

      <footer className="cd-actions">
        <button className="cd-btn" type="button">{lang === "ar" ? "تنزيل" : "Download"}</button>
        <button className="cd-btn" type="button">{lang === "ar" ? "معالجة مجددًا" : "Reprocess"}</button>
        <button className="cd-btn primary" type="button">{lang === "ar" ? "اعتماد" : "Approve"}</button>
        <button className="cd-btn" type="button">{lang === "ar" ? "نشر" : "Publish"}</button>
        <div className="cd-spacer" />
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
