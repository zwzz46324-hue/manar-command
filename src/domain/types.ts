export type AcademicPath = {
  university: string;
  college: string;
  department: string;
  level: string;
  semester: string;
};

export type Course = {
  departmentCode?: string;\n  departmentCode?: string;
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  path: AcademicPath;
  contentCount: number;
  summaryCount: number;
  pendingReview: number;
  createdAt: string;
};

export type ActivityEvent = {
  id: string;
  time: string;
  actor: string;
  actionAr: string;
  actionEn: string;
  objectAr: string;
  objectEn: string;
  result: "success" | "warning" | "failure" | "info";
};

export type AttentionItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  stateAr: string;
  stateEn: string;
  severity: "info" | "warn" | "danger";
  kind: "review" | "ai-job" | "security" | "backup";
};

export type University = {
  id: string;
  nameAr: string;
  nameEn: string;
  code: string;
  archived: boolean;
};

export type College = {
  id: string;
  universityId: string;
  nameAr: string;
  nameEn: string;
  code: string;
  archived: boolean;
};

export type Department = {
  id: string;
  collegeId: string;
  nameAr: string;
  nameEn: string;
  code: string;
  archived: boolean;
};

export type SummaryStatus = "pending" | "in-review" | "needs-changes" | "approved" | "rejected";

export type Summary = {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitleAr: string;
  courseTitleEn: string;
  titleAr: string;
  titleEn: string;
  sourceType: "audio" | "video" | "slides" | "pdf" | "image";
  sourceDurationMin: number;
  transcriptAr: string;
  summaryAr: string;
  status: SummaryStatus;
  authorId: string;
  reviewerId?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  priority: "normal" | "high" | "urgent";
};

export type Decision = {
  id: string;
  summaryId: string;
  decision: "approve" | "reject" | "request-changes" | "return-to-editing";
  actorId: string;
  reasonAr: string;
  reasonEn: string;
  createdAt: string;
};
