
import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { botsRepo } from "../../adapters/mock/repository";
import type { BotMessage, ManarBot } from "../../domain/types";
import "./BotCommandCenter.css";

export function BotCommandCenter() {
  const { lang, t } = useLang();
  const [bots, setBots] = useState<ManarBot[]>([]);
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([botsRepo.listBots(), botsRepo.listMessages()])
      .then(([b, m]) => { setBots(b); setMessages(m); setLoading(false); });
  }, []);

  const statusLabelsAr: Record<string, string> = { connected: "متصل", connecting: "جارٍ الاتصال", disconnected: "غير متصل", error: "خطأ" };
  const statusLabelsEn: Record<string, string> = { connected: "Connected", connecting: "Connecting", disconnected: "Disconnected", error: "Error" };
  const statusLabels = lang === "ar" ? statusLabelsAr : statusLabelsEn;

  const msgStatusAr: Record<string, string> = { queued: "في الطابور", sent: "أُرسل", delivered: "وصل", read: "قُرئ", failed: "فشل" };
  const msgStatusEn: Record<string, string> = { queued: "Queued", sent: "Sent", delivered: "Delivered", read: "Read", failed: "Failed" };
  const msgStatus = lang === "ar" ? msgStatusAr : msgStatusEn;

  const title = lang === "ar" ? "مركز قيادة البوتات" : "Bot Command Center";
  const subtitle = lang === "ar" ? "تلجرام، واتساب، والقنوات القادمة" : "Telegram, WhatsApp and future channels";
  const botsLabel = lang === "ar" ? "البوتات" : "Bots";
  const messagesLabel = lang === "ar" ? "الرسائل الحديثة" : "Recent messages";
  const inLabel = lang === "ar" ? "وارد" : "IN";
  const outLabel = lang === "ar" ? "صادر" : "OUT";

  return (
    <div className="bot-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      <section className="bots-section">
        <h2 className="section-h">{botsLabel}</h2>
        {loading && <p className="muted-line">...</p>}
        <div className="bots-grid">
          {bots.map((b) => (
            <article key={b.id} className={"bot-card bs-" + b.status}>
              <div className="bot-head">
                <span className={"channel-chip ch-" + b.channel}>{b.channel}</span>
                <span className={"bot-status st-" + b.status}><span className="bot-dot" />{statusLabels[b.status]}</span>
              </div>
              <h3 className="bot-name">{lang === "ar" ? b.displayNameAr : b.displayNameEn}</h3>
              <p className="bot-user">{b.username}</p>
              <dl className="bot-stats">
                <div><dt>{lang === "ar" ? "مشتركون" : "Subscribers"}</dt><dd>{b.subscribersCount.toLocaleString()}</dd></div>
                <div><dt>{lang === "ar" ? "رسائل اليوم" : "Messages today"}</dt><dd>{b.messagesToday}</dd></div>
                <div><dt>{lang === "ar" ? "الأوامر" : "Commands"}</dt><dd>{b.commandsCount}</dd></div>
                <div><dt>{lang === "ar" ? "الجاهزية" : "Uptime"}</dt><dd>{Math.round(b.uptimeHours / 24)}d</dd></div>
              </dl>
              {b.lastErrorAt && (
                <div className="bot-error"><span className="bot-err-icon">!</span>{lang === "ar" ? b.lastErrorAr : b.lastErrorEn}</div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="messages-section">
        <h2 className="section-h">{messagesLabel}</h2>
        <div className="msg-list">
          {messages.map((m) => (
            <article key={m.id} className={"msg-item msg-" + m.direction}>
              <span className={"dir-chip dir-" + m.direction}>{m.direction === "in" ? inLabel : outLabel}</span>
              <span className="msg-text">{lang === "ar" ? m.textAr : m.textEn}</span>
              <span className="msg-recipient">{m.recipientId}</span>
              <span className={"msg-status ms-" + m.status}>{msgStatus[m.status]}</span>
              <span className="msg-time">{m.at.slice(11, 16)}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
