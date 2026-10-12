
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ManarLogo, ManarCommandPalette, ManarPulse, ManarClock, ManarNotifications } from "../design-system/components";
import { useLang } from "../i18n";
import { useTheme } from "../design-system/useTheme";
import { useKeyboardShortcuts } from "../design-system/useKeyboardShortcuts";
import { useSelection } from "../state/selection";
import "./CommandLayout.css";

const targetFor = (gi: number, ii: number, nav: { label: string; items: string[] }[]) => {
  const item = nav[gi].items[ii];
  if (item === "القيادة" || item === "Command") return "/";
  if (item === "نظرة عامة" || item === "Overview") return "/overview";
  if (item === "الكون الأكاديمي" || item === "Academic Universe") return "/academic";
  if (item === "الكون المحتوى" || item === "Content Universe") return "/content";
  if (item === "خط أنابيب المحتوى" || item === "Pipeline") return "/pipeline";
  if (item === "الكون المحتوى" || item === "Content Universe") return "/content";
  if (item === "المقررات" || item === "Courses") return "/courses";
  if (item === "طابور المراجعة" || item === "Review Queue") return "/review";
  if (item === "مسرح المراجعة" || item === "Review Theater") return "/review";
  if (item === "استوديو المستندات" || item === "Document Studio") return "/documents";
  if (item === "مركز النشر" || item === "Publish Center") return "/publish-center";
  if (item === "قوالب المستندات" || item === "Templates") return "/templates";
  if (item === "المستندات المنشورة" || item === "Published") return "/published";
  if (item === "سجل الحقيقة" || item === "Truth Log") return "/audit";
  if (item === "صحة النظام" || item === "System Health") return "/health";
  if (item === "مركز الأمن" || item === "Security Center") return "/security";
  if (item === "المستخدمون" || item === "Users") return "/people";
  if (item === "الصلاحيات" || item === "Permissions") return "/people";
  if (item === "مشغّل الذكاء" || item === "AI Operator") return "/ai";
  if (item === "المزوّدون" || item === "Providers") return "/ai";
  if (item === "المهام" || item === "Jobs") return "/jobs";
  if (item === "أعلام الميزات" || item === "Feature Flags") return "/flags";
  if (item === "المفاتيح" || item === "Keys") return "/ai/keys";
  if (item === "تلجرام" || item === "Telegram") return "/bots";
  if (item === "واتساب" || item === "WhatsApp") return "/bots";
  if (item === "مخطط التدفق" || item === "Bot Flow") return "/bot-flow";
  if (item === "مركز الاتصالات" || item === "Communications") return "/communication";
  if (item === "الانتباه" || item === "Attention") return "/attention";
  if (item === "النشاط" || item === "Activity") return "/activity";
  if (item === "صحة النظام" || item === "System Health") return "/operations";
  if (item === "خريطة المنظومة" || item === "System Map") return "/system-map";
  if (item === "الإعدادات" || item === "Settings") return "/settings";
  if (item === "الملخصات" || item === "Summaries") return "/summaries";
  if (item === "خزنة البيانات" || item === "Data Vault") return "/vault";
  if (item === "النسخ الاحتياطي" || item === "Backups") return "/backup";
  if (item === "الصلاحيات" || item === "Permissions") return "/permissions";
  if (item === "مركز الاستعادة" || item === "Recovery Center") return "/recovery";
  if (item === "مركز الكود" || item === "Code Center") return "/code";
  if (item === "البناء والاختبارات" || item === "Build & Tests") return "/builds";
  const globalIndex = nav.slice(0, gi).reduce((acc, g) => acc + g.items.length, 0) + ii;
  return "/section/" + globalIndex;
};

export function CommandLayout() {
  const { dir, t, lang, toggle } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  
  useKeyboardShortcuts({
    onToggleLang: toggle,
    onToggleTheme: toggleTheme,
    onOpenPalette: () => setPaletteOpen((v) => !v),
    onEscape: () => setPaletteOpen(false),
  });
  const { id, kind, labelAr, labelEn, clear } = useSelection();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const railLabel = lang === "ar" ? labelAr : labelEn;
  const hasSelection = !!id;

  return (
    <div className="manar-shell" dir={dir}>
      <header className="system-horizon">
        <div className="horizon-brand">
          <ManarLogo size={28} />
          <div className="brand-text">
            <span className="brand-ar">{t.brandAr}</span>
            <span className="brand-en">{t.brandEn}</span>
          </div>
        </div>
        <div className="horizon-search">
          <button className="search-trigger" type="button" onClick={() => setPaletteOpen(true)} style={{ cursor: "pointer" }}>
            <span>{t.searchPlaceholder}</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>
        <div className="horizon-actions">
          <ManarPulse label={lang === "ar" ? "نشاط" : "Activity"} state="healthy" hint="42/min" />
          <ManarClock />
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Switch theme" title={theme === "dark" ? (lang === "ar" ? "الوضع الفاتح" : "Light mode") : (lang === "ar" ? "الوضع الداكن" : "Dark mode")}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="lang-toggle" type="button" onClick={toggle} aria-label="Switch language">
            {t.langButton}
          </button>
          <span className="state-pill state-online">{t.stateOnline}</span>
          <span className="state-pill state-secure">{t.stateSecure}</span>
          <ManarNotifications />
          <div className="user-chip" title={t.owner}>
            <span className="user-dot" />
            <span>{t.owner}</span>
          </div>
        </div>
      </header>

      <aside className="navigation-spine" aria-label="Main navigation">
        <nav className="spine-inner">
          {t.nav.map((group, gi) => (
            <React.Fragment key={gi}>
              <p className="nav-group">{group.label}</p>
              {group.items.map((item, ii) => (
                <NavLink key={ii} to={targetFor(gi, ii, t.nav)} end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
                  {item}
                </NavLink>
              ))}
            </React.Fragment>
          ))}
        </nav>
      </aside>

      <main className="command-core">
        <Outlet />
      </main>

      <aside className="intelligence-rail" aria-label="Intelligence rail">
        <div className="rail-head">
          <h3>{t.railTitle}</h3>
          <span className="rail-state">{hasSelection ? (lang === "ar" ? "محدد" : "SELECTED") : t.railState}</span>
        </div>
        {!hasSelection && <p className="rail-empty">{t.railEmpty}</p>}
        {hasSelection && (
          <div className="rail-body">
            <div className={"rail-kind kind-" + kind}>{kind ? kind.toUpperCase() : "—"}</div>
            <h4 className="rail-title">{railLabel}</h4>
            <dl className="rail-fields">
              <div><dt>{lang === "ar" ? "المعرّف" : "ID"}</dt><dd>{id}</dd></div>
              <div><dt>{lang === "ar" ? "النوع" : "Kind"}</dt><dd>{kind ?? "—"}</dd></div>
              <div><dt>{lang === "ar" ? "الحالة" : "Status"}</dt><dd className="rail-status"><span className="rail-dot" />{lang === "ar" ? "نشط" : "Active"}</dd></div>
            </dl>
            <button className="rail-clear" type="button" onClick={clear}>{lang === "ar" ? "إلغاء التحديد" : "Clear selection"}</button>
          </div>
        )}
      </aside>

      <footer className="command-dock" aria-label="Command dock">
        <button className="dock-btn primary" type="button">{t.dockCreate}</button>
        <button className="dock-btn" type="button" onClick={() => setPaletteOpen(true)} style={{ cursor: "pointer" }}>{t.dockSearch}</button>
        <button className="dock-btn accent" type="button">{t.dockAi}</button>
        <button className="dock-btn" type="button">{t.dockReview}</button>
        <div className="dock-spacer" />
        <ManarPulse label="AI" state="healthy" />
        <ManarPulse label={lang === "ar" ? "بوتات" : "Bots"} state="healthy" />
        <span className="dock-hint">{t.demoBadge}</span>
      </footer>

      <ManarCommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}