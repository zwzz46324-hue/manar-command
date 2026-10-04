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

export type DocumentStatus = "draft" | "queued" | "generating-docx" | "generating-pdf" | "protecting" | "ready" | "published" | "failed";

export type ManarDocument = {
  id: string;
  summaryId: string;
  courseCode: string;
  titleAr: string;
  titleEn: string;
  status: DocumentStatus;
  version: number;
  pagesCount: number;
  sizeKb: number;
  hasWatermark: boolean;
  isProtected: boolean;
  createdAt: string;
  updatedAt: string;
  publishedChannels: ("telegram" | "whatsapp" | "site")[];
};

export type TruthEventKind =
  | "auth" | "permission" | "course" | "content" | "summary"
  | "review" | "document" | "publish" | "bot" | "ai"
  | "backup" | "security" | "config" | "code" | "audit";

export type TruthEvent = {
  id: string;
  kind: TruthEventKind;
  actorId: string;
  actorRole: string;
  actionAr: string;
  actionEn: string;
  targetType: string;
  targetId: string;
  before?: string;
  after?: string;
  result: "success" | "warning" | "failure";
  traceId: string;
  source: "ui" | "bot" | "api" | "system" | "ai";
  at: string;
};

export type SecurityEventType = "login-success" | "login-failure" | "logout" | "permission-denied" | "session-expired" | "suspicious-activity" | "secret-rotated" | "ip-blocked";

export type SecurityEvent = {
  id: string;
  type: SecurityEventType;
  actorId: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  at: string;
  riskLevel: "low" | "medium" | "high" | "critical";
};

export type ActiveSession = {
  id: string;
  userId: string;
  device: string;
  ipAddress: string;
  location: string;
  startedAt: string;
  lastSeenAt: string;
  current: boolean;
};

export type RoleName = "SUPER_ADMIN" | "OWNER" | "SUPERVISOR" | "SUMMARIZER" | "REVIEWER" | "STUDENT";

export type UserStatus = "active" | "suspended" | "pending" | "archived";

export type ManarUser = {
  id: string;
  username: string;
  displayNameAr: string;
  displayNameEn: string;
  email: string;
  role: RoleName;
  status: UserStatus;
  scope: string;
  lastSeenAt: string;
  createdAt: string;
  assignedCourses: number;
};

export type RoleDefinition = {
  name: RoleName;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  userCount: number;
  permissions: string[];
  system: boolean;
};

export type Permission = {
  id: string;
  resourceAr: string;
  resourceEn: string;
  actionAr: string;
  actionEn: string;
  groupAr: string;
  groupEn: string;
};

export type AIProviderName = "Gemini" | "OpenAI" | "Anthropic" | "Local" | "Whisper";

export type AIProvider = {
  id: string;
  name: AIProviderName;
  capabilitiesAr: string[];
  capabilitiesEn: string[];
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
  successRate: number;
  keyAlias: string;
  keyStatus: "active" | "rotating" | "disabled";
  keyLastVerifiedAt: string;
  jobsToday: number;
  costTodayUsd: number;
};

export type AIJobType = "transcription" | "summarization" | "translation" | "ocr" | "classification" | "enrichment" | "document-generation";

export type AIJobStatus = "queued" | "running" | "succeeded" | "failed" | "retrying" | "cancelled";

export type AIJob = {
  id: string;
  type: AIJobType;
  provider: AIProviderName;
  model: string;
  status: AIJobStatus;
  attempt: number;
  targetId: string;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  errorAr?: string;
  errorEn?: string;
  traceId: string;
};

export type BotChannel = "telegram" | "whatsapp";

export type BotStatus = "connected" | "connecting" | "disconnected" | "error";

export type ManarBot = {
  id: string;
  channel: BotChannel;
  displayNameAr: string;
  displayNameEn: string;
  username: string;
  status: BotStatus;
  uptimeHours: number;
  messagesToday: number;
  commandsCount: number;
  subscribersCount: number;
  lastErrorAt?: string;
  lastErrorAr?: string;
  lastErrorEn?: string;
};

export type BotMessageStatus = "queued" | "sent" | "delivered" | "read" | "failed";

export type BotMessage = {
  id: string;
  channel: BotChannel;
  direction: "in" | "out";
  recipientId: string;
  textAr: string;
  textEn: string;
  status: BotMessageStatus;
  at: string;
};
