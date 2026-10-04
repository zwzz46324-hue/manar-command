
import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { securityRepo } from "../../adapters/mock/repository";
import type { ActiveSession, SecurityEvent } from "../../domain/types";
import "./SecurityCenter.css";

export function SecurityCenter() {
  const { lang, t } = useLang();
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [tab, setTab] = useState<"events" | "sessions">("events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([securityRepo.listEvents(), securityRepo.listSessions()])
      .then(([e, s]) => { setEvents(e); setSessions(s); setLoading(false); });
  }, []);

  const eventLabelsAr: Record<string, string> = {
    "login-success": "دخول ناجح", "login-failure": "فشل دخول", logout: "خروج",
    "permission-denied": "رفض صلاحية", "session-expired": "جلسة منتهية",
    "suspicious-activity": "نشاط مريب", "secret-rotated": "تدوير مفتاح", "ip-blocked": "حجب IP",
  };
  const eventLabelsEn: Record<string, string> = {
    "login-success": "Login success", "login-failure": "Login failure", logout: "Logout",
    "permission-denied": "Permission denied", "session-expired": "Session expired",
    "suspicious-activity": "Suspicious activity", "secret-rotated": "Secret rotated", "ip-blocked": "IP blocked",
  };
  const eventLabels = lang === "ar" ? eventLabelsAr : eventLabelsEn;

  const riskLabelsAr: Record<string, string> = { low: "منخفض", medium: "متوسط", high: "عالٍ", critical: "حرج" };
  const riskLabelsEn: Record<string, string> = { low: "Low", medium: "Medium", high: "High", critical: "Critical" };
  const riskLabels = lang === "ar" ? riskLabelsAr : riskLabelsEn;

  const title = lang === "ar" ? "مركز الأمن" : "Security Center";
  const subtitle = lang === "ar" ? "الأحداث الأمنية والجلسات النشطة" : "Security events and active sessions";
  const eventsTab = lang === "ar" ? "الأحداث" : "Events";
  const sessionsTab = lang === "ar" ? "الجلسات" : "Sessions";

  return (
    <div className="security-center">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      <div className="sec-stats">
        <div className="sec-stat"><span className="sec-val">{events.length}</span><span className="sec-lbl">{lang === "ar" ? "أحداث" : "Events"}</span></div>
        <div className="sec-stat"><span className="sec-val danger">{events.filter((e) => e.riskLevel === "high" || e.riskLevel === "critical").length}</span><span className="sec-lbl">{lang === "ar" ? "خطرة" : "High risk"}</span></div>
        <div className="sec-stat"><span className="sec-val">{sessions.length}</span><span className="sec-lbl">{lang === "ar" ? "جلسات" : "Sessions"}</span></div>
        <div className="sec-stat"><span className="sec-val success">{sessions.filter((s) => s.current).length}</span><span className="sec-lbl">{lang === "ar" ? "حالية" : "Current"}</span></div>
      </div>

      <nav className="sec-tabs">
        <button className={"sec-tab" + (tab === "events" ? " active" : "")} type="button" onClick={() => setTab("events")}>{eventsTab}</button>
        <button className={"sec-tab" + (tab === "sessions" ? " active" : "")} type="button" onClick={() => setTab("sessions")}>{sessionsTab}</button>
      </nav>

      {loading && <p className="muted-line">...</p>}

      {!loading && tab === "events" && (
        <div className="sec-table-wrap">
          <table className="sec-table">
            <thead>
              <tr>
                <th>{lang === "ar" ? "الوقت" : "Time"}</th>
                <th>{lang === "ar" ? "النوع" : "Type"}</th>
                <th>{lang === "ar" ? "الفاعل" : "Actor"}</th>
                <th>IP</th>
                <th>{lang === "ar" ? "الموقع" : "Location"}</th>
                <th>{lang === "ar" ? "المخاطر" : "Risk"}</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="mono">{e.at.slice(11, 16)}</td>
                  <td><span className={"event-type type-" + e.type}>{eventLabels[e.type]}</span></td>
                  <td className="mono">{e.actorId}</td>
                  <td className="mono">{e.ipAddress}</td>
                  <td>{e.location}</td>
                  <td><span className={"risk-pill risk-" + e.riskLevel}>{riskLabels[e.riskLevel]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab === "sessions" && (
        <div className="sessions-list">
          {sessions.map((s) => (
            <article key={s.id} className={"session-card" + (s.current ? " current" : "")}>
              <div className="session-head">
                <span className="session-device">{s.device}</span>
                {s.current && <span className="session-current-badge">{lang === "ar" ? "هذه الجلسة" : "This session"}</span>}
              </div>
              <div className="session-meta">
                <span className="session-user">{s.userId}</span>
                <span className="session-ip">{s.ipAddress}</span>
                <span className="session-loc">{s.location}</span>
              </div>
              <div className="session-times">
                <span>{lang === "ar" ? "بدأت" : "Started"} {s.startedAt.slice(11, 16)}</span>
                <span>{lang === "ar" ? "آخر ظهور" : "Last seen"} {s.lastSeenAt.slice(11, 16)}</span>
              </div>
              {!s.current && <button className="session-revoke" type="button">{lang === "ar" ? "إنهاء" : "Revoke"}</button>}
            </article>
          ))}
        </div>
      )}

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
