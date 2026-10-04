
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ManarLogo, ManarCommandPalette } from "../design-system/components";
import { useLang } from "../i18n";
import { useSelection } from "../state/selection";
import "./CommandLayout.css";

const targetFor = (gi: number, ii: number, nav: { label: string; items: string[] }[]) => {
  const item = nav[gi].items[ii];
  if (item === "القيادة" || item === "Command") return "/";
  if (item === "الكون الأكاديمي" || item === "Academic Universe") return "/academic";
  if (item === "المقررات" || item === "Courses") return "/courses";
  const globalIndex = nav.slice(0, gi).reduce((acc, g) => acc + g.items.length, 0) + ii;
  return "/section/" + globalIndex;
};

export function CommandLayout() {
  const { dir, t, lang, toggle } = useLang();
  const { id, kind, labelAr, labelEn, clear } = useSelection();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
          <button className="search-trigger" type="button" onClick={() => setPaletteOpen(true)}>
            <span>{t.searchPlaceholder}</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>
        <div className="horizon-actions">
          <button className="lang-toggle" type="button" onClick={toggle} aria-label="Switch language">
            {t.langButton}
          </button>
          <span className="state-pill state-online">{t.stateOnline}</span>
          <span className="state-pill state-secure">{t.stateSecure}</span>
          <button className="icon-btn" type="button" aria-label="Notifications">◇</button>
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
        <button className="dock-btn" type="button" onClick={() => setPaletteOpen(true)}>{t.dockSearch}</button>
        <button className="dock-btn accent" type="button">{t.dockAi}</button>
        <button className="dock-btn" type="button">{t.dockReview}</button>
        <div className="dock-spacer" />
        <span className="dock-hint">{t.demoBadge}</span>
      </footer>

      <ManarCommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
