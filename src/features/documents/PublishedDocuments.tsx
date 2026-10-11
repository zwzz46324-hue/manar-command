import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { publishedRepo } from "../../adapters/mock/repository";
import type { PublishChannel, PublishedDocument } from "../../domain/types";
import "./PublishedDocuments.css";

const channels: PublishChannel[] = ["telegram", "whatsapp", "site"];

export function PublishedDocuments() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<PublishedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelFilter, setChannelFilter] = useState<PublishChannel | "all">("all");

  useEffect(() => {
    publishedRepo.list().then((i) => { setItems(i); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return channelFilter === "all" ? items : items.filter((i) => i.channels.includes(channelFilter));
  }, [items, channelFilter]);

  const channelLabelsAr: Record<string, string> = { all: "الكل", telegram: "تلجرام", whatsapp: "واتساب", site: "الموقع" };
  const channelLabelsEn: Record<string, string> = { all: "All", telegram: "Telegram", whatsapp: "WhatsApp", site: "Site" };
  const channelLabels = lang === "ar" ? channelLabelsAr : channelLabelsEn;

  const title = lang === "ar" ? "المستندات المنشورة" : "Published Documents";
  const subtitle = lang === "ar" ? "كل ما تم نشره عبر قنوات منار" : "Everything published across MANAR channels";
  const emptyMsg = lang === "ar" ? "لا توجد مستندات مطابقة." : "No matching documents.";
  const downloadsLabel = lang === "ar" ? "تحميل" : "downloads";
  const publishedByLabel = lang === "ar" ? "نشر بواسطة" : "Published by";

  const totalDownloads = items.reduce((a, i) => a + i.downloads, 0);
  const channelsUsed = new Set(items.flatMap((i) => i.channels)).size;

  return (
    <div className="pd-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {items.length}</span>
        </div>
      </header>

      <div className="pd-stats">
        <div className="pd-stat"><span className="ps-v">{items.length}</span><span className="ps-k">{lang === "ar" ? "منشور" : "Published"}</span></div>
        <div className="pd-stat"><span className="ps-v success">{totalDownloads.toLocaleString()}</span><span className="ps-k">{lang === "ar" ? "إجمالي التحميلات" : "Total downloads"}</span></div>
        <div className="pd-stat"><span className="ps-v">{channelsUsed}</span><span className="ps-k">{lang === "ar" ? "قنوات نشطة" : "Active channels"}</span></div>
      </div>

      <div className="pd-filters">
        <button className={"pd-filter" + (channelFilter === "all" ? " active" : "")} type="button" onClick={() => setChannelFilter("all")}>{channelLabels.all}</button>
        {channels.map((c) => (
          <button key={c} className={"pd-filter" + (channelFilter === c ? " active" : "")} type="button" onClick={() => setChannelFilter(c)}>{channelLabels[c]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="pd-list">
        {filtered.map((p) => (
          <article key={p.id} className="pd-card">
            <div className="pd-card-head">
              <span className="pd-code">{p.courseCode}</span>
              <div className="pd-channels">
                {p.channels.map((c) => (
                  <span key={c} className={"pd-channel ch-" + c}>{channelLabels[c]}</span>
                ))}
              </div>
            </div>
            <h3 className="pd-title">{lang === "ar" ? p.titleAr : p.titleEn}</h3>
            <div className="pd-card-foot">
              <span className="pd-downloads">
                <span className="pd-dl-icon">↓</span>
                {p.downloads.toLocaleString()} {downloadsLabel}
              </span>
              <span className="pd-author">{publishedByLabel}: {p.publishedBy}</span>
              <span className="pd-date">{p.lastChannelAt}</span>
              <Link to={"/documents/" + p.documentId} className="pd-open">
                {lang === "ar" ? "افتح" : "Open"} →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
