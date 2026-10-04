
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
