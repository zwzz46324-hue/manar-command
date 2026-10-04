import { useEffect, useState } from "react";
import { mockRepository } from "../adapters/mock/repository";
import type { ActivityEvent, AttentionItem, Course } from "../domain/types";

export function useCommandData() {
  const [attention, setAttention] = useState<AttentionItem[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.all([
      mockRepository.listAttention(),
      mockRepository.listActivity(),
      mockRepository.listCourses(),
    ]).then(([a, ac, c]) => {
      if (!alive) return;
      setAttention(a);
      setActivity(ac);
      setCourses(c);
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  return { attention, activity, courses, loading };
}
