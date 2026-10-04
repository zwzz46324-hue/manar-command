import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "ar" | "en";

type NavGroup = { label: string; items: string[] };

type Dict = {
  brandAr: string; brandEn: string; searchPlaceholder: string;
  stateOnline: string; stateSecure: string; owner: string;
  railTitle: string; railState: string; railEmpty: string;
  dockCreate: string; dockSearch: string; dockAi: string; dockReview: string;
  demoBadge: string; pageEyebrow: string; pageTitle: string; pageSub: string;
  attentionTitle: string; attentionReviewItem: string; attentionReviewDesc: string;
  attentionReviewState: string; attentionFailItem: string; attentionFailDesc: string;
  attentionFailState: string;
  activityTitle: string; activity1: string; activity2: string; activity3: string; activity4: string;
  langButton: string; nav: NavGroup[];
};

const reviewLabelsAr = { queue: "طابور المراجعة", theater: "مسرح المراجعة", pending: "معلق", inReview: "قيد المراجعة", needsChanges: "يحتاج تعديل", approved: "معتمد", rejected: "مرفوض", approve: "اعتماد", reject: "رفض", requestChanges: "طلب تعديل", returnToEditing: "إرجاع للتحرير", priority: "الأولوية", normal: "عادية", high: "عالية", urgent: "عاجلة", source: "المصدر", transcript: "النص الأصلي", summary: "الملخص", versions: "الإصدارات", decisions: "القرارات", reason: "السبب", empty: "لا توجد ملخصات معلقة.", emptyDecisions: "لا توجد قرارات سابقة." };

const navAr: NavGroup[] = [
  { label: "القيادة", items: ["القيادة", "الانتباه", "النشاط"] },
  { label: "الأكاديمي", items: ["الكون الأكاديمي", "المقررات"] },
  { label: "المحتوى", items: ["الكون المحتوى", "خط أنابيب المحتوى", "الملخصات"] },
  { label: "المراجعة", items: ["طابور المراجعة", "مسرح المراجعة"] },
  { label: "المستندات", items: ["استوديو المستندات"] },
  { label: "الأشخاص", items: ["المستخدمون", "الصلاحيات"] },
  { label: "البوتات", items: ["تلجرام", "واتساب"] },
  { label: "الذكاء الاصطناعي", items: ["مشغّل الذكاء", "المزوّدون", "المهام"] },
  { label: "التخزين", items: ["خزنة البيانات", "النسخ الاحتياطي"] },
  { label: "الأمن", items: ["مركز الأمن"] },
  { label: "التدقيق", items: ["سجل الحقيقة"] },
  { label: "التشغيل", items: ["صحة النظام", "المهام"] },
  { label: "الكود", items: ["مركز الكود"] },
  { label: "الإعدادات", items: ["الإعدادات"] },
];

const navEn: NavGroup[] = [
  { label: "COMMAND", items: ["Command", "Attention", "Activity"] },
  { label: "ACADEMIC", items: ["Academic Universe", "Courses"] },
  { label: "CONTENT", items: ["Content Universe", "Pipeline", "Summaries"] },
  { label: "REVIEW", items: ["Review Queue", "Review Theater"] },
  { label: "DOCUMENTS", items: ["Document Studio"] },
  { label: "PEOPLE", items: ["Users", "Permissions"] },
  { label: "BOTS", items: ["Telegram", "WhatsApp"] },
  { label: "AI", items: ["AI Operator", "Providers", "Jobs"] },
  { label: "STORAGE", items: ["Data Vault", "Backups"] },
  { label: "SECURITY", items: ["Security Center"] },
  { label: "AUDIT", items: ["Truth Log"] },
  { label: "OPERATIONS", items: ["System Health", "Jobs"] },
  { label: "CODE", items: ["Code Center"] },
  { label: "SETTINGS", items: ["Settings"] },
];

const ar: Dict = {
  brandAr: "منار البيانات",
  brandEn: "MANAR DATA",
  searchPlaceholder: "بحث شامل…",
  stateOnline: "متصل",
  stateSecure: "آمن",
  owner: "المالك",
  railTitle: "شريط الاستخبارات",
  railState: "خامل",
  railEmpty: "اختر عنصرًا لعرض تفاصيله هنا.",
  dockCreate: "إنشاء",
  dockSearch: "بحث",
  dockAi: "أمر AI",
  dockReview: "مراجعة",
  demoBadge: "بيانات تجريبية",
  pageEyebrow: "منار البيانات — مركز التحكم",
  pageTitle: "القيادة",
  pageSub: "مركز التحكم في منظومة منار البيانات",
  attentionTitle: "حقل الانتباه",
  attentionReviewItem: "ملخص بانتظار الاعتماد",
  attentionReviewDesc: "هياكل البيانات — المراجعة مطلوبة",
  attentionReviewState: "مراجعة",
  attentionFailItem: "مهمة AI فشلت",
  attentionFailDesc: "مهمة تفريغ صوتي #A-1042 — يحتاج إعادة محاولة",
  attentionFailState: "إعادة",
  activityTitle: "نهر النشاط",
  activity1: "تم اعتماد ملخص",
  activity2: "تم إنشاء PDF",
  activity3: "تم النشر عبر تلجرام",
  activity4: "اكتمل النسخ الاحتياطي",
  langButton: "EN",
  nav: navAr,
};

const en: Dict = {
  brandAr: "منار البيانات",
  brandEn: "MANAR DATA",
  searchPlaceholder: "Global search…",
  stateOnline: "ONLINE",
  stateSecure: "SECURE",
  owner: "Owner",
  railTitle: "Intelligence Rail",
  railState: "IDLE",
  railEmpty: "Select an object to inspect its details here.",
  dockCreate: "Create",
  dockSearch: "Search",
  dockAi: "AI Command",
  dockReview: "Review",
  demoBadge: "DEMO DATA",
  pageEyebrow: "MANAR DATA — CONTROL PLANE",
  pageTitle: "COMMAND",
  pageSub: "Control center of the MANAR DATA ecosystem",
  attentionTitle: "ATTENTION FIELD",
  attentionReviewItem: "Summary awaiting approval",
  attentionReviewDesc: "Data Structures — review required",
  attentionReviewState: "REVIEW",
  attentionFailItem: "AI job failed",
  attentionFailDesc: "Transcription Job #A-1042 — retry needed",
  attentionFailState: "RETRY",
  activityTitle: "ACTIVITY RIVER",
  activity1: "Summary approved",
  activity2: "PDF generated",
  activity3: "Published via Telegram",
  activity4: "Backup completed",
  langButton: "ع",
  nav: navEn,
};

const dictionaries: Record<Lang, Dict> = { ar, en };

type LanguageContextValue = {
  lang: Lang; dir: "rtl" | "ltr"; t: Dict;
  toggle: () => void; setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "manar.lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "ar";
  });
  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === "ar" ? "en" : "ar"));
  return (
    <LanguageContext.Provider value={{ lang, dir, t: dictionaries[lang], toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
