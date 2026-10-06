import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { backupRepo } from "../../adapters/mock/repository";
import type { Backup, RetentionPolicy } from "../../domain/types";
import "./BackupCenter.css";

export function BackupCenter() {
  const { lang, t } = useLang();
  const [backups, setBackups] = useState<Backup[]>([]);
  const [policies, setPolicies] = useState<RetentionPolicy[]>([]);
  const [tab, setTab] = useState<"backups" | "retention">("backups");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([backupRepo.list(), backupRepo.listPolicies()])
      .then(([b, p]) => { setBackups(b); setPolicies(p); setLoading(false); });
  }, []);

  const kindLabelsAr: Record<string, string> = { manual: "يدوية", scheduled: "مجدولة", snapshot: "لقطة", incremental: "تزايدية" };
  const kindLabelsEn: Record<string, string> = { manual: "Manual", scheduled: "Scheduled", snapshot: "Snapshot", incremental: "Incremental" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const statusLabelsAr: Record<string, string> = { running: "قيد التنفيذ", completed: "مكتملة", failed: "فشلت", verifying: "قيد التحقق", restoring: "قيد الاستعادة" };
  const statusLabelsEn: Record<string, string> = { running: "Running", completed: "Completed", failed: "Failed", verifying: "Verifying", restoring: "Restoring" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const title = lang === "ar" ? "النسخ الاحتياطي" : "Backup Center";
  const subtitle = lang === "ar" ? "النسخ الاحتياطي والاستعادة وسياسات الاحتفاظ" : "Backups, recovery, and retention policies";
  const backupsTab = lang === "ar" ? "النسخ" : "Backups";
  const retentionTab = lang === "ar" ? "سياسات الاحتفاظ" : "Retention";

  return (
    <div className="bk-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      {loading && <p className="muted-line">...</p>}

      {!loading && (
        <>
          <div className="bk-stats">
            <div className="bk-stat"><span className="bstat-v">{backups.filter((b) => b.status === "completed").length}</span><span className="bstat-k">{lang === "ar" ? "مكتملة" : "Completed"}</span></div>
            <div className="bk-stat"><span className="bstat-v warn">{backups.filter((b) => b.status === "verifying" || b.status === "running").length}</span><span className="bstat-k">{lang === "ar" ? "قيد المعالجة" : "In progress"}</span></div>
            <div className="bk-stat"><span className="bstat-v danger">{backups.filter((b) => b.status === "failed").length}</span><span className="bstat-k">{lang === "ar" ? "فشلت" : "Failed"}</span></div>
            <div className="bk-stat"><span className="bstat-v success">{backups.filter((b) => b.integrityOk).length}</span><span className="bstat-k">{lang === "ar" ? "سليمة" : "Integrity OK"}</span></div>
          </div>

          <nav className="bk-tabs">
            <button className={"bk-tab" + (tab === "backups" ? " active" : "")} type="button" onClick={() => setTab("backups")}>{backupsTab}</button>
            <button className={"bk-tab" + (tab === "retention" ? " active" : "")} type="button" onClick={() => setTab("retention")}>{retentionTab}</button>
          </nav>

          {tab === "backups" && (
            <div className="bk-table-wrap">
              <table className="bk-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{lang === "ar" ? "النوع" : "Kind"}</th>
                    <th>{lang === "ar" ? "الحالة" : "Status"}</th>
                    <th>{lang === "ar" ? "الحجم" : "Size"}</th>
                    <th>{lang === "ar" ? "سلامة" : "Integrity"}</th>
                    <th>{lang === "ar" ? "المنشئ" : "By"}</th>
                    <th>{lang === "ar" ? "أُنشئ" : "Created"}</th>
                    <th>{lang === "ar" ? "ينتهي" : "Expires"}</th>
                  </tr>
                </thead>
                <tbody>
                  {backups.map((b) => (
                    <tr key={b.id}>
                      <td className="mono">{b.id}</td>
                      <td><span className={"kind-pill kp-" + b.kind}>{kindLabels[b.kind]}</span></td>
                      <td><span className={"bk-status st-" + b.status}>{statusLabels[b.status]}</span></td>
                      <td className="mono">{b.sizeMb} MB</td>
                      <td>{b.integrityOk ? <span className="ok-chip">OK</span> : <span className="warn-chip">!</span>}</td>
                      <td className="mono">{b.createdBy}</td>
                      <td className="mono">{b.createdAt.slice(0, 16).replace("T", " ")}</td>
                      <td className="mono">{b.expiresAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "retention" && (
            <div className="retention-grid">
              {policies.map((p) => (
                <article key={p.id} className="retention-card">
                  <h3 className="retention-name">{lang === "ar" ? p.kindAr : p.kindEn}</h3>
                  <div className="retention-days"><span className="rd-val">{p.retainDays}</span><span className="rd-lbl">{lang === "ar" ? "أيام" : "days"}</span></div>
                  <div className="retention-keeps">
                    <div><span className="keep-lbl">{lang === "ar" ? "يومي" : "Daily"}</span><span className="keep-val">{p.keepDaily}</span></div>
                    <div><span className="keep-lbl">{lang === "ar" ? "أسبوعي" : "Weekly"}</span><span className="keep-val">{p.keepWeekly}</span></div>
                    <div><span className="keep-lbl">{lang === "ar" ? "شهري" : "Monthly"}</span><span className="keep-val">{p.keepMonthly}</span></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
