import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n";
import { codeRepo } from "../../adapters/mock/repository";
import type { BuildRun, Commit, DiffLine, RepoFile } from "../../domain/types";
import "./CodeCenter.css";

type Tab = "files" | "commits" | "diff" | "builds";

export function CodeCenter() {
  const { lang, t } = useLang();
  const [files, setFiles] = useState<RepoFile[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [builds, setBuilds] = useState<BuildRun[]>([]);
  const [tab, setTab] = useState<Tab>("files");
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    Promise.all([codeRepo.files(), codeRepo.commits(), codeRepo.diff(), codeRepo.builds()])
      .then(([f, c, d, b]) => { setFiles(f); setCommits(c); setDiff(d); setBuilds(b); setLoading(false); });
  }, []);

  const filteredFiles = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return files;
    return files.filter((f) => f.path.toLowerCase().includes(term) || f.language.toLowerCase().includes(term));
  }, [files, q]);

  const title = lang === "ar" ? "مركز الكود" : "Code Center";
  const subtitle = lang === "ar" ? "المستودع، التغييرات، الاختبارات، والبناء" : "Repository, changes, tests, and builds";

  const tabs: { id: Tab; ar: string; en: string }[] = [
    { id: "files", ar: "الملفات", en: "Files" },
    { id: "commits", ar: "التغييرات", en: "Commits" },
    { id: "diff", ar: "الفروقات", en: "Diff" },
    { id: "builds", ar: "البناء والاختبارات", en: "Builds & Tests" },
  ];

  const totalLines = files.reduce((a, f) => a + f.lines, 0);
  const totalKb = files.reduce((a, f) => a + f.sizeKb, 0);
  const lastBuild = builds[0];
  return (
    <div className="code-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      {loading && <p className="muted-line">...</p>}

      {!loading && (
        <>
          <div className="code-stats">
            <div className="code-stat"><span className="cs-v">{files.length}</span><span className="cs-k">{lang === "ar" ? "ملف" : "Files"}</span></div>
            <div className="code-stat"><span className="cs-v">{totalLines.toLocaleString()}</span><span className="cs-k">{lang === "ar" ? "سطر" : "Lines"}</span></div>
            <div className="code-stat"><span className="cs-v">{totalKb.toFixed(1)} KB</span><span className="cs-k">{lang === "ar" ? "الحجم" : "Size"}</span></div>
            <div className="code-stat"><span className={"cs-v " + (lastBuild?.status === "success" ? "ok" : "warn")}>{lastBuild?.status === "success" ? (lang === "ar" ? "نجح" : "Passing") : (lang === "ar" ? "فشل" : "Failing")}</span><span className="cs-k">{lang === "ar" ? "آخر بناء" : "Last build"}</span></div>
          </div>

          <nav className="code-tabs">
            {tabs.map((tb) => (
              <button key={tb.id} className={"code-tab" + (tab === tb.id ? " active" : "")} type="button" onClick={() => setTab(tb.id)}>{lang === "ar" ? tb.ar : tb.en}</button>
            ))}
          </nav>

          {tab === "files" && (
            <>
              <input className="code-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "ar" ? "ابحث في الملفات..." : "Search files..."} />
              <div className="code-table-wrap">
                <table className="code-table">
                  <thead>
                    <tr>
                      <th>{lang === "ar" ? "المسار" : "Path"}</th>
                      <th>{lang === "ar" ? "اللغة" : "Language"}</th>
                      <th>{lang === "ar" ? "الأسطر" : "Lines"}</th>
                      <th>{lang === "ar" ? "الحجم" : "Size"}</th>
                      <th>{lang === "ar" ? "آخر تحديث" : "Last commit"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((f) => (
                      <tr key={f.id}>
                        <td className="path-cell">{f.path}</td>
                        <td><span className="lang-chip">{f.language}</span></td>
                        <td className="mono">{f.lines}</td>
                        <td className="mono">{f.sizeKb} KB</td>
                        <td className="mono">{f.lastCommitAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "commits" && (
            <div className="commits-list">
              {commits.map((c) => (
                <article key={c.id} className="commit-card">
                  <div className="commit-head">
                    <span className="commit-hash">{c.hash}</span>
                    <span className="commit-author">{c.authorId}</span>
                    <span className="commit-date">{c.at}</span>
                  </div>
                  <h3 className="commit-msg">{c.message}</h3>
                  <div className="commit-stats">
                    <span>{c.filesChanged} {lang === "ar" ? "ملف" : "files"}</span>
                    <span className="ins">+{c.insertions}</span>
                    <span className="del">-{c.deletions}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === "diff" && (
            <div className="diff-view">
              <div className="diff-head">{lang === "ar" ? "مثال على Diff لمؤخر تعديل" : "Sample diff of the last change"}</div>
              <div className="diff-body">
                {diff.map((d, i) => (
                  <div key={i} className={"diff-line dl-" + d.type}>
                    <span className="dl-sign">{d.type === "add" ? "+" : d.type === "remove" ? "-" : " "}</span>
                    <span className="dl-text">{d.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "builds" && (
            <div className="code-table-wrap">
              <table className="code-table">
                <thead>
                  <tr>
                    <th>{lang === "ar" ? "الفرع" : "Branch"}</th>
                    <th>Commit</th>
                    <th>{lang === "ar" ? "الحالة" : "Status"}</th>
                    <th>{lang === "ar" ? "المدة" : "Duration"}</th>
                    <th>{lang === "ar" ? "نجحت" : "Passed"}</th>
                    <th>{lang === "ar" ? "فشلت" : "Failed"}</th>
                    <th>{lang === "ar" ? "الوقت" : "Time"}</th>
                  </tr>
                </thead>
                <tbody>
                  {builds.map((b) => (
                    <tr key={b.id}>
                      <td className="mono">{b.branch}</td>
                      <td className="mono">{b.commitHash}</td>
                      <td><span className={"build-pill bp-" + b.status}>{b.status === "success" ? (lang === "ar" ? "نجح" : "Success") : b.status === "failed" ? (lang === "ar" ? "فشل" : "Failed") : (lang === "ar" ? "جارٍ" : "Running")}</span></td>
                      <td className="mono">{b.durationSec}s</td>
                      <td className="mono ok">{b.testsPassed}</td>
                      <td className={"mono" + (b.testsFailed > 0 ? " danger" : "")}>{b.testsFailed}</td>
                      <td className="mono">{b.at.slice(11, 16)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
