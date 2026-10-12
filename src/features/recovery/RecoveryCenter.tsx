import { useEffect, useState } from "react";
import { restoreRepo } from "../../adapters/mock/repository";
import { useLang } from "../../i18n";
import type { RestoreSnapshot, RestoreHistoryEntry } from "../../domain/types";
import "./RecoveryCenter.css";

export function RecoveryCenter() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [snapshots, setSnapshots] = useState<RestoreSnapshot[]>([]);
  const [history, setHistory] = useState<RestoreHistoryEntry[]>([]);
  const [selected, setSelected] = useState<RestoreSnapshot | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    restoreRepo.snapshots().then(setSnapshots);
    restoreRepo.history().then(setHistory);
  }, []);

  const handleRestore = () => {
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      setConfirmOpen(false);
      setConfirmText("");
      setSelected(null);
      alert(ar ? "✅ تمت الاستعادة (تجريبي)" : "✅ Restore completed (demo)");
    }, 2000);
  };

  return (
    <div className="rc-page">
      <div className="rc-warning">
        ⚠️ {ar
          ? "قاعدة صارمة: لا استعادة بدون تأكيد + Audit. لا يمكن التراجع بعد البدء."
          : "Strict rule: No restore without confirmation + Audit. Cannot undo once started."}
      </div>

      <div className="rc-grid">
        <div className="rc-snapshots">
          <div className="rc-panel-title">{ar ? "اللقطات المتاحة" : "AVAILABLE SNAPSHOTS"}</div>
          {snapshots.map((s) => (
            <div
              key={s.id}
              className={"rc-card " + (s.integrityOk ? "ok" : "bad") + (selected?.id === s.id ? " selected" : "")}
              onClick={() => s.integrityOk && setSelected(s)}
            >
              <div className="rc-head">
                <span className="rc-title">{ar ? s.labelAr : s.labelEn}</span>
                <span className="rc-size">{s.sizeMb} MB</span>
              </div>
              <div className="rc-meta">
                <span>📅 {s.createdAt.replace("T", " ").slice(0, 16)}</span>
                <span>🗄️ {s.affectedTables} {ar ? "جدول" : "tables"}</span>
                <span>📁 {s.affectedFiles.toLocaleString()} {ar ? "ملف" : "files"}</span>
                <span>⏱️ ~{Math.ceil(s.estimatedSec / 60)} {ar ? "دقيقة" : "min"}</span>
                <span className={"rc-badge " + (s.integrityOk ? "ok" : "bad")}>
                  {s.integrityOk ? (ar ? "سليمة" : "OK") : (ar ? "تالفة" : "CORRUPT")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="rc-panel">
          <div className="rc-panel-title">{ar ? "معاينة الاستعادة" : "RESTORE PREVIEW"}</div>
          {!selected ? (
            <p style={{ fontSize: 12, color: "var(--manar-muted)" }}>
              {ar ? "اختر لقطة لعرض التأثير." : "Select a snapshot to preview impact."}
            </p>
          ) : (
            <>
              <div className="rc-row"><span>{ar ? "اللقطة" : "Snapshot"}</span><span>{selected.id}</span></div>
              <div className="rc-row"><span>{ar ? "الحجم" : "Size"}</span><span>{selected.sizeMb} MB</span></div>
              <div className="rc-row"><span>{ar ? "الجداول" : "Tables"}</span><span>{selected.affectedTables}</span></div>
              <div className="rc-row"><span>{ar ? "الملفات" : "Files"}</span><span>{selected.affectedFiles.toLocaleString()}</span></div>
              <div className="rc-row"><span>{ar ? "المدة المتوقعة" : "Est. duration"}</span><span>{selected.estimatedSec}s</span></div>
              <button className="rc-btn danger" onClick={() => setConfirmOpen(true)}>
                {ar ? "بدء الاستعادة…" : "Start restore…"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="rc-history">
        <div className="rc-history-head">{ar ? "سجل الاستعادات" : "RESTORE HISTORY"}</div>
        <div className="rc-hrow">
          <span>ID</span><span>{ar ? "النسخة" : "Backup"}</span><span>{ar ? "السبب" : "Reason"}</span><span>{ar ? "الحالة" : "Status"}</span><span>{ar ? "المدة" : "Dur"}</span>
        </div>
        {history.map((h) => (
          <div className="rc-hrow" key={h.id}>
            <span style={{ fontFamily: "var(--manar-font-mono)", color: "var(--manar-faint)" }}>{h.id}</span>
            <span style={{ fontFamily: "var(--manar-font-mono)", color: "var(--manar-accent)" }}>{h.backupId}</span>
            <span>{ar ? h.reasonAr : h.reasonEn}</span>
            <span className={"rc-hst " + h.status}>{h.status}</span>
            <span style={{ fontFamily: "var(--manar-font-mono)" }}>{h.durationSec}s</span>
          </div>
        ))}
      </div>

      {confirmOpen && selected && (
        <div className="rc-modal-bg" onClick={() => !restoring && setConfirmOpen(false)}>
          <div className="rc-modal" onClick={(e) => e.stopPropagation()}>
            <h3>⚠️ {ar ? "تأكيد الاستعادة" : "Confirm Restore"}</h3>
            <p>{ar
              ? `سيتم استبدال البيانات الحالية بمحتوى "${selected.labelAr}". هذا الإجراء لا يمكن التراجع عنه.`
              : `Current data will be replaced with "${selected.labelEn}". This cannot be undone.`}</p>
            <p>{ar ? "اكتب RESTORE للتأكيد:" : "Type RESTORE to confirm:"}</p>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="RESTORE"
              disabled={restoring}
            />
            <div className="rc-modal-actions">
              <button className="rc-btn" onClick={() => setConfirmOpen(false)} disabled={restoring}>
                {ar ? "إلغاء" : "Cancel"}
              </button>
              <button
                className="rc-btn danger"
                onClick={handleRestore}
                disabled={confirmText !== "RESTORE" || restoring}
              >
                {restoring ? (ar ? "جارٍ…" : "Restoring…") : (ar ? "تأكيد" : "Confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
