import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n";
import { useNotifications } from "../../state/notifications";
import "./ManarNotifications.css";

export function ManarNotifications() {
  const { lang } = useLang();
  const { items, markRead, markAllRead, remove, clear } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unread = items.filter((i) => !i.read).length;

  const timeAgo = (t: number) => {
    const diff = Math.floor((Date.now() - t) / 1000 / 60);
    if (diff < 1) return lang === "ar" ? "الآن" : "now";
    if (diff < 60) return lang === "ar" ? diff + " د" : diff + "m";
    const h = Math.floor(diff / 60);
    if (h < 24) return lang === "ar" ? h + " س" : h + "h";
    return lang === "ar" ? Math.floor(h / 24) + " ي" : Math.floor(h / 24) + "d";
  };

  const emptyMsg = lang === "ar" ? "لا توجد إشعارات" : "No notifications";
  const markAll = lang === "ar" ? "تعليم الكل كمقروء" : "Mark all read";
  const clearAll = lang === "ar" ? "مسح الكل" : "Clear all";

  return (
    <div className="notif-wrap" ref={ref}>
      <button className="notif-btn" type="button" aria-label="Notifications" onClick={() => setOpen(!open)}>
        <span className="notif-icon">◇</span>
        {unread > 0 && <span className="notif-badge">{unread}</span>}
      </button>

      {open && (
        <div className="notif-panel" dir={lang === "ar" ? "rtl" : "ltr"}>
          <div className="notif-head">
            <span className="notif-title">{lang === "ar" ? "الإشعارات" : "Notifications"}</span>
            <div className="notif-actions">
              {unread > 0 && <button className="notif-link" type="button" onClick={markAllRead}>{markAll}</button>}
              {items.length > 0 && <button className="notif-link" type="button" onClick={clear}>{clearAll}</button>}
            </div>
          </div>

          <ul className="notif-list">
            {items.length === 0 && <li className="notif-empty">{emptyMsg}</li>}
            {items.map((n) => (
              <li
                key={n.id}
                className={"notif-item kind-" + n.kind + (n.read ? " read" : "")}
                onClick={() => markRead(n.id)}
              >
                <span className={"notif-dot kind-" + n.kind} />
                <div className="notif-body">
                  <div className="notif-item-title">{lang === "ar" ? n.titleAr : n.titleEn}</div>
                  {(n.descAr || n.descEn) && (
                    <div className="notif-item-desc">{lang === "ar" ? n.descAr : n.descEn}</div>
                  )}
                  <div className="notif-item-time">{timeAgo(n.createdAt)}</div>
                </div>
                <button
                  className="notif-close"
                  type="button"
                  aria-label="Dismiss"
                  onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                >×</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
