import { useState } from "react";
import { useLang } from "../../i18n";
import "./Settings.css";

export function Settings() {
  const { lang, setLang } = useLang();
  const ar = lang === "ar";

  const [brandName, setBrandName] = useState("منار البيانات");
  const [timezone, setTimezone] = useState("Asia/Aden");
  const [dateFormat, setDateFormat] = useState("gregorian");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(false);
  const [notifyCritical, setNotifyCritical] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [autoBackupFreq, setAutoBackupFreq] = useState("daily");
  const [auditRetention, setAuditRetention] = useState("365");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!confirm(ar ? "إعادة تعيين كل الإعدادات؟" : "Reset all settings?")) return;
    setBrandName("منار البيانات");
    setTimezone("Asia/Aden");
    setDateFormat("gregorian");
    setNotifyEmail(true);
    setNotifyPush(false);
    setNotifyCritical(true);
    setAutoBackup(true);
    setAutoBackupFreq("daily");
    setAuditRetention("365");
  };

  return (
    <div className="st-page">
      {/* الهوية */}
      <div className="st-section">
        <div className="st-title">{ar ? "الهوية" : "IDENTITY"}</div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "اسم النظام" : "System name"}</div>
            <div className="st-desc">{ar ? "يظهر في الترويسة والفواتير" : "Shown in header and invoices"}</div>
          </div>
          <input className="st-input" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
        </div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "اللغة" : "Language"}</div>
            <div className="st-desc">{ar ? "لغة الواجهة" : "Interface language"}</div>
          </div>
          <select className="st-select" value={lang} onChange={(e) => setLang(e.target.value as "ar" | "en")}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* التوقيت */}
      <div className="st-section">
        <div className="st-title">{ar ? "التوقيت والتاريخ" : "TIME & DATE"}</div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "المنطقة الزمنية" : "Timezone"}</div>
            <div className="st-desc">{ar ? "تُستخدم في كل السجلات" : "Used across all logs"}</div>
          </div>
          <select className="st-select" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            <option value="Asia/Aden">Asia/Aden (GMT+3)</option>
            <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
            <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "التقويم" : "Calendar"}</div>
            <div className="st-desc">{ar ? "التقويم المعروض" : "Displayed calendar"}</div>
          </div>
          <select className="st-select" value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
            <option value="gregorian">{ar ? "ميلادي" : "Gregorian"}</option>
            <option value="hijri">{ar ? "هجري" : "Hijri"}</option>
          </select>
        </div>
      </div>

      {/* الإشعارات */}
      <div className="st-section">
        <div className="st-title">{ar ? "الإشعارات" : "NOTIFICATIONS"}</div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "إشعارات البريد" : "Email notifications"}</div>
            <div className="st-desc">{ar ? "تصلك التنبيهات على البريد" : "Get alerts by email"}</div>
          </div>
          <button className={"st-toggle" + (notifyEmail ? " on" : "")} onClick={() => setNotifyEmail(!notifyEmail)} />
        </div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "إشعارات المتصفح" : "Browser notifications"}</div>
            <div className="st-desc">{ar ? "تنبيهات فورية في المتصفح" : "Real-time browser alerts"}</div>
          </div>
          <button className={"st-toggle" + (notifyPush ? " on" : "")} onClick={() => setNotifyPush(!notifyPush)} />
        </div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "التنبيهات الحرجة فقط" : "Critical alerts only"}</div>
            <div className="st-desc">{ar ? "تلقي فقط للتنبيهات الحرجة" : "Receive only critical alerts"}</div>
          </div>
          <button className={"st-toggle" + (notifyCritical ? " on" : "")} onClick={() => setNotifyCritical(!notifyCritical)} />
        </div>
      </div>

      {/* النسخ الاحتياطي */}
      <div className="st-section">
        <div className="st-title">{ar ? "النسخ الاحتياطي والتدقيق" : "BACKUP & AUDIT"}</div>
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "نسخ تلقائي" : "Auto backup"}</div>
            <div className="st-desc">{ar ? "نسخ دورية بدون تدخل" : "Periodic automatic backup"}</div>
          </div>
          <button className={"st-toggle" + (autoBackup ? " on" : "")} onClick={() => setAutoBackup(!autoBackup)} />
        </div>
        {autoBackup && (
          <div className="st-row">
            <div>
              <div className="st-label">{ar ? "تكرار النسخ" : "Backup frequency"}</div>
            </div>
            <select className="st-select" value={autoBackupFreq} onChange={(e) => setAutoBackupFreq(e.target.value)}>
              <option value="hourly">{ar ? "كل ساعة" : "Hourly"}</option>
              <option value="daily">{ar ? "يوميًا" : "Daily"}</option>
              <option value="weekly">{ar ? "أسبوعيًا" : "Weekly"}</option>
            </select>
          </div>
        )}
        <div className="st-row">
          <div>
            <div className="st-label">{ar ? "احتفاظ سجل التدقيق" : "Audit log retention"}</div>
            <div className="st-desc">{ar ? "عدد الأيام قبل الحذف التلقائي" : "Days before auto-delete"}</div>
          </div>
          <select className="st-select" value={auditRetention} onChange={(e) => setAuditRetention(e.target.value)}>
            <option value="30">30 {ar ? "يوم" : "days"}</option>
            <option value="90">90 {ar ? "يوم" : "days"}</option>
            <option value="365">365 {ar ? "يوم" : "days"}</option>
            <option value="forever">{ar ? "دائم" : "Forever"}</option>
          </select>
        </div>
      </div>

      {/* أزرار */}
      <div className="st-actions">
        <button className="st-btn danger" onClick={handleReset}>
          {ar ? "إعادة تعيين" : "Reset"}
        </button>
        <button className="st-btn primary" onClick={handleSave}>
          {ar ? "حفظ" : "Save"}
        </button>
      </div>
      {saved && (
        <div className="st-hint">✅ {ar ? "تم الحفظ (تجريبي)" : "Saved (demo)"}</div>
      )}
    </div>
  );
}
