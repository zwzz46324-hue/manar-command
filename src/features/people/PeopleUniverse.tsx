
import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { Link } from "react-router-dom";
import { peopleRepo } from "../../adapters/mock/repository";
import type { ManarUser, RoleDefinition, UserStatus } from "../../domain/types";
import "./PeopleUniverse.css";

export function PeopleUniverse() {
  const { lang, t } = useLang();
  const [users, setUsers] = useState<ManarUser[]>([]);
  const [roles, setRoles] = useState<RoleDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"users" | "roles">("users");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

  useEffect(() => {
    Promise.all([peopleRepo.listUsers(), peopleRepo.listRoles()])
      .then(([u, r]) => { setUsers(u); setRoles(r); setLoading(false); });
  }, []);

  const filteredUsers = useMemo(() => {
    const term = q.trim().toLowerCase();
    return users.filter((u) => {
      if (statusFilter !== "all" && u.status !== statusFilter) return false;
      if (!term) return true;
      return u.username.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.displayNameAr.includes(term) ||
        u.displayNameEn.toLowerCase().includes(term);
    });
  }, [users, q, statusFilter]);

  const statusLabelsAr: Record<string, string> = { all: "الكل", active: "نشط", suspended: "موقوف", pending: "بانتظار", archived: "مؤرشف" };
  const statusLabelsEn: Record<string, string> = { all: "All", active: "Active", suspended: "Suspended", pending: "Pending", archived: "Archived" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const title = lang === "ar" ? "عالم الأشخاص" : "People Universe";
  const subtitle = lang === "ar" ? "المستخدمون والأدوار والصلاحيات" : "Users, roles and permissions";
  const usersTab = lang === "ar" ? "المستخدمون" : "Users";
  const rolesTab = lang === "ar" ? "الأدوار" : "Roles";
  const searchPlaceholder = lang === "ar" ? "ابحث بالاسم أو البريد..." : "Search by name or email...";

  return (
    <div className="people-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filteredUsers.length} / {users.length}</span>
        </div>
      </header>

      <nav className="people-tabs">
        <button className={"people-tab" + (tab === "users" ? " active" : "")} type="button" onClick={() => setTab("users")}>{usersTab}</button>
        <button className={"people-tab" + (tab === "roles" ? " active" : "")} type="button" onClick={() => setTab("roles")}>{rolesTab}</button>
      </nav>

      {tab === "users" && (
        <div className="people-toolbar">
          <input className="people-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} />
          <div className="status-filters">
            {(["all", "active", "suspended", "pending", "archived"] as const).map((s) => (
              <button key={s} className={"status-btn" + (statusFilter === s ? " active" : "")} type="button" onClick={() => setStatusFilter(s)}>{statusLabels[s]}</button>
            ))}
          </div>
        </div>
      )}

      {loading && <p className="muted-line">...</p>}

      {!loading && tab === "users" && (
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>{lang === "ar" ? "المستخدم" : "User"}</th>
                <th>{lang === "ar" ? "الدور" : "Role"}</th>
                <th>{lang === "ar" ? "النطاق" : "Scope"}</th>
                <th>{lang === "ar" ? "الحالة" : "Status"}</th>
                <th>{lang === "ar" ? "آخر ظهور" : "Last seen"}</th>
                <th>{lang === "ar" ? "المقررات" : "Courses"}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="user-row">
                  <td>
                    <div className="user-cell">
                      <span className="user-avatar">{u.username.slice(0, 2).toUpperCase()}</span>
                      <div>
                        <div className="user-name">{lang === "ar" ? u.displayNameAr : u.displayNameEn}</div>
                        <div className="user-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={"role-pill role-" + u.role}>{u.role}</span></td>
                  <td className="scope-cell">{u.scope}</td>
                  <td><span className={"ustatus-pill ustatus-" + u.status}>{statusLabels[u.status]}</span></td>
                  <td className="mono">{u.lastSeenAt.slice(0, 10)}</td>
                  <td className="mono">{u.assignedCourses > 0 ? u.assignedCourses : "—"}</td>
                  <td><Link to={"/people/" + u.id} className="row-link">{lang === "ar" ? "افتح" : "Open"} →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab === "roles" && (
        <div className="roles-list">
          {roles.map((r) => (
            <article key={r.name} className="role-card">
              <div className="role-head">
                <span className={"role-pill role-" + r.name}>{r.name}</span>
                <span className="role-count">{r.userCount} {lang === "ar" ? "مستخدم" : "users"}</span>
              </div>
              <h3 className="role-name">{lang === "ar" ? r.labelAr : r.labelEn}</h3>
              <p className="role-desc">{lang === "ar" ? r.descriptionAr : r.descriptionEn}</p>
              <div className="role-perms">
                {r.permissions.map((p) => (
                  <span key={p} className="perm-chip">{p}</span>
                ))}
              </div>
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
