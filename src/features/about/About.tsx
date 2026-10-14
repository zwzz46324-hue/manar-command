import { useLang } from "../../i18n";
import "./About.css";

export function About() {
  const { lang } = useLang();
  const ar = lang === "ar";

  const stack = [
    "React 19",
    "TypeScript",
    "Vite 8",
    "React Router",
    "PWA",
    "Vite Plugin PWA",
    "Workbox",
    "CSS Grid",
    "CSS Variables",
    "localStorage",
  ];

  return (
    <div className="ab-page">
      {/* Hero */}
      <div className="ab-hero">
        <div className="ab-logo">⚡</div>
        <h1 className="ab-title">{ar ? "منار البيانات" : "MANAR DATA"}</h1>
        <p className="ab-subtitle">{ar ? "MANAR DATA" : "منار البيانات"}</p>
        <span className="ab-version">
          Phase 51 · 2026
        </span>
      </div>

      {/* ما هو */}
      <div className="ab-section">
        <h2 className="ab-section-title">
          {ar ? "📖 ما هو MANAR DATA؟" : "📖 WHAT IS MANAR DATA?"}
        </h2>
        <p className="ab-text">
          {ar
            ? "منار البيانات هو مركز تحكم متكامل لمنظومة تعليمية ذكية. يجمع إدارة المقررات، الملخصات، المستندات، المراجعة، الذكاء الاصطناعي، الأمن، والبناء في واجهة واحدة."
            : "MANAR DATA is a unified command center for an intelligent educational system. It brings together course management, summaries, documents, review, AI, security, and builds in one interface."}
        </p>
        <p className="ab-text">
          {ar
            ? "يعمل كتطبيق ويب تقدمي (PWA) — قابل للتثبيت على الجوال والحاسوب، ويعمل حتى بدون اتصال بالإنترنت."
            : "It runs as a Progressive Web App (PWA) — installable on mobile and desktop, and works even offline."}
        </p>
      </div>

      {/* الأهداف */}
      <div className="ab-section">
        <h2 className="ab-section-title">
          {ar ? "🎯 الأهداف الرئيسية" : "🎯 MAIN GOALS"}
        </h2>
        <ul className="ab-list">
          <li>{ar ? "إدارة المحتوى التعليمي بشكل مركزي" : "Central educational content management"}</li>
          <li>{ar ? "توليد الملخصات بالذكاء الاصطناعي" : "AI-powered summary generation"}</li>
          <li>{ar ? "سير عمل مراجعة ونشر متكامل" : "Integrated review & publishing workflow"}</li>
          <li>{ar ? "مراقبة النظام والخدمات في الوقت الفعلي" : "Real-time system & service monitoring"}</li>
          <li>{ar ? "سجل تدقيق غير قابل للتعديل" : "Immutable audit log"}</li>
          <li>{ar ? "نشر آمن للنسخ الاحتياطية والاستعادة" : "Safe backup & restore publishing"}</li>
          <li>{ar ? "واجهة عربية وإنجليزية كاملة" : "Full Arabic & English interface"}</li>
          <li>{ar ? "تصميم متجاوب لكل الأجهزة" : "Responsive design for all devices"}</li>
        </ul>
      </div>

      {/* التقنيات */}
      <div className="ab-section">
        <h2 className="ab-section-title">
          {ar ? "⚙️ التقنيات المستخدمة" : "⚙️ TECH STACK"}
        </h2>
        <div className="ab-techs">
          {stack.map((t) => (
            <span key={t} className="ab-tech">{t}</span>
          ))}
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="ab-section">
        <h2 className="ab-section-title">
          {ar ? "📊 الإحصائيات" : "📊 STATS"}
        </h2>
        <div className="ab-stats">
          <div className="ab-stat">
            <span className="ab-stat-v">40+</span>
            <span className="ab-stat-k">{ar ? "شاشة" : "SCREENS"}</span>
          </div>
          <div className="ab-stat">
            <span className="ab-stat-v">51</span>
            <span className="ab-stat-k">{ar ? "مرحلة" : "PHASES"}</span>
          </div>
          <div className="ab-stat">
            <span className="ab-stat-v">100%</span>
            <span className="ab-stat-k">{ar ? "TypeScript" : "TYPESCRIPT"}</span>
          </div>
          <div className="ab-stat">
            <span className="ab-stat-v">PWA</span>
            <span className="ab-stat-k">{ar ? "قابل للتثبيت" : "INSTALLABLE"}</span>
          </div>
        </div>
      </div>

      {/* الروابط */}
      <div className="ab-section">
        <h2 className="ab-section-title">
          {ar ? "🔗 الروابط" : "🔗 LINKS"}
        </h2>
        <div className="ab-links">
          <a
            href="https://github.com/zwzz46324-hue/manar-command"
            target="_blank"
            rel="noopener noreferrer"
            className="ab-link"
          >
            <span className="ab-link-icon">📦</span>
            <div className="ab-link-body">
              <span className="ab-link-title">GitHub</span>
              <span className="ab-link-url">zwzz46324-hue/manar-command</span>
            </div>
          </a>
          <a
            href="https://manar-command.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="ab-link"
          >
            <span className="ab-link-icon">🌐</span>
            <div className="ab-link-body">
              <span className="ab-link-title">{ar ? "الموقع الحي" : "Live Site"}</span>
              <span className="ab-link-url">manar-command.vercel.app</span>
            </div>
          </a>
        </div>
      </div>

      {/* التذييل */}
      <div className="ab-footer">
        <p>
          {ar ? "تم التطوير بـ" : "Built with"}{" "}
          <span className="ab-footer-heart">♥</span>{" "}
          {ar ? "على يد" : "by"} <strong>MANAR Team</strong>
        </p>
        <p style={{ fontFamily: "var(--manar-font-mono)", fontSize: 11, marginTop: 8 }}>
          © 2026 MANAR DATA · v1.0.0 · Phase 51
        </p>
      </div>
    </div>
  );
}
