import type { ConstellationEdge, ConstellationNode } from "../design-system/components";

export const constellationNodes: ConstellationNode[] = [
  { id: "uni", labelAr: "الجامعة", labelEn: "University", x: 80, y: 200, kind: "academic" },
  { id: "col", labelAr: "الكلية", labelEn: "College", x: 200, y: 200, kind: "academic" },
  { id: "dep", labelAr: "القسم", labelEn: "Department", x: 320, y: 200, kind: "academic" },
  { id: "lvl", labelAr: "المستوى", labelEn: "Level", x: 440, y: 200, kind: "academic" },
  { id: "sem", labelAr: "الفصل", labelEn: "Semester", x: 560, y: 200, kind: "academic" },
  { id: "crs", labelAr: "المقرر", labelEn: "Course", x: 680, y: 200, kind: "academic" },
  { id: "cnt", labelAr: "المحتوى", labelEn: "Content", x: 680, y: 80, kind: "content" },
  { id: "rev", labelAr: "المراجعة", labelEn: "Review", x: 560, y: 80, kind: "review" },
  { id: "doc", labelAr: "المستند", labelEn: "Document", x: 440, y: 80, kind: "document" },
  { id: "pub", labelAr: "النشر", labelEn: "Publication", x: 320, y: 80, kind: "publish" },
];

export const constellationEdges: ConstellationEdge[] = [
  { from: "uni", to: "col" },
  { from: "col", to: "dep" },
  { from: "dep", to: "lvl" },
  { from: "lvl", to: "sem" },
  { from: "sem", to: "crs" },
  { from: "crs", to: "cnt" },
  { from: "cnt", to: "rev" },
  { from: "rev", to: "doc" },
  { from: "doc", to: "pub" },
];
