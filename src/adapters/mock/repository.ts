import {
  mockActivity, mockAttention, mockCourses,
  mockUniversities, mockColleges, mockDepartments,
  mockSummaries, mockSummariesExtra, mockDecisions,
  mockDocuments,
  mockTruthEvents, mockSecurityEvents, mockSessions,
  mockUsers, mockRoles, mockPermissions,
  mockProviders, mockAIJobs,
  mockBots, mockBotMessages,
  mockServices, mockQueues, mockWorkers, mockFeatureFlags,
  mockVaultFiles,
  mockBackups, mockRetentionPolicies,
  mockGrants,
  mockSummaryVersions, mockSummarySections,
  mockTranscriptSegments,
  mockSystemMapNodes, mockSystemMapEdges,
  mockRepoFiles, mockCommits, mockDiff, mockBuilds,
  mockSearchIndex,
  mockCommands,
  mockKPIs, mockQuickActions,
} from "./data";
import type {
  ActivityEvent, AttentionItem, Course, University, College, Department,
  Summary, Decision, ManarDocument, TruthEvent, SecurityEvent, ActiveSession,
  ManarUser, RoleDefinition, Permission, AIProvider, AIJob, ManarBot, BotMessage,
  ServiceHealth, QueueState, Worker, FeatureFlag,
  VaultFile, Backup, RetentionPolicy, PermissionGrant,
  SummaryVersion, SummarySection, TranscriptSegment,
  SystemMapNode, SystemMapEdge, RepoFile, Commit, DiffLine, BuildRun,
  SearchHit, Command, KPI, QuickAction,
} from "../../domain/types";

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
  summaries: [...mockSummaries, ...mockSummariesExtra].map((s) => ({ ...s })),
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

export const vaultRepo = {
  async list(): Promise<VaultFile[]> { return mockVaultFiles; },
  async get(id: string): Promise<VaultFile | undefined> { return mockVaultFiles.find((f) => f.id === id); },
};

export const backupRepo = {
  async list(): Promise<Backup[]> { return mockBackups; },
  async listPolicies(): Promise<RetentionPolicy[]> { return mockRetentionPolicies; },
};

export const grantsRepo = {
  async list(): Promise<PermissionGrant[]> { return mockGrants; },
};

export const summaryStudioRepo = {
  async listVersions(summaryId: string): Promise<SummaryVersion[]> {
    return mockSummaryVersions.filter((v) => v.summaryId === summaryId);
  },
  async listSections(): Promise<SummarySection[]> { return mockSummarySections; },
};

export const transcriptRepo = {
  async list(summaryId: string): Promise<TranscriptSegment[]> {
    return mockTranscriptSegments.filter((s) => s.summaryId === summaryId);
  },
};

export const systemMapRepo = {
  async nodes(): Promise<SystemMapNode[]> { return mockSystemMapNodes; },
  async edges(): Promise<SystemMapEdge[]> { return mockSystemMapEdges; },
};

export const codeRepo = {
  async files(): Promise<RepoFile[]> { return mockRepoFiles; },
  async commits(): Promise<Commit[]> { return mockCommits; },
  async diff(): Promise<DiffLine[]> { return mockDiff; },
  async builds(): Promise<BuildRun[]> { return mockBuilds; },
};

export const searchRepo = {
  async all(): Promise<SearchHit[]> { return mockSearchIndex; },
};

export const commandRepo = {
  async list(): Promise<Command[]> { return mockCommands; },
};

export const homeRepo = {
  async kpis(): Promise<KPI[]> { return mockKPIs; },
  async quickActions(): Promise<QuickAction[]> { return mockQuickActions; },
};

import { mockRiverEvents } from "./data";
import type { RiverEvent } from "../../domain/types";

export const riverRepo = {
  async list(): Promise<RiverEvent[]> { return mockRiverEvents; },
};

import { mockAttentionEntries } from "./data";
import type { AttentionEntry } from "../../domain/types";

export const attentionRepo = {
  async list(): Promise<AttentionEntry[]> { return mockAttentionEntries; },
};



import { mockUniversityMeta } from "./data";
import type { UniversityMeta } from "../../domain/types";

export const universityMetaRepo = {
  async list(): Promise<UniversityMeta[]> { return mockUniversityMeta; },
  async get(id: string): Promise<UniversityMeta | undefined> {
    return mockUniversityMeta.find((m) => m.id === id);
  },
};

import { mockContentItems } from "./data";
import type { ContentItem } from "../../domain/types";

export const contentRepo = {
  async list(): Promise<ContentItem[]> { return mockContentItems; },
  async get(id: string): Promise<ContentItem | undefined> {
    return mockContentItems.find((c) => c.id === id);
  },
};

import { mockPipeline } from "./data";
import type { PipelineEntry } from "../../domain/types";

export const pipelineRepo = {
  async list(): Promise<PipelineEntry[]> { return mockPipeline; },
};

import { mockTemplates } from "./data";
import type { DocumentTemplate } from "../../domain/types";

export const templateRepo = {
  async list(): Promise<DocumentTemplate[]> { return mockTemplates; },
};

import { mockPublishedDocs } from "./data";
import type { PublishedDocument } from "../../domain/types";

export const publishedRepo = {
  async list(): Promise<PublishedDocument[]> { return mockPublishedDocs; },
};

import { mockAIKeys } from "./data";
import type { AIKey } from "../../domain/types";

export const aiKeysRepo = {
  async list(): Promise<AIKey[]> { return mockAIKeys; },
};

import { mockJobControl } from "./data";
import type { JobControlItem } from "../../domain/types";

export const jobControlRepo = {
  async list(): Promise<JobControlItem[]> { return mockJobControl; },
};

import { mockBotFlowNodes, mockBotFlowEdges } from "./data";
import type { BotFlowNode, BotFlowEdge } from "../../domain/types";

export const botFlowRepo = {
  async nodes(): Promise<BotFlowNode[]> { return mockBotFlowNodes; },
  async edges(): Promise<BotFlowEdge[]> { return mockBotFlowEdges; },
};

import { mockBroadcasts, mockTemplates2 } from "./data";
import type { Broadcast, MessageTemplate } from "../../domain/types";

export const commRepo = {
  async broadcasts(): Promise<Broadcast[]> { return mockBroadcasts; },
  async templates(): Promise<MessageTemplate[]> { return mockTemplates2; },
};

import { mockFlagDetails } from "./data";
import type { FlagDetail } from "../../domain/types";

export const flagDetailRepo = {
  async list(): Promise<FlagDetail[]> { return mockFlagDetails; },
};

import { mockOverviewKPIs } from "./data";
import type { OverviewKPI } from "../../domain/types";

export const overviewRepo = {
  async kpis(): Promise<OverviewKPI[]> { return mockOverviewKPIs; },
};

import { mockPublishFlows } from "./data";
import type { PublishFlow } from "../../domain/types";

export const publishFlowRepo = {
  async list(): Promise<PublishFlow[]> { return mockPublishFlows; },
};

import { mockBuildDetails } from "./data";
import type { BuildDetail } from "../../domain/types";

export const buildRepo = {
  async list(): Promise<BuildDetail[]> { return mockBuildDetails; },
};

import { mockRestoreSnapshots, mockRestoreHistory } from "./data";
import type { RestoreSnapshot, RestoreHistoryEntry } from "../../domain/types";

export const restoreRepo = {
  async snapshots(): Promise<RestoreSnapshot[]> { return mockRestoreSnapshots; },
  async history(): Promise<RestoreHistoryEntry[]> { return mockRestoreHistory; },
};

import { mockAuditEvents } from "./data";
import type { AuditEvent } from "../../domain/types";

export const auditRepo = {
  async events(): Promise<AuditEvent[]> { return mockAuditEvents; },
};
