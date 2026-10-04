
import { create } from "zustand";

export type SelectedKind = "academic" | "content" | "review" | "document" | "publish" | null;

type Selection = {
  id: string | null;
  kind: SelectedKind;
  labelAr: string;
  labelEn: string;
  select: (p: { id: string; kind: SelectedKind; labelAr: string; labelEn: string }) => void;
  clear: () => void;
};

export const useSelection = create<Selection>((set) => ({
  id: null,
  kind: null,
  labelAr: "",
  labelEn: "",
  select: (p) => set({ id: p.id, kind: p.kind, labelAr: p.labelAr, labelEn: p.labelEn }),
  clear: () => set({ id: null, kind: null, labelAr: "", labelEn: "" }),
}));
