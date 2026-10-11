import { create } from "zustand";

export type NotificationKind = "info" | "success" | "warning" | "danger";

export type Notification = {
  id: string;
  kind: NotificationKind;
  titleAr: string;
  titleEn: string;
  descAr?: string;
  descEn?: string;
  createdAt: number;
  read: boolean;
};

type State = {
  items: Notification[];
  add: (n: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useNotifications = create<State>((set) => ({
  items: [
    { id: "n-1", kind: "info",    titleAr: "ملخص بانتظار الاعتماد", titleEn: "Summary awaiting approval", descAr: "هياكل البيانات — المراجعة مطلوبة", descEn: "Data Structures — review required", createdAt: Date.now() - 1000 * 60 * 5, read: false },
    { id: "n-2", kind: "warning", titleAr: "مهمة AI فشلت",           titleEn: "AI job failed",             descAr: "مهمة تفريغ صوتي #A-1042",         descEn: "Transcription Job #A-1042",         createdAt: Date.now() - 1000 * 60 * 30, read: false },
    { id: "n-3", kind: "success", titleAr: "نشر على تلجرام",         titleEn: "Published to Telegram",     descAr: "علم التشريح — الهيكل العظمي",     descEn: "Anatomy — Skeletal System",         createdAt: Date.now() - 1000 * 60 * 90, read: true },
    { id: "n-4", kind: "danger",  titleAr: "محاولة دخول مشبوهة",    titleEn: "Suspicious login",          descAr: "IP: 45.132.18.7 — تم الحظر",       descEn: "IP: 45.132.18.7 — blocked",          createdAt: Date.now() - 1000 * 60 * 180, read: false },
  ],
  add: (n) => set((s) => ({
    items: [
      { ...n, id: "n-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6), createdAt: Date.now(), read: false },
      ...s.items,
    ],
  })),
  markRead: (id) => set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, read: true } : i) })),
  markAllRead: () => set((s) => ({ items: s.items.map((i) => ({ ...i, read: true })) })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));
