
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { aiRepo } from "../../adapters/mock/repository";
import type { AIJob, AIProvider } from "../../domain/types";
import "./AIOperations.css";

export function AIOperations() {
  const { lang, t } = useLang();
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [jobs, setJobs] = useState<AIJob[]>([]);
  const [tab, setTab] = useState<"providers" | "jobs">("providers");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([aiRepo.listProviders(), aiRepo.listJobs()])
      .then(([p, j]) => { setProviders(p); setJobs(j); setLoading(false); });
  }, []);

  const jobTypeLabelsAr: Record<string, string> = {
    transcription: "تفريغ صوتي", summarization: "تلخيص", translation: "ترجمة",
    ocr: "OCR", classification: "تصنيف", enrichment: "إثراء", "document-generation": "توليد مستند",
  };
  const jobTypeLabelsEn: Record<string, string> = {
    transcription: "Transcription", summarization: "Summarization", translation: "Translation",
    ocr: "OCR", classification: "Classification", enrichment: "Enrichment", "document-generation": "Document generation",
  };
  const jobTypeLabels = lang === "ar" ? jobTypeLabelsAr : jobTypeLabelsEn;

  const statusLabelsAr: Record<string, string> = { healthy: "سليم", degraded: "متدهور", down: "متوقف" };
  const statusLabelsEn: Record<string, string> = { healthy: "Healthy", degraded: "Degraded", down: "Down" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const jobStatusAr: Record<string, string> = { queued: "في الطابور", running: "قيد التشغيل", succeeded: "نجح", failed: "فشل", retrying: "يعيد", cancelled: "ملغى" };
  const jobStatusEn: Record<string, string> = { queued: "Queued", running: "Running", succeeded: "Succeeded", failed: "Failed", retrying: "Retrying", cancelled: "Cancelled" };
  const jobStatus = lang === "ar" ? jobStatusAr : jobStatusEn;

  const title = lang === "ar" ? "عمليات الذكاء الاصطناعي" : "AI Operations";
  const subtitle = lang === "ar" ? "المزوّدون والنماذج والمهام" : "Providers, models, and jobs";
  const providersTab = lang === "ar" ? "المزوّدون" : "Providers";
  const jobsTab = lang === "ar" ? "المهام" : "Jobs";

  return (
    <div className="ai-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      <nav className="ai-tabs">
        <button className={"ai-tab" + (tab === "providers" ? " active" : "")} type="button" onClick={() => setTab("providers")}>{providersTab}</button>
        <button className={"ai-tab" + (tab === "jobs" ? " active" : "")} type="button" onClick={() => setTab("jobs")}>{jobsTab}</button>
      </nav>

      {loading && <p className="muted-line">...</p>}

      {!loading && tab === "providers" && (
        <div className="providers-grid">
          {providers.map((p) => (
            <Link key={p.id} to={"/ai/providers/" + p.id} className={"provider-card status-" + p.status}>
              <div className="provider-head">
                <span className="provider-name">{p.name}</span>
                <span className={"provider-status ps-" + p.status}>{statusLabels[p.status]}</span>
              </div>
              <div className="provider-caps">
                {(lang === "ar" ? p.capabilitiesAr : p.capabilitiesEn).map((c) => (
                  <span key={c} className="cap-chip">{c}</span>
                ))}
              </div>
              <dl className="provider-stats">
                <div><dt>{lang === "ar" ? "زمن الاستجابة" : "Latency"}</dt><dd>{p.latencyMs} ms</dd></div>
                <div><dt>{lang === "ar" ? "نسبة النجاح" : "Success"}</dt><dd>{p.successRate}%</dd></div>
                <div><dt>{lang === "ar" ? "مهام اليوم" : "Jobs today"}</dt><dd>{p.jobsToday}</dd></div>
                <div><dt>{lang === "ar" ? "تكلفة اليوم" : "Cost today"}</dt><dd>${p.costTodayUsd.toFixed(2)}</dd></div>
              </dl>
              <div className="provider-key">
                <span className="key-alias">{p.keyAlias}</span>
                <span className={"key-status ks-" + p.keyStatus}>{p.keyStatus}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && tab === "jobs" && (
        <div className="ai-table-wrap">
          <table className="ai-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{lang === "ar" ? "النوع" : "Type"}</th>
                <th>{lang === "ar" ? "المزوّد" : "Provider"}</th>
                <th>{lang === "ar" ? "النموذج" : "Model"}</th>
                <th>{lang === "ar" ? "الحالة" : "Status"}</th>
                <th>{lang === "ar" ? "المحاولة" : "Attempt"}</th>
                <th>{lang === "ar" ? "الهدف" : "Target"}</th>
                <th>{lang === "ar" ? "التتبع" : "Trace"}</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td className="mono">{j.id}</td>
                  <td>{jobTypeLabels[j.type]}</td>
                  <td className="mono">{j.provider}</td>
                  <td className="mono">{j.model}</td>
                  <td><span className={"job-status js-" + j.status}>{jobStatus[j.status]}</span></td>
                  <td className="mono">{j.attempt}</td>
                  <td className="mono">{j.targetId}</td>
                  <td className="mono trace-cell">{j.traceId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
