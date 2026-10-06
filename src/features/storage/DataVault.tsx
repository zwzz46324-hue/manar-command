
import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { vaultRepo } from "../../adapters/mock/repository";
import type { VaultFile, VaultFileKind } from "../../domain/types";
import "./DataVault.css";

const kinds: VaultFileKind[] = ["audio", "video", "image", "document", "archive", "other"];

export function DataVault() {
  const { lang, t } = useLang();
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kindFilter, setKindFilter] = useState<VaultFileKind | "all">("all");

  useEffect(() => {
    vaultRepo.list().then((f) => { setFiles(f); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return files.filter((f) => {
      if (kindFilter !== "all" && f.kind !== kindFilter) return false;
      if (!term) return true;
      return f.nameAr.toLowerCase().includes(term) ||
        f.nameEn.toLowerCase().includes(term) ||
        f.tags.some((tag) => tag.toLowerCase().includes(term));
    });
  }, [files, q, kindFilter]);

  const kindLabelsAr: Record<string, string> = { all: "الكل", audio: "صوت", video: "فيديو", image: "صورة", document: "مستند", archive: "أرشيف", other: "أخرى" };
  const kindLabelsEn: Record<string, string> = { all: "All", audio: "Audio", video: "Video", image: "Image", document: "Document", archive: "Archive", other: "Other" };
  const kindLabels = lang === "ar" ? kindLabelsAr : kindLabelsEn;

  const title = lang === "ar" ? "خزنة البيانات" : "Data Vault";
  const subtitle = lang === "ar" ? "كل الملفات في المنظومة مع إصداراتها وبياناتها" : "All files in the ecosystem, with versions and metadata";
  const searchPlaceholder = lang === "ar" ? "ابحث بالاسم أو الوسم..." : "Search by name or tag...";
  const emptyMsg = lang === "ar" ? "لا توجد ملفات مطابقة." : "No matching files.";

  const totalSize = files.reduce((a, f) => a + f.sizeKb, 0);
  const archivedCount = files.filter((f) => f.archived).length;
  const formatSize = (kb: number) => kb >= 1024 ? (Math.round(kb / 1024 * 10) / 10) + " MB" : kb + " KB";

  return (
    <div className="vault-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{filtered.length} / {files.length}</span>
        </div>
      </header>

      <div className="vault-stats">
        <div className="vault-stat"><span className="vstat-v">{files.length}</span><span className="vstat-k">{lang === "ar" ? "ملف" : "Files"}</span></div>
        <div className="vault-stat"><span className="vstat-v">{formatSize(totalSize)}</span><span className="vstat-k">{lang === "ar" ? "الحجم" : "Total size"}</span></div>
        <div className="vault-stat"><span className="vstat-v">{archivedCount}</span><span className="vstat-k">{lang === "ar" ? "مؤرشف" : "Archived"}</span></div>
        <div className="vault-stat"><span className="vstat-v">{kinds.length}</span><span className="vstat-k">{lang === "ar" ? "أنواع" : "Kinds"}</span></div>
      </div>

      <div className="vault-toolbar">
        <input className="vault-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} />
      </div>

      <div className="vault-filters">
        <button className={"vault-filter" + (kindFilter === "all" ? " active" : "")} type="button" onClick={() => setKindFilter("all")}>{kindLabels.all}</button>
        {kinds.map((k) => (
          <button key={k} className={"vault-filter" + (kindFilter === k ? " active" : "")} type="button" onClick={() => setKindFilter(k)}>{kindLabels[k]}</button>
        ))}
      </div>

      {loading && <p className="muted-line">...</p>}
      {!loading && filtered.length === 0 && <p className="muted-line">{emptyMsg}</p>}

      <div className="vault-table-wrap">
        <table className="vault-table">
          <thead>
            <tr>
              <th>{lang === "ar" ? "الملف" : "File"}</th>
              <th>{lang === "ar" ? "النوع" : "Kind"}</th>
              <th>{lang === "ar" ? "الحجم" : "Size"}</th>
              <th>{lang === "ar" ? "الإصدار" : "Version"}</th>
              <th>{lang === "ar" ? "المالك" : "Owner"}</th>
              <th>{lang === "ar" ? "مرتبط بـ" : "Linked to"}</th>
              <th>{lang === "ar" ? "الاحتفاظ" : "Retention"}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id}>
                <td>
                  <div className="file-cell">
                    <span className={"file-icon kind-" + f.kind}>{f.kind.slice(0, 3).toUpperCase()}</span>
                    <div>
                      <div className="file-name">{lang === "ar" ? f.nameAr : f.nameEn}</div>
                      <div className="file-tags">{f.tags.map((tag) => <span key={tag} className="tag-chip">#{tag}</span>)}</div>
                    </div>
                  </div>
                </td>
                <td className="mono">{f.mimeType.split("/")[1]}</td>
                <td className="mono">{formatSize(f.sizeKb)}</td>
                <td className="mono">v{f.version}</td>
                <td className="mono">{f.ownerId}</td>
                <td className="mono">{f.linkedTo || "—"}</td>
                <td className="mono">{f.retentionDays}d</td>
                <td>{f.archived && <span className="archived-chip">{lang === "ar" ? "مؤرشف" : "Archived"}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
