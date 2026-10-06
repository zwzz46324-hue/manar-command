import { mockActivity, mockAttention, mockCourses, mockUniversities, mockColleges, mockDepartments, mockSummaries, mockDecisions, mockDocuments, mockTruthEvents, mockSecurityEvents, mockSessions, mockUsers, mockRoles, mockPermissions, mockProviders, mockAIJobs, mockBots, mockBotMessages, mockServices, mockQueues, mockWorkers, mockFeatureFlags } from "./data";
import type { ActivityEvent, AttentionItem, Course, University, College, Department, Summary, Decision, ManarDocument, TruthEvent, SecurityEvent, ActiveSession, ManarUser, RoleDefinition, Permission, AIProvider, AIJob, ManarBot, BotMessage, ServiceHealth, QueueState, Worker, FeatureFlag } from "../../domain/types";

export interface ManarRepository {
  listAttention(): Promise<AttentionItem[]>;
  listActivity(): Promise<ActivityEvent[]>;
  listCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  listUniversities(): Promise<University[]>;
  listColleges(): Promise<College[]>;
  listDepartments(): Promise<Department[]>;
  listSummaries(): Promise<Summary[]>;
  getSummary(id: string): Promise<Summary | undefined>;
  listDecisions(summaryId?: string): Promise<Decision[]>;
  updateSummaryStatus(id: string, status: Summary["status"]): Promise<Summary | undefined>;
}

const store = {
  summaries: mockSummaries.map((s) => ({ ...s })),
  decisions: [...mockDecisions],
};

export const mockRepository: ManarRepository = {
  async listAttention() { return mockAttention; },
  async listActivity() { return mockActivity; },
  async listCourses() { return mockCourses; },
  async getCourse(id) { return mockCourses.find((c) => c.id === id); },
  async listUniversities() { return mockUniversities; },
  async listColleges() { return mockColleges; },
  async listDepartments() { return mockDepartments; },
  async listSummaries() { return store.summaries; },
  async getSummary(id) { return store.summaries.find((s) => s.id === id); },
  async listDecisions(summaryId) {
    return summaryId ? store.decisions.filter((d) => d.summaryId === summaryId) : store.decisions;
  },
  async updateSummaryStatus(id, status) {
    const item = store.summaries.find((s) => s.id === id);
    if (!item) return undefined;
    item.status = status;
    item.updatedAt = new Date().toISOString().slice(0, 10);
    return item;
  },
};

export const documentsRepo = {
  async list(): Promise<ManarDocument[]> { return mockDocuments; },
  async get(id: string): Promise<ManarDocument | undefined> { return mockDocuments.find((d) => d.id === id); },
};

export const truthRepo = {
  async list(): Promise<TruthEvent[]> { return mockTruthEvents; },
};

export const securityRepo = {
  async listEvents(): Promise<SecurityEvent[]> { return mockSecurityEvents; },
  async listSessions(): Promise<ActiveSession[]> { return mockSessions; },
};

export const peopleRepo = {
  async listUsers(): Promise<ManarUser[]> { return mockUsers; },
  async listRoles(): Promise<RoleDefinition[]> { return mockRoles; },
  async listPermissions(): Promise<Permission[]> { return mockPermissions; },
};

export const aiRepo = {
  async listProviders(): Promise<AIProvider[]> { return mockProviders; },
  async listJobs(): Promise<AIJob[]> { return mockAIJobs; },
};

export const botsRepo = {
  async listBots(): Promise<ManarBot[]> { return mockBots; },
  async listMessages(): Promise<BotMessage[]> { return mockBotMessages; },
};

export const opsRepo = {
  async listServices(): Promise<ServiceHealth[]> { return mockServices; },
  async listQueues(): Promise<QueueState[]> { return mockQueues; },
  async listWorkers(): Promise<Worker[]> { return mockWorkers; },
  async listFlags(): Promise<FeatureFlag[]> { return mockFeatureFlags; },
};

import { mockVaultFiles } from "./data";
import type { VaultFile } from "../../domain/types";

export const vaultRepo = {
  async list(): Promise<VaultFile[]> { return mockVaultFiles; },
  async get(id: string): Promise<VaultFile | undefined> { return mockVaultFiles.find((f) => f.id === id); },
};
