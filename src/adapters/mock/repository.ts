
import { mockActivity, mockAttention, mockCourses, mockUniversities, mockColleges, mockDepartments } from "./data";
import type { ActivityEvent, AttentionItem, Course, University, College, Department } from "../../domain/types";

export interface ManarRepository {
  listAttention(): Promise<AttentionItem[]>;
  listActivity(): Promise<ActivityEvent[]>;
  listCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  listUniversities(): Promise<University[]>;
  listColleges(): Promise<College[]>;
  listDepartments(): Promise<Department[]>;
}

export const mockRepository: ManarRepository = {
  async listAttention() { return mockAttention; },
  async listActivity() { return mockActivity; },
  async listCourses() { return mockCourses; },
  async getCourse(id) { return mockCourses.find((c) => c.id === id); },
  async listUniversities() { return mockUniversities; },
  async listColleges() { return mockColleges; },
  async listDepartments() { return mockDepartments; },
};
