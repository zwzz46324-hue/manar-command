import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import "./ManarClock.css";

export function ManarClock() {
  const { lang } = useLang();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const locale = lang === "ar" ? "ar-EG" : "en-US";
  const time = now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const gregorian = now.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat(lang === "ar" ? "ar-SA-u-ca-islamic" : "en-US-u-ca-islamic", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(now);
  } catch {
    hijri = "";
  }

  return (
    <div className="manar-clock" aria-label="System time">
      <span className="clock-time">{time}</span>
      <span className="clock-dates">
        <span className="clock-gregorian">{gregorian}</span>
        {hijri && <span className="clock-sep">·</span>}
        {hijri && <span className="clock-hijri">{hijri}</span>}
      </span>
    </div>
  );
}
