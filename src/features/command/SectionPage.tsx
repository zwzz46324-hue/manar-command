import { useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import "./SectionPage.css";

export function SectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const id = slug ?? "";
  const title = t.nav.flatMap((g) => g.items).find((_, i) => String(i) === id) ?? id;

  return (
    <div className="section-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{lang === "ar" ? "قسم قيد الإنشاء — DEMO" : "Section under construction — DEMO"}</p>
        </div>
      </header>

      <section className="empty-block">
        <p className="muted-line">
          {lang === "ar"
            ? "هذا القسم سيحتوي على الوظائف الكاملة قريبًا."
            : "This section will contain full functionality soon."}
        </p>
      </section>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
