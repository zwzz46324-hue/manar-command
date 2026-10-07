
import type { ActivityEvent, AttentionItem, Course, University, College, Department } from "../../domain/types";

export const mockAttention: AttentionItem[] = [
  { id: "att-1", titleAr: "ملخص بانتظار الاعتماد", titleEn: "Summary awaiting approval", descAr: "هياكل البيانات — المراجعة مطلوبة", descEn: "Data Structures — review required", stateAr: "مراجعة", stateEn: "REVIEW", severity: "info", kind: "review" },
  { id: "att-2", titleAr: "مهمة AI فشلت", titleEn: "AI job failed", descAr: "مهمة تفريغ صوتي #A-1042 — يحتاج إعادة محاولة", descEn: "Transcription Job #A-1042 — retry needed", stateAr: "إعادة", stateEn: "RETRY", severity: "warn", kind: "ai-job" },
];

export const mockActivity: ActivityEvent[] = [
  { id: "ev-1", time: "09:41", actor: "owner", actionAr: "اعتماد ملخص", actionEn: "approve-summary", objectAr: "هياكل البيانات", objectEn: "Data Structures", result: "success" },
  { id: "ev-2", time: "09:43", actor: "system", actionAr: "إنشاء PDF", actionEn: "generate-pdf", objectAr: "الملخص S-221", objectEn: "Summary #S-221", result: "success" },
  { id: "ev-3", time: "09:45", actor: "bot-telegram", actionAr: "نشر", actionEn: "publish", objectAr: "مقرر الخوارزميات", objectEn: "Course: Algorithms", result: "success" },
  { id: "ev-4", time: "09:51", actor: "system", actionAr: "اكتمال النسخ الاحتياطي", actionEn: "backup-complete", objectAr: "لقطة قاعدة البيانات", objectEn: "DB snapshot", result: "info" },
];

export const mockUniversities: University[] = [
  { id: "u-01", code: "SANA",   nameAr: "جامعة صنعاء",                nameEn: "Sanaa University",              archived: false },
  { id: "u-02", code: "ADEN",   nameAr: "جامعة عدن",                   nameEn: "Aden University",               archived: false },
  { id: "u-03", code: "TAIZ",   nameAr: "جامعة تعز",                   nameEn: "Taiz University",               archived: false },
  { id: "u-04", code: "HODE",   nameAr: "جامعة الحديدة",               nameEn: "Hodeidah University",           archived: false },
  { id: "u-05", code: "IBB",    nameAr: "جامعة إب",                    nameEn: "Ibb University",                archived: false },
  { id: "u-06", code: "HAJJ",   nameAr: "جامعة حجة",                   nameEn: "Hajjah University",             archived: false },
  { id: "u-07", code: "DHAM",   nameAr: "جامعة ذمار",                  nameEn: "Dhamar University",             archived: false },
  { id: "u-08", code: "SAAD",   nameAr: "جامعة صعدة",                  nameEn: "Saadah University",             archived: false },
  { id: "u-09", code: "AMRAN",  nameAr: "جامعة عمران",                 nameEn: "Amran University",              archived: false },
  { id: "u-10", code: "MARIB",  nameAr: "جامعة مأرب",                  nameEn: "Marib University",              archived: false },
  { id: "u-11", code: "JAWF",   nameAr: "جامعة الجوف",                 nameEn: "Al-Jawf University",            archived: false },
  { id: "u-12", code: "HADR",   nameAr: "جامعة حضرموت",                nameEn: "Hadramout University",          archived: false },
  { id: "u-13", code: "ABYN",   nameAr: "جامعة أبين",                  nameEn: "Abyan University",              archived: false },
  { id: "u-14", code: "LAHJ",   nameAr: "جامعة لحج",                   nameEn: "Lahj University",               archived: false },
  { id: "u-15", code: "BAYDA",  nameAr: "جامعة البيضاء",               nameEn: "Al-Bayda University",           archived: false },
  { id: "u-16", code: "MAHW",   nameAr: "جامعة المحويت",               nameEn: "Al-Mahwit University",          archived: false },
  { id: "u-17", code: "RAYM",   nameAr: "جامعة ريمة",                  nameEn: "Raymah University",             archived: false },
  { id: "u-18", code: "SOCOT",  nameAr: "جامعة أرخبيل سقطرى",          nameEn: "Socotra University",            archived: false },
  { id: "u-19", code: "SHABW",  nameAr: "جامعة شبوة",                  nameEn: "Shabwah University",            archived: false },
  { id: "u-20", code: "MAHRA",  nameAr: "جامعة المهرة",                nameEn: "Al-Mahrah University",          archived: false },
  { id: "u-21", code: "UST",    nameAr: "جامعة العلوم والتكنولوجيا",   nameEn: "University of Science & Tech",  archived: false },
  { id: "u-22", code: "IUL",    nameAr: "جامعة الإيمان",               nameEn: "Al-Iman University",            archived: false },
  { id: "u-23", code: "QUB",    nameAr: "جامعة القرآن الكريم",          nameEn: "Quran University",              archived: false },
  { id: "u-24", code: "AZAL",   nameAr: "جامعة آزال",                  nameEn: "Azal University",               archived: false },
  { id: "u-25", code: "YUL",    nameAr: "جامعة اليمن",                 nameEn: "Yemen University",              archived: false },
  { id: "u-26", code: "LCU",    nameAr: "جامعة العلوم الحديثة",         nameEn: "Modern Sciences University",    archived: false },
  { id: "u-27", code: "RGY",    nameAr: "جامعة الرازي",                nameEn: "Al-Razi University",            archived: false },
  { id: "u-28", code: "GULF",   nameAr: "جامعة الخليج",                nameEn: "Gulf University",               archived: false },
  { id: "u-29", code: "UNIAD",  nameAr: "جامعة عدن الأهلية",           nameEn: "Aden Private University",       archived: false },
  { id: "u-30", code: "ALWAT",  nameAr: "جامعة الوادي",                nameEn: "Al-Wadi University",            archived: false },
  { id: "u-31", code: "SALAM",  nameAr: "جامعة السلام",                nameEn: "Al-Salam University",           archived: false },
  { id: "u-32", code: "NAL",    nameAr: "جامعة الناصر",                nameEn: "Al-Nasser University",          archived: false },
  { id: "u-33", code: "HADH",   nameAr: "جامعة حضرموت الأهلية",         nameEn: "Hadramout Private University",  archived: false },
  { id: "u-34", code: "AUL",    nameAr: "جامعة الأندلس",               nameEn: "Andalus University",            archived: false },
];

const commonColleges = ["CS", "MED", "ENG", "EDU", "APP", "LAW", "BUS"];
const collegeNames: Record<string, { ar: string; en: string }> = {
  CS:  { ar: "كلية الحاسوب وتقنية المعلومات", en: "Faculty of Computing & IT" },
  MED: { ar: "كلية الطب",                    en: "Faculty of Medicine" },
  ENG: { ar: "كلية الهندسة",                 en: "Faculty of Engineering" },
  EDU: { ar: "كلية التربية",                 en: "Faculty of Education" },
  APP: { ar: "كلية العلوم التطبيقية",        en: "Faculty of Applied Sciences" },
  LAW: { ar: "كلية الحقوق",                  en: "Faculty of Law" },
  BUS: { ar: "كلية العلوم الإدارية",         en: "Faculty of Business" },
};

export const mockColleges: College[] = [];
mockUniversities.forEach((u) => {
  commonColleges.forEach((code) => {
    mockColleges.push({ id: "col-" + u.code + "-" + code, universityId: u.id, code: code, nameAr: collegeNames[code].ar, nameEn: collegeNames[code].en, archived: false });
  });
});

export const mockDepartments: Department[] = [];
mockColleges.forEach((c) => {
  const deps = c.code === "CS"
    ? [{ code: "CS", ar: "علوم الحاسوب", en: "Computer Science" }, { code: "IT", ar: "تقنية المعلومات", en: "Information Technology" }, { code: "SE", ar: "هندسة البرمجيات", en: "Software Engineering" }]
    : c.code === "MED"
    ? [{ code: "MED", ar: "الطب العام", en: "General Medicine" }, { code: "SUR", ar: "الجراحة", en: "Surgery" }]
    : c.code === "ENG"
    ? [{ code: "CIV", ar: "الهندسة المدنية", en: "Civil Engineering" }, { code: "ELE", ar: "الهندسة الكهربائية", en: "Electrical Engineering" }]
    : c.code === "EDU"
    ? [{ code: "EDU", ar: "أصول التربية", en: "Education Foundations" }, { code: "PSY", ar: "علم النفس", en: "Psychology" }]
    : c.code === "APP"
    ? [{ code: "PHY", ar: "الفيزياء", en: "Physics" }, { code: "CHM", ar: "الكيمياء", en: "Chemistry" }, { code: "BIO", ar: "الأحياء", en: "Biology" }]
    : c.code === "BUS"
    ? [{ code: "ACC", ar: "المحاسبة", en: "Accounting" }, { code: "MGT", ar: "إدارة الأعمال", en: "Business Administration" }, { code: "MKT", ar: "التسويق", en: "Marketing" }, { code: "FIN", ar: "التمويل والمصرفية", en: "Finance & Banking" }, { code: "MIS", ar: "نظم المعلومات الإدارية", en: "Management Information Systems" }, { code: "DSIT", ar: "علوم البيانات وتكنولوجيا المعلومات", en: "Data Science & IT" }]
    : [{ code: "LAW", ar: "القانون", en: "Law" }, { code: "PRI", ar: "القانون الخاص", en: "Private Law" }];
  deps.forEach((d) => {
    mockDepartments.push({ id: "dep-" + c.id + "-" + d.code, collegeId: c.id, code: d.code, nameAr: d.ar, nameEn: d.en, archived: false });
  });
});

const courseTitlesByDep: Record<string, Array<{ ar: string; en: string }>> = {
  CS: [
    { ar: "مقدمة في البرمجة", en: "Introduction to Programming" },
    { ar: "هياكل البيانات", en: "Data Structures" },
    { ar: "الخوارزميات", en: "Algorithms" },
    { ar: "نظرية الحوسبة", en: "Theory of Computation" },
  ],
  IT: [
    { ar: "أساسيات تقنية المعلومات", en: "IT Fundamentals" },
    { ar: "قواعد البيانات", en: "Databases" },
    { ar: "شبكات الحاسوب", en: "Computer Networks" },
    { ar: "أمن المعلومات", en: "Information Security" },
  ],
  SE: [
    { ar: "هندسة البرمجيات", en: "Software Engineering" },
    { ar: "تحليل وتصميم النظم", en: "Systems Analysis & Design" },
    { ar: "إدارة المشاريع البرمجية", en: "Software Project Management" },
  ],
  MED: [
    { ar: "علم التشريح", en: "Anatomy" },
    { ar: "علم وظائف الأعضاء", en: "Physiology" },
    { ar: "علم الأدوية", en: "Pharmacology" },
    { ar: "علم الأمراض", en: "Pathology" },
  ],
  SUR: [
    { ar: "الجراحة العامة", en: "General Surgery" },
    { ar: "جراحة العظام", en: "Orthopedic Surgery" },
    { ar: "جراحة القلب والصدر", en: "Cardiothoracic Surgery" },
  ],
  CIV: [
    { ar: "مقاومة المواد", en: "Mechanics of Materials" },
    { ar: "التحليل الإنشائي", en: "Structural Analysis" },
    { ar: "الخرسانة المسلحة", en: "Reinforced Concrete" },
  ],
  ELE: [
    { ar: "الدوائر الكهربائية", en: "Electric Circuits" },
    { ar: "الآلات الكهربائية", en: "Electrical Machines" },
    { ar: "أنظمة القوى", en: "Power Systems" },
  ],
  EDU: [
    { ar: "علم النفس التربوي", en: "Educational Psychology" },
    { ar: "مناهج وطرق تدريس", en: "Curriculum & Methods" },
  ],
  PSY: [
    { ar: "علم النفس العام", en: "General Psychology" },
    { ar: "علم النفس النمو", en: "Developmental Psychology" },
    { ar: "علم النفس الإكلينيكي", en: "Clinical Psychology" },
  ],
  PHY: [
    { ar: "الفيزياء العامة", en: "General Physics" },
    { ar: "الميكانيكا", en: "Mechanics" },
    { ar: "الكهرباء والمغناطيسية", en: "Electricity & Magnetism" },
  ],
  CHM: [
    { ar: "الكيمياء العامة", en: "General Chemistry" },
    { ar: "الكيمياء العضوية", en: "Organic Chemistry" },
    { ar: "الكيمياء التحليلية", en: "Analytical Chemistry" },
  ],
  BIO: [
    { ar: "الأحياء العامة", en: "General Biology" },
    { ar: "علم الخلية", en: "Cell Biology" },
    { ar: "علم الوراثة", en: "Genetics" },
  ],
  LAW: [
    { ar: "القانون الدستوري", en: "Constitutional Law" },
    { ar: "القانون المدني", en: "Civil Law" },
    { ar: "القانون الجنائي", en: "Criminal Law" },
  ],
  PRI: [
    { ar: "القانون التجاري", en: "Commercial Law" },
    { ar: "قانون العمل", en: "Labor Law" },
    { ar: "القانون الدولي الخاص", en: "Private International Law" },
  ],
  ACC: [
    { ar: "مبادئ المحاسبة", en: "Principles of Accounting" },
    { ar: "المحاسبة المتوسطة", en: "Intermediate Accounting" },
    { ar: "محاسبة التكاليف", en: "Cost Accounting" },
    { ar: "المحاسبة الإدارية", en: "Managerial Accounting" },
  ],
  MGT: [
    { ar: "مبادئ الإدارة", en: "Principles of Management" },
    { ar: "إدارة الموارد البشرية", en: "Human Resource Management" },
    { ar: "الإدارة الاستراتيجية", en: "Strategic Management" },
  ],
  MKT: [
    { ar: "مبادئ التسويق", en: "Principles of Marketing" },
    { ar: "سلوك المستهلك", en: "Consumer Behavior" },
    { ar: "التسويق الإلكتروني", en: "Digital Marketing" },
  ],
  FIN: [
    { ar: "الإدارة المالية", en: "Financial Management" },
    { ar: "التمويل والمصرفية", en: "Finance & Banking" },
    { ar: "الأسواق المالية", en: "Financial Markets" },
  ],
  MIS: [
    { ar: "نظم المعلومات الإدارية", en: "Management Information Systems" },
    { ar: "تحليل النظم", en: "Systems Analysis" },
    { ar: "قواعد البيانات الإدارية", en: "Managerial Databases" },
  ],
  DSIT: [
    { ar: "مقدمة في علوم البيانات", en: "Introduction to Data Science" },
    { ar: "تحليل البيانات", en: "Data Analysis" },
    { ar: "قواعد البيانات", en: "Databases" },
    { ar: "تعلم الآلة", en: "Machine Learning" },
    { ar: "تصور البيانات", en: "Data Visualization" },
    { ar: "البيانات الضخمة", en: "Big Data" },
    { ar: "أمن المعلومات", en: "Information Security" },
    { ar: "البرمجة بلغة Python", en: "Python Programming" },
    { ar: "تحليل الأعمال", en: "Business Analytics" },
  ],
};

export const mockCourses: Course[] = [];
mockDepartments.forEach((d) => {
  const titles = courseTitlesByDep[d.code] || [];
  const col = mockColleges.find((c) => c.id === d.collegeId);
  const uni = col ? mockUniversities.find((u) => u.id === col.universityId) : undefined;
  titles.forEach((t, i) => {
    mockCourses.push({
      id: "crs-" + d.id + "-" + (i + 1),
      code: d.code + (i + 1) * 101,
      titleAr: t.ar,
      titleEn: t.en,
      departmentCode: d.code,
      path: {
        university: uni ? uni.nameEn : "",
        college: col ? col.nameEn : "",
        department: d.nameEn,
        level: "Level " + ((i % 4) + 1),
        semester: "Semester " + ((i % 2) + 1),
      },
      contentCount: 10 + ((i * 7) % 40),
      summaryCount: 2 + (i % 8),
      pendingReview: i % 4,
      createdAt: "2026-0" + ((i % 9) + 1) + "-1" + ((i % 9) + 1),
    });
  });
});

import type { Summary, Decision } from "../../domain/types";

export const mockSummaries: Summary[] = [
  {
    id: "sum-1",
    courseId: "crs-cs101",
    courseCode: "CS101",
    courseTitleAr: "مقدمة في البرمجة",
    courseTitleEn: "Introduction to Programming",
    titleAr: "المحاضرة الأولى — مقدمة المفاهيم",
    titleEn: "Lecture 1 — Concepts Introduction",
    sourceType: "audio",
    sourceDurationMin: 48,
    transcriptAr: "في محاضرة اليوم سنتناول مقدمة عن البرمجة...\nأولًا: تعريف البرمجة...\nثانيًا: لغات البرمجة..." ,
    summaryAr: "ملخص المحاضرة الأولى يعرض تعريف البرمجة، وأنواع لغات البرمجة، وأمثلة عملية.",
    status: "pending",
    authorId: "user-1",
    version: 1,
    createdAt: "2026-10-01",
    updatedAt: "2026-10-01",
    priority: "high",
  },
  {
    id: "sum-2",
    courseId: "crs-cs202",
    courseCode: "CS202",
    courseTitleAr: "هياكل البيانات",
    courseTitleEn: "Data Structures",
    titleAr: "المحاضرة الرابعة — القوائم المترابطة",
    titleEn: "Lecture 4 — Linked Lists",
    sourceType: "video",
    sourceDurationMin: 62,
    transcriptAr: "نتناول اليوم القوائم المترابطة بأنواعها..." ,
    summaryAr: "شرح القوائم المترابطة، أنواعها، عمليات الإدراج والحذف.",
    status: "in-review",
    authorId: "user-2",
    reviewerId: "user-9",
    version: 2,
    createdAt: "2026-09-28",
    updatedAt: "2026-10-02",
    priority: "normal",
  },
  {
    id: "sum-3",
    courseId: "crs-med101",
    courseCode: "MED101",
    courseTitleAr: "علم التشريح",
    courseTitleEn: "Anatomy",
    titleAr: "المحاضرة الثانية — الهيكل العظمي",
    titleEn: "Lecture 2 — Skeletal System",
    sourceType: "slides",
    sourceDurationMin: 0,
    transcriptAr: "الهيكل العظمي يتكون من 206 عظمة..." ,
    summaryAr: "مكونات الهيكل العظمي، وظائفه، وأهميته في الجسم.",
    status: "needs-changes",
    authorId: "user-3",
    reviewerId: "user-9",
    version: 3,
    createdAt: "2026-09-25",
    updatedAt: "2026-10-03",
    priority: "urgent",
  },
];

export const mockDecisions: Decision[] = [
  {
    id: "dec-1",
    summaryId: "sum-2",
    decision: "request-changes",
    actorId: "user-9",
    reasonAr: "يحتاج تفصيلًا أكثر في قسم الحذف.",
    reasonEn: "Needs more detail in the deletion section.",
    createdAt: "2026-10-02",
  },
];

import type { ManarDocument } from "../../domain/types";

export const mockDocuments: ManarDocument[] = [
  {
    id: "doc-1",
    summaryId: "sum-2",
    courseCode: "CS202",
    titleAr: "هياكل البيانات — القوائم المترابطة",
    titleEn: "Data Structures — Linked Lists",
    status: "ready",
    version: 2,
    pagesCount: 24,
    sizeKb: 1820,
    hasWatermark: true,
    isProtected: true,
    createdAt: "2026-10-02",
    updatedAt: "2026-10-03",
    publishedChannels: [],
  },
  {
    id: "doc-2",
    summaryId: "sum-1",
    courseCode: "CS101",
    titleAr: "مقدمة في البرمجة — المفاهيم الأساسية",
    titleEn: "Intro to Programming — Core Concepts",
    status: "generating-pdf",
    version: 1,
    pagesCount: 0,
    sizeKb: 0,
    hasWatermark: true,
    isProtected: false,
    createdAt: "2026-10-04",
    updatedAt: "2026-10-04",
    publishedChannels: [],
  },
  {
    id: "doc-3",
    summaryId: "sum-3",
    courseCode: "MED101",
    titleAr: "علم التشريح — الهيكل العظمي",
    titleEn: "Anatomy — Skeletal System",
    status: "published",
    version: 3,
    pagesCount: 36,
    sizeKb: 2450,
    hasWatermark: true,
    isProtected: true,
    createdAt: "2026-09-28",
    updatedAt: "2026-10-01",
    publishedChannels: ["telegram", "site"],
  },
];
import type { TruthEvent } from "../../domain/types";

export const mockTruthEvents: TruthEvent[] = [
  { id: "t-1", kind: "review", actorId: "user-9", actorRole: "SUPERVISOR", actionAr: "اعتمد الملخص", actionEn: "Approved summary", targetType: "summary", targetId: "sum-1", result: "success", traceId: "tr-a1b2c3", source: "ui", at: "2026-10-04T09:41:00" },
  { id: "t-2", kind: "document", actorId: "system", actorRole: "SYSTEM", actionAr: "أنشأ PDF", actionEn: "Generated PDF", targetType: "document", targetId: "doc-2", result: "success", traceId: "tr-d4e5f6", source: "system", at: "2026-10-04T09:43:00" },
  { id: "t-3", kind: "publish", actorId: "bot-telegram", actorRole: "BOT", actionAr: "نشر على تلجرام", actionEn: "Published to Telegram", targetType: "document", targetId: "doc-3", result: "success", traceId: "tr-g7h8i9", source: "bot", at: "2026-10-04T09:45:00" },
  { id: "t-4", kind: "auth", actorId: "user-5", actorRole: "SUMMARIZER", actionAr: "تسجيل دخول", actionEn: "Signed in", targetType: "session", targetId: "sess-921", result: "success", traceId: "tr-j1k2l3", source: "ui", at: "2026-10-04T08:12:00" },
  { id: "t-5", kind: "security", actorId: "user-7", actorRole: "UNKNOWN", actionAr: "فشل تسجيل الدخول", actionEn: "Failed sign in", targetType: "session", targetId: "sess-918", result: "failure", traceId: "tr-m4n5o6", source: "ui", at: "2026-10-04T07:58:00" },
  { id: "t-6", kind: "ai", actorId: "ai-gemini", actorRole: "AI", actionAr: "أنتج ملخصًا", actionEn: "Produced summary", targetType: "summary", targetId: "sum-3", result: "success", traceId: "tr-p7q8r9", source: "ai", at: "2026-10-04T07:41:00" },
  { id: "t-7", kind: "backup", actorId: "system", actorRole: "SYSTEM", actionAr: "أنشأ نسخة احتياطية", actionEn: "Created backup", targetType: "backup", targetId: "bk-2026-10-04", result: "success", traceId: "tr-s1t2u3", source: "system", at: "2026-10-04T03:00:00" },
  { id: "t-8", kind: "permission", actorId: "user-1", actorRole: "OWNER", actionAr: "غيّر صلاحية", actionEn: "Changed permission", targetType: "role", targetId: "SUPERVISOR", before: "read", after: "write", result: "success", traceId: "tr-v4w5x6", source: "ui", at: "2026-10-03T22:15:00" },
  { id: "t-9", kind: "config", actorId: "user-1", actorRole: "OWNER", actionAr: "فعّل ميزة", actionEn: "Enabled feature", targetType: "feature-flag", targetId: "new-summary-editor", before: "off", after: "on", result: "success", traceId: "tr-y7z8a9", source: "ui", at: "2026-10-03T21:00:00" },
  { id: "t-10", kind: "course", actorId: "user-1", actorRole: "OWNER", actionAr: "أنشأ مقررًا", actionEn: "Created course", targetType: "course", targetId: "crs-new-1", result: "success", traceId: "tr-b1c2d3", source: "ui", at: "2026-10-03T20:42:00" },
];

import type { SecurityEvent, ActiveSession } from "../../domain/types";

export const mockSecurityEvents: SecurityEvent[] = [
  { id: "sec-1", type: "login-success", actorId: "user-1", ipAddress: "192.168.1.42", userAgent: "Chrome 131 / Windows", location: "صنعاء، اليمن", at: "2026-10-04T08:00:00", riskLevel: "low" },
  { id: "sec-2", type: "login-failure", actorId: "unknown", ipAddress: "45.132.18.7", userAgent: "curl/8.0", location: "مجهول", at: "2026-10-04T07:58:00", riskLevel: "high" },
  { id: "sec-3", type: "suspicious-activity", actorId: "user-7", ipAddress: "45.132.18.7", userAgent: "curl/8.0", location: "مجهول", at: "2026-10-04T07:57:00", riskLevel: "critical" },
  { id: "sec-4", type: "permission-denied", actorId: "user-5", ipAddress: "192.168.1.55", userAgent: "Safari / macOS", location: "عدن، اليمن", at: "2026-10-04T06:22:00", riskLevel: "medium" },
  { id: "sec-5", type: "session-expired", actorId: "user-3", ipAddress: "192.168.1.60", userAgent: "Firefox / Linux", location: "تعز، اليمن", at: "2026-10-04T05:15:00", riskLevel: "low" },
  { id: "sec-6", type: "secret-rotated", actorId: "user-1", ipAddress: "192.168.1.42", userAgent: "Chrome 131 / Windows", location: "صنعاء، اليمن", at: "2026-10-03T23:42:00", riskLevel: "low" },
  { id: "sec-7", type: "ip-blocked", actorId: "system", ipAddress: "45.132.18.7", userAgent: "system", location: "مجهول", at: "2026-10-03T23:10:00", riskLevel: "high" },
  { id: "sec-8", type: "logout", actorId: "user-5", ipAddress: "192.168.1.55", userAgent: "Safari / macOS", location: "عدن، اليمن", at: "2026-10-03T22:40:00", riskLevel: "low" },
];

export const mockSessions: ActiveSession[] = [
  { id: "sess-1", userId: "user-1", device: "Chrome 131 / Windows", ipAddress: "192.168.1.42", location: "صنعاء، اليمن", startedAt: "2026-10-04T08:00:00", lastSeenAt: "2026-10-04T09:45:00", current: true },
  { id: "sess-2", userId: "user-1", device: "Safari / iPhone 15", ipAddress: "192.168.1.50", location: "صنعاء، اليمن", startedAt: "2026-10-03T18:20:00", lastSeenAt: "2026-10-04T07:30:00", current: false },
  { id: "sess-3", userId: "user-5", device: "Safari / macOS", ipAddress: "192.168.1.55", location: "عدن، اليمن", startedAt: "2026-10-04T06:00:00", lastSeenAt: "2026-10-04T06:30:00", current: false },
  { id: "sess-4", userId: "user-9", device: "Firefox / Windows", ipAddress: "192.168.1.72", location: "صنعاء، اليمن", startedAt: "2026-10-04T07:00:00", lastSeenAt: "2026-10-04T09:50:00", current: false },
];

import type { ManarUser, RoleDefinition, Permission } from "../../domain/types";

export const mockUsers: ManarUser[] = [
  { id: "user-1", username: "owner", displayNameAr: "مالك المنظومة", displayNameEn: "System Owner", email: "owner@manardata.com", role: "OWNER", status: "active", scope: "all", lastSeenAt: "2026-10-04T09:50:00", createdAt: "2025-01-01", assignedCourses: 0 },
  { id: "user-2", username: "ahmed.summarizer", displayNameAr: "أحمد الصبري", displayNameEn: "Ahmed Al-Sabri", email: "ahmed@manardata.com", role: "SUMMARIZER", status: "active", scope: "Faculty of Computing & IT", lastSeenAt: "2026-10-04T09:12:00", createdAt: "2025-03-15", assignedCourses: 12 },
  { id: "user-3", username: "fatima.summarizer", displayNameAr: "فاطمة العزي", displayNameEn: "Fatima Al-Ezzi", email: "fatima@manardata.com", role: "SUMMARIZER", status: "active", scope: "Faculty of Medicine", lastSeenAt: "2026-10-04T08:42:00", createdAt: "2025-05-20", assignedCourses: 8 },
  { id: "user-5", username: "khaled.reviewer", displayNameAr: "خالد المقطري", displayNameEn: "Khaled Al-Maqtari", email: "khaled@manardata.com", role: "REVIEWER", status: "active", scope: "Faculty of Computing & IT", lastSeenAt: "2026-10-04T06:30:00", createdAt: "2025-02-10", assignedCourses: 0 },
  { id: "user-7", username: "suspended.user", displayNameAr: "مستخدم موقوف", displayNameEn: "Suspended User", email: "susp@manardata.com", role: "STUDENT", status: "suspended", scope: "none", lastSeenAt: "2026-09-15T11:20:00", createdAt: "2026-08-01", assignedCourses: 0 },
  { id: "user-9", username: "mona.supervisor", displayNameAr: "منى الحكيمي", displayNameEn: "Mona Al-Hakimi", email: "mona@manardata.com", role: "SUPERVISOR", status: "active", scope: "Sanaa University", lastSeenAt: "2026-10-04T09:50:00", createdAt: "2025-01-20", assignedCourses: 0 },
  { id: "user-12", username: "student.ali", displayNameAr: "علي محمد", displayNameEn: "Ali Mohammed", email: "ali@student.manardata.com", role: "STUDENT", status: "active", scope: "Sanaa University", lastSeenAt: "2026-10-04T07:45:00", createdAt: "2026-09-01", assignedCourses: 0 },
  { id: "user-15", username: "pending.user", displayNameAr: "بانتظار التفعيل", displayNameEn: "Pending User", email: "pending@manardata.com", role: "SUMMARIZER", status: "pending", scope: "none", lastSeenAt: "2026-10-01T12:00:00", createdAt: "2026-10-01", assignedCourses: 0 },
];

export const mockRoles: RoleDefinition[] = [
  { name: "OWNER", labelAr: "المالك", labelEn: "Owner", descriptionAr: "تحكم كامل على المنظومة", descriptionEn: "Full control of the ecosystem", userCount: 1, permissions: ["*"], system: true },
  { name: "SUPER_ADMIN", labelAr: "مدير أعلى", labelEn: "Super Admin", descriptionAr: "إدارة تقنية شاملة", descriptionEn: "Comprehensive technical administration", userCount: 0, permissions: ["users.manage", "roles.manage", "config.manage", "audit.read"], system: true },
  { name: "SUPERVISOR", labelAr: "مشرف", labelEn: "Supervisor", descriptionAr: "اعتماد الملخصات والمستندات", descriptionEn: "Approve summaries and documents", userCount: 1, permissions: ["summary.read", "summary.approve", "summary.reject", "document.approve"], system: true },
  { name: "SUMMARIZER", labelAr: "ملخّص", labelEn: "Summarizer", descriptionAr: "إنشاء وتحرير الملخصات", descriptionEn: "Create and edit summaries", userCount: 3, permissions: ["summary.create", "summary.edit", "transcript.edit"], system: true },
  { name: "REVIEWER", labelAr: "مراجع", labelEn: "Reviewer", descriptionAr: "مراجعة الملخصات", descriptionEn: "Review summaries", userCount: 1, permissions: ["summary.read", "summary.review"], system: true },
  { name: "STUDENT", labelAr: "طالب", labelEn: "Student", descriptionAr: "الوصول للمحتوى المنشور", descriptionEn: "Access to published content", userCount: 2, permissions: ["content.read"], system: true },
];

export const mockPermissions: Permission[] = [
  { id: "users.manage", resourceAr: "المستخدمون", resourceEn: "Users", actionAr: "إدارة", actionEn: "Manage", groupAr: "الأشخاص", groupEn: "People" },
  { id: "users.read", resourceAr: "المستخدمون", resourceEn: "Users", actionAr: "قراءة", actionEn: "Read", groupAr: "الأشخاص", groupEn: "People" },
  { id: "roles.manage", resourceAr: "الأدوار", resourceEn: "Roles", actionAr: "إدارة", actionEn: "Manage", groupAr: "الأشخاص", groupEn: "People" },
  { id: "summary.read", resourceAr: "الملخصات", resourceEn: "Summaries", actionAr: "قراءة", actionEn: "Read", groupAr: "الملخصات", groupEn: "Summaries" },
  { id: "summary.create", resourceAr: "الملخصات", resourceEn: "Summaries", actionAr: "إنشاء", actionEn: "Create", groupAr: "الملخصات", groupEn: "Summaries" },
  { id: "summary.edit", resourceAr: "الملخصات", resourceEn: "Summaries", actionAr: "تعديل", actionEn: "Edit", groupAr: "الملخصات", groupEn: "Summaries" },
  { id: "summary.review", resourceAr: "الملخصات", resourceEn: "Summaries", actionAr: "مراجعة", actionEn: "Review", groupAr: "الملخصات", groupEn: "Summaries" },
  { id: "summary.approve", resourceAr: "الملخصات", resourceEn: "Summaries", actionAr: "اعتماد", actionEn: "Approve", groupAr: "الملخصات", groupEn: "Summaries" },
  { id: "summary.reject", resourceAr: "الملخصات", resourceEn: "Summaries", actionAr: "رفض", actionEn: "Reject", groupAr: "الملخصات", groupEn: "Summaries" },
  { id: "transcript.edit", resourceAr: "النص الأصلي", resourceEn: "Transcript", actionAr: "تعديل", actionEn: "Edit", groupAr: "المحتوى", groupEn: "Content" },
  { id: "document.approve", resourceAr: "المستندات", resourceEn: "Documents", actionAr: "اعتماد", actionEn: "Approve", groupAr: "المستندات", groupEn: "Documents" },
  { id: "document.publish", resourceAr: "المستندات", resourceEn: "Documents", actionAr: "نشر", actionEn: "Publish", groupAr: "المستندات", groupEn: "Documents" },
  { id: "content.read", resourceAr: "المحتوى", resourceEn: "Content", actionAr: "قراءة", actionEn: "Read", groupAr: "المحتوى", groupEn: "Content" },
  { id: "config.manage", resourceAr: "الإعدادات", resourceEn: "Config", actionAr: "إدارة", actionEn: "Manage", groupAr: "النظام", groupEn: "System" },
  { id: "audit.read", resourceAr: "سجل الحقيقة", resourceEn: "Truth Log", actionAr: "قراءة", actionEn: "Read", groupAr: "التدقيق", groupEn: "Audit" },
  { id: "security.read", resourceAr: "الأمن", resourceEn: "Security", actionAr: "قراءة", actionEn: "Read", groupAr: "الأمن", groupEn: "Security" },
];

import type { AIProvider, AIJob } from "../../domain/types";

export const mockProviders: AIProvider[] = [
  { id: "p-gemini", name: "Gemini", capabilitiesAr: ["تلخيص", "ترجمة", "تصنيف"], capabilitiesEn: ["Summarization", "Translation", "Classification"], status: "healthy", latencyMs: 820, successRate: 98.4, keyAlias: "gemini-prod-01", keyStatus: "active", keyLastVerifiedAt: "2026-10-04T06:00:00", jobsToday: 142, costTodayUsd: 3.82 },
  { id: "p-openai", name: "OpenAI", capabilitiesAr: ["تلخيص", "ترجمة", "إثراء"], capabilitiesEn: ["Summarization", "Translation", "Enrichment"], status: "healthy", latencyMs: 640, successRate: 99.1, keyAlias: "openai-prod-01", keyStatus: "active", keyLastVerifiedAt: "2026-10-04T06:00:00", jobsToday: 58, costTodayUsd: 4.21 },
  { id: "p-anthropic", name: "Anthropic", capabilitiesAr: ["تحليل طويل"], capabilitiesEn: ["Long context analysis"], status: "degraded", latencyMs: 2400, successRate: 92.5, keyAlias: "anthropic-prod-01", keyStatus: "rotating", keyLastVerifiedAt: "2026-10-03T22:00:00", jobsToday: 3, costTodayUsd: 0.42 },
  { id: "p-whisper", name: "Whisper", capabilitiesAr: ["تفريغ صوتي"], capabilitiesEn: ["Transcription"], status: "healthy", latencyMs: 3200, successRate: 96.8, keyAlias: "whisper-prod-01", keyStatus: "active", keyLastVerifiedAt: "2026-10-04T06:00:00", jobsToday: 27, costTodayUsd: 1.15 },
  { id: "p-local", name: "Local", capabilitiesAr: ["تجارب", "كشف"], capabilitiesEn: ["Experiments", "Detection"], status: "down", latencyMs: 0, successRate: 0, keyAlias: "local-no-key", keyStatus: "disabled", keyLastVerifiedAt: "2026-09-28T12:00:00", jobsToday: 0, costTodayUsd: 0 },
];

export const mockAIJobs: AIJob[] = [
  { id: "job-1", type: "transcription", provider: "Whisper", model: "whisper-large-v3", status: "succeeded", attempt: 1, targetId: "sum-1", createdAt: "2026-10-04T07:30:00", startedAt: "2026-10-04T07:30:05", finishedAt: "2026-10-04T07:32:15", traceId: "tr-w1a2b3" },
  { id: "job-2", type: "summarization", provider: "Gemini", model: "gemini-1.5-pro", status: "succeeded", attempt: 1, targetId: "sum-1", createdAt: "2026-10-04T07:33:00", startedAt: "2026-10-04T07:33:02", finishedAt: "2026-10-04T07:33:28", traceId: "tr-x4y5z6" },
  { id: "job-3", type: "summarization", provider: "Gemini", model: "gemini-1.5-pro", status: "running", attempt: 1, targetId: "sum-2", createdAt: "2026-10-04T09:50:00", startedAt: "2026-10-04T09:50:04", traceId: "tr-a7b8c9" },
  { id: "job-4", type: "ocr", provider: "OpenAI", model: "gpt-4o-vision", status: "succeeded", attempt: 1, targetId: "doc-2", createdAt: "2026-10-04T08:15:00", startedAt: "2026-10-04T08:15:10", finishedAt: "2026-10-04T08:16:02", traceId: "tr-d1e2f3" },
  { id: "job-5", type: "translation", provider: "OpenAI", model: "gpt-4o", status: "failed", attempt: 3, targetId: "sum-3", createdAt: "2026-10-04T06:00:00", startedAt: "2026-10-04T06:01:00", finishedAt: "2026-10-04T06:02:45", errorAr: "انتهت المهلة من المزوّد", errorEn: "Provider timeout", traceId: "tr-g4h5i6" },
  { id: "job-6", type: "document-generation", provider: "Local", model: "manar-docgen-v2", status: "retrying", attempt: 2, targetId: "doc-2", createdAt: "2026-10-04T09:40:00", startedAt: "2026-10-04T09:41:00", errorAr: "قيد إعادة المحاولة", errorEn: "Retry in progress", traceId: "tr-j7k8l9" },
  { id: "job-7", type: "classification", provider: "Gemini", model: "gemini-1.5-flash", status: "succeeded", attempt: 1, targetId: "sum-2", createdAt: "2026-10-04T07:35:00", startedAt: "2026-10-04T07:35:01", finishedAt: "2026-10-04T07:35:08", traceId: "tr-m1n2o3" },
  { id: "job-8", type: "enrichment", provider: "Anthropic", model: "claude-3-5-sonnet", status: "queued", attempt: 0, targetId: "sum-3", createdAt: "2026-10-04T09:55:00", traceId: "tr-p4q5r6" },
  { id: "job-9", type: "transcription", provider: "Whisper", model: "whisper-large-v3", status: "succeeded", attempt: 1, targetId: "sum-2", createdAt: "2026-10-04T05:10:00", startedAt: "2026-10-04T05:10:04", finishedAt: "2026-10-04T05:14:20", traceId: "tr-s7t8u9" },
  { id: "job-10", type: "summarization", provider: "OpenAI", model: "gpt-4o-mini", status: "cancelled", attempt: 1, targetId: "sum-3", createdAt: "2026-10-04T04:00:00", startedAt: "2026-10-04T04:00:02", finishedAt: "2026-10-04T04:00:40", errorAr: "أُلغيت بواسطة المالك", errorEn: "Cancelled by owner", traceId: "tr-v1w2x3" },
];

import type { ManarBot, BotMessage } from "../../domain/types";

export const mockBots: ManarBot[] = [
  { id: "bot-1", channel: "telegram", displayNameAr: "بوت منار على تلجرام", displayNameEn: "MANAR Telegram Bot", username: "@ManarDataBot", status: "connected", uptimeHours: 842, messagesToday: 1240, commandsCount: 24, subscribersCount: 3820 },
  { id: "bot-2", channel: "whatsapp", displayNameAr: "بوت منار على واتساب", displayNameEn: "MANAR WhatsApp Bot", username: "+967-XXX-XXXX", status: "connecting", uptimeHours: 0, messagesToday: 0, commandsCount: 12, subscribersCount: 0, lastErrorAt: "2026-10-04T09:30:00", lastErrorAr: "جارٍ الاتصال بالخدمة", lastErrorEn: "Connecting to service" },
];

export const mockBotMessages: BotMessage[] = [
  { id: "msg-1", channel: "telegram", direction: "out", recipientId: "user-12", textAr: "تم اعتماد ملخص هياكل البيانات", textEn: "Data Structures summary approved", status: "read", at: "2026-10-04T09:41:00" },
  { id: "msg-2", channel: "telegram", direction: "in", recipientId: "user-12", textAr: "/start", textEn: "/start", status: "read", at: "2026-10-04T09:35:00" },
  { id: "msg-3", channel: "telegram", direction: "out", recipientId: "user-15", textAr: "المستند جاهز للتحميل", textEn: "Document ready for download", status: "delivered", at: "2026-10-04T09:20:00" },
  { id: "msg-4", channel: "telegram", direction: "in", recipientId: "user-15", textAr: "شكرًا", textEn: "Thank you", status: "read", at: "2026-10-04T09:21:00" },
  { id: "msg-5", channel: "telegram", direction: "out", recipientId: "user-99", textAr: "نشر جديد: خوارزميات", textEn: "New publication: Algorithms", status: "sent", at: "2026-10-04T09:15:00" },
  { id: "msg-6", channel: "telegram", direction: "out", recipientId: "user-88", textAr: "تنبيه: تحديث مقرر", textEn: "Alert: Course update", status: "failed", at: "2026-10-04T09:10:00" },
  { id: "msg-7", channel: "telegram", direction: "out", recipientId: "user-77", textAr: "ملخص جديد متاح", textEn: "New summary available", status: "queued", at: "2026-10-04T09:05:00" },
  { id: "msg-8", channel: "telegram", direction: "in", recipientId: "user-77", textAr: "/courses", textEn: "/courses", status: "read", at: "2026-10-04T09:06:00" },
];

import type { ServiceHealth, QueueState, Worker, FeatureFlag } from "../../domain/types";

export const mockServices: ServiceHealth[] = [
  { id: "s-backend", kind: "backend", nameAr: "الخادم الخلفي", nameEn: "Backend API", state: "healthy", uptimePct: 99.98, latencyMs: 82, lastCheckedAt: "2026-10-06T09:00:00" },
  { id: "s-db", kind: "database", nameAr: "قاعدة البيانات", nameEn: "Database", state: "healthy", uptimePct: 99.99, latencyMs: 12, lastCheckedAt: "2026-10-06T09:00:00" },
  { id: "s-storage", kind: "storage", nameAr: "التخزين السحابي", nameEn: "Object Storage", state: "healthy", uptimePct: 99.95, latencyMs: 140, lastCheckedAt: "2026-10-06T09:00:00" },
  { id: "s-cache", kind: "cache", nameAr: "الذاكرة المؤقتة", nameEn: "Cache", state: "degraded", uptimePct: 97.2, latencyMs: 380, lastCheckedAt: "2026-10-06T09:00:00", noteAr: "ارتفاع في زمن الاستجابة", noteEn: "Elevated latency" },
  { id: "s-ai-gemini", kind: "ai-provider", nameAr: "مزوّد Gemini", nameEn: "Gemini Provider", state: "healthy", uptimePct: 99.4, latencyMs: 820, lastCheckedAt: "2026-10-06T09:00:00" },
  { id: "s-ai-anthropic", kind: "ai-provider", nameAr: "مزوّد Anthropic", nameEn: "Anthropic Provider", state: "degraded", uptimePct: 92.5, latencyMs: 2400, lastCheckedAt: "2026-10-06T09:00:00", noteAr: "بطء ملحوظ", noteEn: "Slow responses" },
  { id: "s-bot-telegram", kind: "bot", nameAr: "بوت تلجرام", nameEn: "Telegram Bot", state: "healthy", uptimePct: 99.9, latencyMs: 220, lastCheckedAt: "2026-10-06T09:00:00" },
  { id: "s-bot-whatsapp", kind: "bot", nameAr: "بوت واتساب", nameEn: "WhatsApp Bot", state: "failed", uptimePct: 0, latencyMs: 0, lastCheckedAt: "2026-10-06T09:00:00", noteAr: "فشل الاتصال بالخدمة", noteEn: "Service connection failed" },
  { id: "s-integration-payments", kind: "integration", nameAr: "بوابة الدفع", nameEn: "Payments Integration", state: "maintenance", uptimePct: 100, latencyMs: 0, lastCheckedAt: "2026-10-06T09:00:00", noteAr: "صيانة مجدولة", noteEn: "Scheduled maintenance" },
];

export const mockQueues: QueueState[] = [
  { id: "q-transcription", nameAr: "طابور التفريغ الصوتي", nameEn: "Transcription Queue", pending: 12, running: 3, failed: 1, deadLetter: 0, throughputPerMin: 4 },
  { id: "q-summarization", nameAr: "طابور التلخيص", nameEn: "Summarization Queue", pending: 28, running: 6, failed: 2, deadLetter: 1, throughputPerMin: 8 },
  { id: "q-docgen", nameAr: "طابور توليد المستندات", nameEn: "Document Generation Queue", pending: 4, running: 2, failed: 0, deadLetter: 0, throughputPerMin: 3 },
  { id: "q-publish", nameAr: "طابور النشر", nameEn: "Publishing Queue", pending: 9, running: 1, failed: 0, deadLetter: 0, throughputPerMin: 6 },
  { id: "q-notifications", nameAr: "طابور الإشعارات", nameEn: "Notifications Queue", pending: 42, running: 8, failed: 5, deadLetter: 2, throughputPerMin: 22 },
];

export const mockWorkers: Worker[] = [
  { id: "w-1", name: "manar-worker-01", region: "me-central-1", state: "healthy", jobsActive: 5, jobsCompletedToday: 342, cpuPct: 38, memoryPct: 52 },
  { id: "w-2", name: "manar-worker-02", region: "me-central-1", state: "healthy", jobsActive: 3, jobsCompletedToday: 298, cpuPct: 42, memoryPct: 48 },
  { id: "w-3", name: "manar-worker-03", region: "eu-west-1", state: "degraded", jobsActive: 8, jobsCompletedToday: 156, cpuPct: 87, memoryPct: 91, note: "" } as Worker,
  { id: "w-4", name: "manar-worker-04", region: "eu-west-1", state: "maintenance", jobsActive: 0, jobsCompletedToday: 0, cpuPct: 0, memoryPct: 0 },
];

export const mockFeatureFlags: FeatureFlag[] = [
  { id: "ff-1", key: "new-summary-editor", labelAr: "محرّر الملخصات الجديد", labelEn: "New Summary Editor", descriptionAr: "تفعيل المحرر الجديد للملخصات", descriptionEn: "Enable the new summary editor", enabled: true, environment: "production", rolloutPct: 100, updatedAt: "2026-10-03" },
  { id: "ff-2", key: "ai-auto-translate", labelAr: "الترجمة التلقائية", labelEn: "AI Auto Translate", descriptionAr: "ترجمة الملخصات تلقائيًا", descriptionEn: "Auto-translate summaries", enabled: true, environment: "production", rolloutPct: 60, updatedAt: "2026-10-02" },
  { id: "ff-3", key: "whatsapp-channel", labelAr: "قناة واتساب", labelEn: "WhatsApp Channel", descriptionAr: "تفعيل بوت واتساب", descriptionEn: "Enable WhatsApp bot", enabled: false, environment: "staging", rolloutPct: 0, updatedAt: "2026-10-05" },
  { id: "ff-4", key: "document-watermark-v2", labelAr: "العلامة المائية v2", labelEn: "Document Watermark v2", descriptionAr: "نمط جديد للعلامة المائية", descriptionEn: "New watermark style", enabled: true, environment: "production", rolloutPct: 100, updatedAt: "2026-09-28" },
  { id: "ff-5", key: "bulk-approve", labelAr: "الاعتماد الجماعي", labelEn: "Bulk Approve", descriptionAr: "اعتماد عدة ملخصات معًا", descriptionEn: "Approve many summaries at once", enabled: false, environment: "development", rolloutPct: 25, updatedAt: "2026-10-04" },
];

import type { VaultFile } from "../../domain/types";

export const mockVaultFiles: VaultFile[] = [
  { id: "vf-1", nameAr: "محاضرة هياكل البيانات 1.mp3", nameEn: "DS Lecture 1.mp3", kind: "audio", mimeType: "audio/mpeg", sizeKb: 28400, version: 1, ownerId: "user-2", linkedTo: "sum-1", tags: ["lecture", "audio"], checksum: "sha256:a1b2c3", retentionDays: 365, archived: false, createdAt: "2026-09-15", updatedAt: "2026-09-15" },
  { id: "vf-2", nameAr: "محاضرة هياكل البيانات 1.docx", nameEn: "DS Lecture 1.docx", kind: "document", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", sizeKb: 420, version: 2, ownerId: "user-2", linkedTo: "sum-1", tags: ["summary", "docx"], checksum: "sha256:d4e5f6", retentionDays: 1825, archived: false, createdAt: "2026-09-16", updatedAt: "2026-10-02" },
  { id: "vf-3", nameAr: "شرائح الفصل الثالث.pdf", nameEn: "Chapter 3 Slides.pdf", kind: "document", mimeType: "application/pdf", sizeKb: 3840, version: 1, ownerId: "user-3", linkedTo: "crs-med101", tags: ["slides"], checksum: "sha256:g7h8i9", retentionDays: 3650, archived: false, createdAt: "2026-08-20", updatedAt: "2026-08-20" },
  { id: "vf-4", nameAr: "صورة السبورة.jpg", nameEn: "Whiteboard.jpg", kind: "image", mimeType: "image/jpeg", sizeKb: 1820, version: 1, ownerId: "user-2", tags: ["photo"], checksum: "sha256:j1k2l3", retentionDays: 365, archived: false, createdAt: "2026-09-10", updatedAt: "2026-09-10" },
  { id: "vf-5", nameAr: "نسخة احتياطية أسبوعية.zip", nameEn: "Weekly backup.zip", kind: "archive", mimeType: "application/zip", sizeKb: 184000, version: 1, ownerId: "system", tags: ["backup"], checksum: "sha256:m4n5o6", retentionDays: 90, archived: true, createdAt: "2026-09-28", updatedAt: "2026-09-28" },
  { id: "vf-6", nameAr: "فيديو تشريح 1.mp4", nameEn: "Anatomy Video 1.mp4", kind: "video", mimeType: "video/mp4", sizeKb: 128000, version: 1, ownerId: "user-3", linkedTo: "crs-med101", tags: ["lecture", "video"], checksum: "sha256:p7q8r9", retentionDays: 1095, archived: false, createdAt: "2026-09-05", updatedAt: "2026-09-05" },
  { id: "vf-7", nameAr: "ملاحظات المراجعة.txt", nameEn: "Review notes.txt", kind: "document", mimeType: "text/plain", sizeKb: 8, version: 3, ownerId: "user-9", tags: ["notes"], checksum: "sha256:s1t2u3", retentionDays: 365, archived: false, createdAt: "2026-10-01", updatedAt: "2026-10-04" },
  { id: "vf-8", nameAr: "الشعار الرسمي.svg", nameEn: "Official logo.svg", kind: "image", mimeType: "image/svg+xml", sizeKb: 3, version: 1, ownerId: "user-1", tags: ["brand"], checksum: "sha256:v4w5x6", retentionDays: 3650, archived: false, createdAt: "2025-01-01", updatedAt: "2025-01-01" },
];

import type { Backup, RetentionPolicy } from "../../domain/types";

export const mockBackups: Backup[] = [
  { id: "bk-1", kind: "scheduled", status: "completed", sizeMb: 842, integrityOk: true, retentionDays: 30, createdBy: "system", createdAt: "2026-10-06T03:00:00", expiresAt: "2026-11-05" },
  { id: "bk-2", kind: "scheduled", status: "completed", sizeMb: 838, integrityOk: true, retentionDays: 30, createdBy: "system", createdAt: "2026-10-05T03:00:00", expiresAt: "2026-11-04" },
  { id: "bk-3", kind: "manual", status: "completed", sizeMb: 845, integrityOk: true, retentionDays: 90, createdBy: "user-1", createdAt: "2026-10-04T22:15:00", expiresAt: "2027-01-02", noteAr: "قبل تحديث قاعدة البيانات", noteEn: "Before DB migration" },
  { id: "bk-4", kind: "scheduled", status: "completed", sizeMb: 830, integrityOk: true, retentionDays: 30, createdBy: "system", createdAt: "2026-10-04T03:00:00", expiresAt: "2026-11-03" },
  { id: "bk-5", kind: "snapshot", status: "verifying", sizeMb: 850, integrityOk: false, retentionDays: 180, createdBy: "user-1", createdAt: "2026-10-06T08:30:00", expiresAt: "2027-04-04" },
  { id: "bk-6", kind: "incremental", status: "failed", sizeMb: 42, integrityOk: false, retentionDays: 7, createdBy: "system", createdAt: "2026-10-03T03:00:00", expiresAt: "2026-10-10", noteAr: "انقطع الاتصال بالخادم", noteEn: "Lost connection to backend" },
];

export const mockRetentionPolicies: RetentionPolicy[] = [
  { id: "rp-daily", kindAr: "نسخ يومية", kindEn: "Daily backups", retainDays: 30, keepDaily: 30, keepWeekly: 4, keepMonthly: 12 },
  { id: "rp-weekly", kindAr: "نسخ أسبوعية", kindEn: "Weekly backups", retainDays: 90, keepDaily: 0, keepWeekly: 12, keepMonthly: 6 },
  { id: "rp-snapshots", kindAr: "اللقطات اليدوية", kindEn: "Manual snapshots", retainDays: 180, keepDaily: 0, keepWeekly: 0, keepMonthly: 24 },
];

import type { PermissionGrant } from "../../domain/types";

export const mockGrants: PermissionGrant[] = [
  { id: "g-1", subjectType: "role", subjectId: "OWNER", actionId: "*", resourceId: "*", scopeAr: "الكل", scopeEn: "All", effect: "allow", updatedAt: "2025-01-01" },
  { id: "g-2", subjectType: "role", subjectId: "SUPERVISOR", actionId: "summary.approve", resourceId: "summary", scopeAr: "الجامعة المعينة", scopeEn: "Assigned university", effect: "allow", conditionsAr: "فقط الملخصات المرسلة له", conditionsEn: "Only assigned summaries", updatedAt: "2025-06-10" },
  { id: "g-3", subjectType: "role", subjectId: "SUPERVISOR", actionId: "summary.reject", resourceId: "summary", scopeAr: "الجامعة المعينة", scopeEn: "Assigned university", effect: "allow", updatedAt: "2025-06-10" },
  { id: "g-4", subjectType: "role", subjectId: "SUMMARIZER", actionId: "summary.create", resourceId: "summary", scopeAr: "المقررات المعينة", scopeEn: "Assigned courses", effect: "allow", updatedAt: "2025-03-15" },
  { id: "g-5", subjectType: "role", subjectId: "SUMMARIZER", actionId: "summary.approve", resourceId: "summary", scopeAr: "—", scopeEn: "—", effect: "deny", noteAr: "لا يُعتمد من نفسه", noteEn: "No self-approval", updatedAt: "2025-03-15" },
  { id: "g-6", subjectType: "user", subjectId: "user-9", actionId: "security.read", resourceId: "security", scopeAr: "الكل", scopeEn: "All", effect: "allow", updatedAt: "2025-06-01" },
  { id: "g-7", subjectType: "role", subjectId: "STUDENT", actionId: "content.read", resourceId: "content", scopeAr: "المحتوى المنشور فقط", scopeEn: "Published content only", effect: "allow", updatedAt: "2025-01-01" },
  { id: "g-8", subjectType: "role", subjectId: "STUDENT", actionId: "summary.create", resourceId: "summary", scopeAr: "—", scopeEn: "—", effect: "deny", updatedAt: "2025-01-01" },
  { id: "g-9", subjectType: "user", subjectId: "user-15", actionId: "summary.create", resourceId: "summary", scopeAr: "—", scopeEn: "—", effect: "deny", noteAr: "الحساب معلّق", noteEn: "Account suspended", updatedAt: "2026-10-01" },
];

import type { SummaryVersion, SummarySection } from "../../domain/types";

export const mockSummaryVersions: SummaryVersion[] = [
  { id: "sv-1a", summaryId: "sum-1", version: 1, contentAr: "النسخة الأولى: ملخص المحاضرة الأولى من مقدمة البرمجة.", editedBy: "ai-gemini", noteAr: "توليد تلقائي", noteEn: "Auto-generated", createdAt: "2026-10-01T07:30:00" },
  { id: "sv-1b", summaryId: "sum-1", version: 2, contentAr: "النسخة الثانية: تم تحسين المقدمة وإضافة أمثلة عملية.", editedBy: "user-2", noteAr: "تحرير يدوي", noteEn: "Manual edit", createdAt: "2026-10-02T11:00:00" },
  { id: "sv-2a", summaryId: "sum-2", version: 1, contentAr: "النسخة الأولى: القوائم المترابطة بأنواعها.", editedBy: "ai-gemini", createdAt: "2026-09-28T09:00:00" },
  { id: "sv-2b", summaryId: "sum-2", version: 2, contentAr: "النسخة الثانية: إضافة قسم الحذف.", editedBy: "user-2", noteAr: "بناءً على طلب المراجع", noteEn: "Reviewer request", createdAt: "2026-10-02T15:30:00" },
];

export const mockSummarySections: SummarySection[] = [
  { id: "sec-1", titleAr: "تعريف البرمجة", titleEn: "Definition of Programming", bodyAr: "البرمجة هي عملية كتابة تعليمات للجهاز لتنفيذ مهمة محددة.", bodyEn: "Programming is the process of writing instructions for a machine to perform a specific task." },
  { id: "sec-2", titleAr: "لغات البرمجة", titleEn: "Programming Languages", bodyAr: "تنقسم إلى لغات عالية المستوى ومنخفضة المستوى.", bodyEn: "Divided into high-level and low-level languages." },
  { id: "sec-3", titleAr: "أمثلة عملية", titleEn: "Practical examples", bodyAr: "أمثلة بلغة Python توضح المفهوم.", bodyEn: "Python examples illustrating the concept." },
];
