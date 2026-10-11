import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { peopleRepo, securityRepo, truthRepo } from "../../adapters/mock/repository";
import type { ActiveSession, ManarUser, TruthEvent } from "../../domain/types";
import "./UserDetail.css";

export function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [user, setUser] = useState<ManarUser | undefined>();
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [activity, setActivity] = useState<TruthEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([peopleRepo.listUsers(), securityRepo.listSessions(), truthRepo.list()]).then(([users, sess, tr]) => {
      setUser(users.find((u) => u.id === id));
      setSessions(sess.filter((s) => s.userId === id));
      setActivity(tr.filter((e) => e.actorId === id).slice(0, 8));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="ud-page"><p className="muted-line">...</p></div>;
  if (!user) return (
    <div className="ud-page">
      <p className="muted-line">{lang === "ar" ? "المستخدم غير موجود." : "User not found."}</p>
      <Link to="/people" className="back-link">{lang === "ar" ? "رجوع إلى الأشخاص" : "Back to People"}</Link>
    </div>
  );

  const statusLabelsAr: Record<string, string> = { active: "نشط", suspended: "موقوف", pending: "بانتظار التفعيل", archived: "مؤرشف" };
  const statusLabelsEn: Record<string, string> = { active: "Active", suspended: "Suspended", pending: "Pending", archived: "Archived" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const name = lang === "ar" ? user.displayNameAr : user.displayNameEn;
  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <div className="ud-page">
      <nav className="breadcrumb">
        <Link to="/people" className="crumb">{lang === "ar" ? "المستخدمون" : "Users"}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{user.username}</span>
      </nav>

      <header className="ud-header">
        <span className="ud-avatar">{initials}</span>
        <div className="ud-header-body">
          <h1 className="ud-name">{name}</h1>
          <div className="ud-tags">
            <span className={"ud-role role-" + user.role}>{user.role}</span>
            <span className={"ud-status st-" + user.status}>{statusLabels[user.status]}</span>
          </div>
          <p className="ud-email">{user.email}</p>
        </div>
      </header>

      <section className="ud-section">
        <h2>{lang === "ar" ? "البيانات" : "Profile"}</h2>
        <dl className="ud-meta">
          <div><dt>{lang === "ar" ? "المعرّف" : "ID"}</dt><dd>{user.id}</dd></div>
          <div><dt>{lang === "ar" ? "اسم المستخدم" : "Username"}</dt><dd>{user.username}</dd></div>
          <div><dt>{lang === "ar" ? "البريد" : "Email"}</dt><dd>{user.email}</dd></div>
          <div><dt>{lang === "ar" ? "الدور" : "Role"}</dt><dd>{user.role}</dd></div>
          <div><dt>{lang === "ar" ? "النطاق" : "Scope"}</dt><dd>{user.scope}</dd></div>
          <div><dt>{lang === "ar" ? "آخر ظهور" : "Last seen"}</dt><dd>{user.lastSeenAt.slice(0, 16).replace("T", " ")}</dd></div>
          <div><dt>{lang === "ar" ? "تاريخ الإنشاء" : "Created"}</dt><dd>{user.createdAt}</dd></div>
          <div><dt>{lang === "ar" ? "المقررات" : "Courses"}</dt><dd>{user.assignedCourses > 0 ? user.assignedCourses : "—"}</dd></div>
        </dl>
      </section>

      <section className="ud-section">
        <div className="ud-section-head">
          <h2>{lang === "ar" ? "الجلسات النشطة" : "Active sessions"}</h2>
          <span className="ud-count">{sessions.length}</span>
        </div>
        {sessions.length === 0 && <p className="muted-line">{lang === "ar" ? "لا توجد جلسات نشطة." : "No active sessions."}</p>}
        <div className="ud-sessions">
          {sessions.map((s) => (
            <article key={s.id} className="ud-session">
              <div className="ud-session-head">
                <span className="ud-session-device">{s.device}</span>
                {s.current && <span className="ud-session-current">{lang === "ar" ? "هذه الجلسة" : "Current"}</span>}
              </div>
              <div className="ud-session-meta">
                <span>{s.ipAddress}</span>
                <span>{s.location}</span>
              </div>
              <div className="ud-session-times">
                <span>{lang === "ar" ? "بدأت" : "Started"}: {s.startedAt.slice(11, 16)}</span>
                <span>{lang === "ar" ? "آخر ظهور" : "Last seen"}: {s.lastSeenAt.slice(11, 16)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ud-section">
        <div className="ud-section-head">
          <h2>{lang === "ar" ? "النشاط الأخير" : "Recent activity"}</h2>
          <span className="ud-count">{activity.length}</span>
        </div>
        {activity.length === 0 && <p className="muted-line">{lang === "ar" ? "لا يوجد نشاط." : "No activity."}</p>}
        <ul className="ud-activity">
          {activity.map((a) => (
            <li key={a.id} className="ud-act-item">
              <span className={"ud-act-dot kind-" + a.kind} />
              <span className="ud-act-text">{lang === "ar" ? a.actionAr : a.actionEn}</span>
              <span className="ud-act-meta">{a.at.slice(0, 16).replace("T", " ")}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="ud-actions">
        <button className="ud-btn" type="button">{lang === "ar" ? "تعديل" : "Edit"}</button>
        <button className="ud-btn" type="button">{lang === "ar" ? "إيقاف" : "Suspend"}</button>
        <button className="ud-btn" type="button">{lang === "ar" ? "إنهاء الجلسات" : "Revoke sessions"}</button>
        <div className="ud-spacer" />
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
