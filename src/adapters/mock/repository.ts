
import { mockActivity, mockAttention, mockCourses, mockUniversities, mockColleges, mockDepartments, mockSummaries, mockDecisions } from "./data";
import type { ActivityEvent, AttentionItem, Course, University, College, Department, Summary, Decision } from "../../domain/types";

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
