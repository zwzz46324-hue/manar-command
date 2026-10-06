import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { opsRepo } from "../../adapters/mock/repository";
import type { FeatureFlag, QueueState, ServiceHealth, Worker } from "../../domain/types";
import "./SystemOperations.css";

type Tab = "services" | "queues" | "workers" | "flags";

export function SystemOperations() {
  const { lang, t } = useLang();
  const [services, setServices] = useState<ServiceHealth[]>([]);
  const [queues, setQueues] = useState<QueueState[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [tab, setTab] = useState<Tab>("services");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([opsRepo.listServices(), opsRepo.listQueues(), opsRepo.listWorkers(), opsRepo.listFlags()])
      .then(([s, q, w, f]) => { setServices(s); setQueues(q); setWorkers(w); setFlags(f); setLoading(false); });
  }, []);

  const healthAr: Record<string, string> = { healthy: "سليم", degraded: "متدهور", blocked: "متوقف", failed: "فشل", maintenance: "صيانة" };
  const healthEn: Record<string, string> = { healthy: "Healthy", degraded: "Degraded", blocked: "Blocked", failed: "Failed", maintenance: "Maintenance" };
  const health = lang === "ar" ? healthAr : healthEn;

  const kindLabelsAr: Record<string, string> = { backend: "خادم", database: "قاعدة", storage: "تخزين", queue: "طابور", worker: "عامل", bot: "بوت", "ai-provider": "مزوّد AI", integration: "تكامل", cache: "ذاكرة" };
  const kindLabelsEn: Record<string, string> = { backend: "Backend", database: "Database", storage: "Storage", queue: "Queue", worker: "Worker", bot: "Bot", "ai-provider": "AI Provider", integration: "Integration", cache: "Cache" };
  const kinds = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const title = lang === "ar" ? "التشغيل" : "System Operations";
  const subtitle = lang === "ar" ? "الخدمات، الطوابير، العمال، والميزات" : "Services, queues, workers, and features";

  const tabs: { id: Tab; ar: string; en: string }[] = [
    { id: "services", ar: "الخدمات", en: "Services" },
    { id: "queues", ar: "الطوابير", en: "Queues" },
    { id: "workers", ar: "العمال", en: "Workers" },
    { id: "flags", ar: "الميزات", en: "Feature Flags" },
  ];

  const healthyCount = services.filter((s) => s.state === "healthy").length;
  const warningCount = services.filter((s) => s.state !== "healthy").length;

  return (
    <div className="ops-page">
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
          <div className="ops-stats">
            <div className="ops-stat"><span className="stat-v success">{healthyCount}</span><span className="stat-k">{lang === "ar" ? "خدمات سليمة" : "Healthy"}</span></div>
            <div className="ops-stat"><span className="stat-v warn">{warningCount}</span><span className="stat-k">{lang === "ar" ? "تحتاج انتباه" : "Attention"}</span></div>
            <div className="ops-stat"><span className="stat-v">{queues.reduce((a, q) => a + q.pending, 0)}</span><span className="stat-k">{lang === "ar" ? "في الطوابير" : "Queued"}</span></div>
            <div className="ops-stat"><span className="stat-v">{workers.filter((w) => w.state === "healthy").length}/{workers.length}</span><span className="stat-k">{lang === "ar" ? "عمال نشطون" : "Workers"}</span></div>
          </div>

          <nav className="ops-tabs">
            {tabs.map((tb) => (
              <button key={tb.id} className={"ops-tab" + (tab === tb.id ? " active" : "")} type="button" onClick={() => setTab(tb.id)}>{lang === "ar" ? tb.ar : tb.en}</button>
            ))}
          </nav>

          {tab === "services" && (
            <div className="services-grid">
              {services.map((s) => (
                <article key={s.id} className={"service-card h-" + s.state}>
                  <div className="service-head">
                    <span className="service-kind">{kinds[s.kind]}</span>
                    <span className={"health-pill h-" + s.state}><span className="h-dot" />{health[s.state]}</span>
                  </div>
                  <h3 className="service-name">{lang === "ar" ? s.nameAr : s.nameEn}</h3>
                  <dl className="service-stats">
                    <div><dt>{lang === "ar" ? "الجاهزية" : "Uptime"}</dt><dd>{s.uptimePct}%</dd></div>
                    <div><dt>{lang === "ar" ? "الاستجابة" : "Latency"}</dt><dd>{s.latencyMs} ms</dd></div>
                  </dl>
                  {s.noteAr && <div className="service-note">{lang === "ar" ? s.noteAr : s.noteEn}</div>}
                </article>
              ))}
            </div>
          )}

          {tab === "queues" && (
            <div className="ops-table-wrap">
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>{lang === "ar" ? "الطابور" : "Queue"}</th>
                    <th>{lang === "ar" ? "منتظر" : "Pending"}</th>
                    <th>{lang === "ar" ? "يعمل" : "Running"}</th>
                    <th>{lang === "ar" ? "فشل" : "Failed"}</th>
                    <th>DLQ</th>
                    <th>{lang === "ar" ? "الإنتاجية/د" : "Throughput/m"}</th>
                  </tr>
                </thead>
                <tbody>
                  {queues.map((q) => (
                    <tr key={q.id}>
                      <td>{lang === "ar" ? q.nameAr : q.nameEn}</td>
                      <td className="mono">{q.pending}</td>
                      <td className="mono">{q.running}</td>
                      <td className={"mono" + (q.failed > 0 ? " danger" : "")}>{q.failed}</td>
                      <td className={"mono" + (q.deadLetter > 0 ? " danger" : "")}>{q.deadLetter}</td>
                      <td className="mono">{q.throughputPerMin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "workers" && (
            <div className="workers-list">
              {workers.map((w) => (
                <article key={w.id} className={"worker-card h-" + w.state}>
                  <div className="worker-head">
                    <span className="worker-name">{w.name}</span>
                    <span className={"health-pill h-" + w.state}><span className="h-dot" />{health[w.state]}</span>
                  </div>
                  <div className="worker-meta">
                    <span>{w.region}</span>
                    <span>{w.jobsActive} {lang === "ar" ? "نشط" : "active"}</span>
                    <span>{w.jobsCompletedToday} {lang === "ar" ? "مكتمل" : "done"}</span>
                  </div>
                  <div className="worker-bars">
                    <div className="bar-row"><span className="bar-label">CPU</span><div className="bar"><div className="bar-fill" style={{ width: w.cpuPct + "%" }} /></div><span className="bar-val">{w.cpuPct}%</span></div>
                    <div className="bar-row"><span className="bar-label">RAM</span><div className="bar"><div className="bar-fill" style={{ width: w.memoryPct + "%" }} /></div><span className="bar-val">{w.memoryPct}%</span></div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === "flags" && (
            <div className="flags-list">
              {flags.map((f) => (
                <article key={f.id} className={"flag-card" + (f.enabled ? " on" : " off")}>
                  <div className="flag-head">
                    <span className="flag-key">{f.key}</span>
                    <span className={"flag-state" + (f.enabled ? " on" : " off")}>{f.enabled ? (lang === "ar" ? "مفعّل" : "ON") : (lang === "ar" ? "معطّل" : "OFF")}</span>
                  </div>
                  <h3 className="flag-name">{lang === "ar" ? f.labelAr : f.labelEn}</h3>
                  <p className="flag-desc">{lang === "ar" ? f.descriptionAr : f.descriptionEn}</p>
                  <div className="flag-meta">
                    <span className={"env-chip env-" + f.environment}>{f.environment}</span>
                    <span className="rollout">Rollout: {f.rolloutPct}%</span>
                    <span className="flag-date">{f.updatedAt}</span>
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
