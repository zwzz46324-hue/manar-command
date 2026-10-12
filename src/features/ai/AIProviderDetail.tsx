import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../../i18n";
import { aiRepo, aiKeysRepo } from "../../adapters/mock/repository";
import type { AIJob, AIKey, AIProvider } from "../../domain/types";
import "./AIProviderDetail.css";

export function AIProviderDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const [provider, setProvider] = useState<AIProvider | undefined>();
  const [keys, setKeys] = useState<AIKey[]>([]);
  const [jobs, setJobs] = useState<AIJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([aiRepo.listProviders(), aiKeysRepo.list(), aiRepo.listJobs()]).then(([provs, ks, js]) => {
      const p = provs.find((x) => x.id === id);
      setProvider(p);
      if (p) {
        setKeys(ks.filter((k) => k.provider === p.name));
        setJobs(js.filter((j) => j.provider === p.name));
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="apd-page"><p className="muted-line">...</p></div>;
  if (!provider) return (
    <div className="apd-page">
      <p className="muted-line">{lang === "ar" ? "المزوّد غير موجود." : "Provider not found."}</p>
      <Link to="/ai" className="back-link">{lang === "ar" ? "رجوع إلى المزوّدين" : "Back to providers"}</Link>
    </div>
  );

  const statusLabelsAr: Record<string, string> = { healthy: "سليم", degraded: "متدهور", down: "متوقف" };
  const statusLabelsEn: Record<string, string> = { healthy: "Healthy", degraded: "Degraded", down: "Down" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const jobStatusAr: Record<string, string> = { queued: "في الطابور", running: "قيد التشغيل", succeeded: "نجح", failed: "فشل", retrying: "يعيد", cancelled: "ملغى" };
  const jobStatusEn: Record<string, string> = { queued: "Queued", running: "Running", succeeded: "Succeeded", failed: "Failed", retrying: "Retrying", cancelled: "Cancelled" };
  const jobStatus = lang === "ar" ? jobStatusAr : jobStatusEn;

  const keyStatusAr: Record<string, string> = { active: "نشط", rotating: "قيد التدوير", disabled: "معطّل", invalid: "غير صالح" };
  const keyStatusEn: Record<string, string> = { active: "Active", rotating: "Rotating", disabled: "Disabled", invalid: "Invalid" };
  const keyStatus = lang === "ar" ? keyStatusAr : keyStatusEn;

  const caps = lang === "ar" ? provider.capabilitiesAr : provider.capabilitiesEn;

  return (
    <div className="apd-page">
      <nav className="breadcrumb">
        <Link to="/ai" className="crumb">{lang === "ar" ? "المزوّدون" : "Providers"}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{provider.name}</span>
      </nav>

      <header className="apd-header">
        <div>
          <h1 className="apd-title">{provider.name}</h1>
          <div className={"apd-status st-" + provider.status}>
            <span className="apd-dot" />
            {statusLabels[provider.status]}
          </div>
        </div>
      </header>

      <section className="apd-section">
        <h2>{lang === "ar" ? "القدرات" : "Capabilities"}</h2>
        <div className="apd-caps">
          {caps.map((c) => <span key={c} className="apd-cap">{c}</span>)}
        </div>
      </section>

      <section className="apd-section">
        <h2>{lang === "ar" ? "الإحصاءات" : "Statistics"}</h2>
        <dl className="apd-stats">
          <div><dt>{lang === "ar" ? "زمن الاستجابة" : "Latency"}</dt><dd>{provider.latencyMs} ms</dd></div>
          <div><dt>{lang === "ar" ? "نسبة النجاح" : "Success"}</dt><dd>{provider.successRate}%</dd></div>
          <div><dt>{lang === "ar" ? "مهام اليوم" : "Jobs today"}</dt><dd>{provider.jobsToday}</dd></div>
          <div><dt>{lang === "ar" ? "تكلفة اليوم" : "Cost today"}</dt><dd>${provider.costTodayUsd.toFixed(2)}</dd></div>
        </dl>
      </section>

      <section className="apd-section">
        <div className="apd-section-head">
          <h2>{lang === "ar" ? "المفاتيح" : "Keys"}</h2>
          <span className="apd-count">{keys.length}</span>
        </div>
        {keys.length === 0 && <p className="muted-line">{lang === "ar" ? "لا توجد مفاتيح لهذا المزوّد." : "No keys for this provider."}</p>}
        <div className="apd-keys">
          {keys.map((k) => (
            <article key={k.id} className={"apd-key st-" + k.status}>
              <div className="apd-key-head">
                <span className="apd-key-alias">{k.alias}</span>
                <span className={"apd-key-status st-" + k.status}>{keyStatus[k.status]}</span>
              </div>
              <code className="apd-key-mask">{k.masked}</code>
              <div className="apd-key-foot">
                <span>{k.jobsUsed.toLocaleString()} {lang === "ar" ? "مهمة" : "jobs"}</span>
                <span>${k.costUsd.toFixed(2)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="apd-section">
        <div className="apd-section-head">
          <h2>{lang === "ar" ? "أحدث المهام" : "Recent jobs"}</h2>
          <span className="apd-count">{jobs.length}</span>
        </div>
        {jobs.length === 0 && <p className="muted-line">{lang === "ar" ? "لا توجد مهام حديثة." : "No recent jobs."}</p>}
        <div className="apd-jobs">
          {jobs.slice(0, 8).map((j) => (
            <article key={j.id} className="apd-job">
              <span className="apd-job-id">{j.id}</span>
              <span className="apd-job-type">{j.type}</span>
              <span className="apd-job-model">{j.model}</span>
              <span className={"apd-job-status js-" + j.status}>{jobStatus[j.status]}</span>
              <span className="apd-job-target">{j.targetId}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="apd-actions">
        <button className="apd-btn" type="button">{lang === "ar" ? "تحقق" : "Verify"}</button>
        <button className="apd-btn danger" type="button">{lang === "ar" ? "تعطيل" : "Disable"}</button>
        <div className="apd-spacer" />
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
