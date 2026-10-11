import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { commRepo, botsRepo } from "../../adapters/mock/repository";
import type { BotMessage, Broadcast, BroadcastStatus, MessageTemplate } from "../../domain/types";
import "./CommunicationCenter.css";

type Tab = "messages" | "broadcasts" | "templates" | "deliveries";

export function CommunicationCenter() {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [tab, setTab] = useState<Tab>("messages");
  const [statusFilter, setStatusFilter] = useState<BroadcastStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([botsRepo.listMessages(), commRepo.broadcasts(), commRepo.templates()]).then(([m, b, tp]) => {
      setMessages(m);
      setBroadcasts(b);
      setTemplates(tp);
      setLoading(false);
    });
  }, []);

  const filteredBroadcasts = useMemo(() => {
    return statusFilter === "all" ? broadcasts : broadcasts.filter((b) => b.status === statusFilter);
  }, [broadcasts, statusFilter]);

  const tabLabelsAr: Record<string, string> = { messages: "الرسائل", broadcasts: "الحملات", templates: "القوالب", deliveries: "التسليم" };
  const tabLabelsEn: Record<string, string> = { messages: "Messages", broadcasts: "Broadcasts", templates: "Templates", deliveries: "Deliveries" };
  const tabLabels = lang === "ar" ? tabLabelsAr : tabLabelsEn;

  const statusLabelsAr: Record<string, string> = { all: "الكل", draft: "مسودة", scheduled: "مجدولة", sending: "قيد الإرسال", completed: "مكتملة", failed: "فاشلة" };
  const statusLabelsEn: Record<string, string> = { all: "All", draft: "Draft", scheduled: "Scheduled", sending: "Sending", completed: "Completed", failed: "Failed" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const msgStatusAr: Record<string, string> = { queued: "في الطابور", sent: "أُرسل", delivered: "وصل", read: "قُرئ", failed: "فشل" };
  const msgStatusEn: Record<string, string> = { queued: "Queued", sent: "Sent", delivered: "Delivered", read: "Read", failed: "Failed" };
  const msgStatus = lang === "ar" ? msgStatusAr : msgStatusEn;

  const title = lang === "ar" ? "مركز الاتصالات" : "Communication Center";
  const subtitle = lang === "ar" ? "الرسائل، الحملات، القوالب، والتسليم" : "Messages, broadcasts, templates, and deliveries";
  const emptyMsg = lang === "ar" ? "لا توجد بيانات." : "No data.";
  const inLabel = lang === "ar" ? "وارد" : "IN";
  const outLabel = lang === "ar" ? "صادر" : "OUT";

  const stats = {
    totalMessages: messages.length,
    totalBroadcasts: broadcasts.length,
    totalRecipients: broadcasts.reduce((a, b) => a + b.recipients, 0),
    totalDelivered: broadcasts.reduce((a, b) => a + b.delivered, 0),
  };

  return (
    <div className="cc-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      <div className="cc-stats">
        <div className="cc-stat"><span className="ccs-v">{stats.totalMessages}</span><span className="ccs-k">{lang === "ar" ? "رسالة" : "Messages"}</span></div>
        <div className="cc-stat"><span className="ccs-v">{stats.totalBroadcasts}</span><span className="ccs-k">{lang === "ar" ? "حملة" : "Broadcasts"}</span></div>
        <div className="cc-stat"><span className="ccs-v">{stats.totalRecipients.toLocaleString()}</span><span className="ccs-k">{lang === "ar" ? "مستلم" : "Recipients"}</span></div>
        <div className="cc-stat"><span className="ccs-v success">{stats.totalDelivered.toLocaleString()}</span><span className="ccs-k">{lang === "ar" ? "وصل" : "Delivered"}</span></div>
      </div>

      <nav className="cc-tabs">
        {(["messages", "broadcasts", "templates", "deliveries"] as const).map((tb) => (
          <button key={tb} className={"cc-tab" + (tab === tb ? " active" : "")} type="button" onClick={() => setTab(tb)}>{tabLabels[tb]}</button>
        ))}
      </nav>

      {loading && <p className="muted-line">...</p>}

      {!loading && tab === "messages" && (
        <div className="cc-list">
          {messages.length === 0 && <p className="muted-line">{emptyMsg}</p>}
          {messages.map((m) => (
            <article key={m.id} className={"cc-msg msg-" + m.direction}>
              <span className={"cc-dir dir-" + m.direction}>{m.direction === "in" ? inLabel : outLabel}</span>
              <span className={"cc-channel ch-" + m.channel}>{m.channel}</span>
              <span className="cc-text">{lang === "ar" ? m.textAr : m.textEn}</span>
              <span className="cc-recipient">{m.recipientId}</span>
              <span className={"cc-msg-status ms-" + m.status}>{msgStatus[m.status]}</span>
              <span className="cc-time">{m.at.slice(11, 16)}</span>
            </article>
          ))}
        </div>
      )}

      {!loading && tab === "broadcasts" && (
        <>
          <div className="cc-filters">
            <button className={"cc-filter" + (statusFilter === "all" ? " active" : "")} type="button" onClick={() => setStatusFilter("all")}>{statusLabels.all} ({broadcasts.length})</button>
            {(["draft", "scheduled", "sending", "completed", "failed"] as BroadcastStatus[]).map((s) => (
              <button key={s} className={"cc-filter st-" + s + (statusFilter === s ? " active" : "")} type="button" onClick={() => setStatusFilter(s)}>{statusLabels[s]} ({broadcasts.filter((b) => b.status === s).length})</button>
            ))}
          </div>
          <div className="cc-list">
            {filteredBroadcasts.length === 0 && <p className="muted-line">{emptyMsg}</p>}
            {filteredBroadcasts.map((b) => (
              <article key={b.id} className={"cc-broadcast st-" + b.status}>
                <div className="cc-bc-head">
                  <span className={"cc-channel ch-" + b.channel}>{b.channel}</span>
                  <span className={"cc-status st-" + b.status}>{statusLabels[b.status]}</span>
                </div>
                <h3 className="cc-bc-title">{lang === "ar" ? b.titleAr : b.titleEn}</h3>
                <div className="cc-bc-stats">
                  <span><strong>{b.recipients.toLocaleString()}</strong> {lang === "ar" ? "مستلم" : "recipients"}</span>
                  <span className="ok"><strong>{b.delivered.toLocaleString()}</strong> {lang === "ar" ? "وصل" : "delivered"}</span>
                  {b.failed > 0 && <span className="bad"><strong>{b.failed}</strong> {lang === "ar" ? "فشل" : "failed"}</span>}
                </div>
                <div className="cc-bc-foot">
                  <span>{b.createdAt.slice(0, 16).replace("T", " ")}</span>
                  {b.scheduledAt && <span className="cc-scheduled">⏱ {b.scheduledAt.slice(0, 16).replace("T", " ")}</span>}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {!loading && tab === "templates" && (
        <div className="cc-templates">
          {templates.length === 0 && <p className="muted-line">{emptyMsg}</p>}
          {templates.map((tp) => (
            <article key={tp.id} className="cc-template">
              <div className="cc-tpl-head">
                <span className="cc-tpl-name">{lang === "ar" ? tp.nameAr : tp.nameEn}</span>
                <div className="cc-tpl-channels">
                  {tp.channels.map((c) => <span key={c} className={"cc-mini-channel ch-" + c}>{c}</span>)}
                </div>
              </div>
              <p className="cc-tpl-body">{lang === "ar" ? tp.bodyAr : tp.bodyEn}</p>
              <div className="cc-tpl-foot">
                <span>{lang === "ar" ? "استُخدم" : "Used"} {tp.usage.toLocaleString()}</span>
                <span>{tp.updatedAt}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && tab === "deliveries" && (
        <div className="cc-deliveries">
          {broadcasts.filter((b) => b.status === "completed" || b.status === "sending").map((b) => {
            const pct = b.recipients > 0 ? Math.round((b.delivered / b.recipients) * 100) : 0;
            return (
              <article key={b.id} className="cc-delivery">
                <div className="cc-del-head">
                  <span className="cc-del-title">{lang === "ar" ? b.titleAr : b.titleEn}</span>
                  <span className="cc-del-pct">{pct}%</span>
                </div>
                <div className="cc-del-bar"><div className="cc-del-fill" style={{ width: pct + "%" }} /></div>
                <div className="cc-del-stats">
                  <span className="ok">{b.delivered.toLocaleString()} {lang === "ar" ? "وصل" : "delivered"}</span>
                  <span>{b.recipients.toLocaleString()} {lang === "ar" ? "إجمالي" : "total"}</span>
                  {b.failed > 0 && <span className="bad">{b.failed} {lang === "ar" ? "فشل" : "failed"}</span>}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
