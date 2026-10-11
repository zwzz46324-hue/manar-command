import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { botFlowRepo } from "../../adapters/mock/repository";
import type { BotFlowEdge, BotFlowNode } from "../../domain/types";
import "./BotFlowVisualizer.css";

export function BotFlowVisualizer() {
  const { lang, t } = useLang();
  const [nodes, setNodes] = useState<BotFlowNode[]>([]);
  const [edges, setEdges] = useState<BotFlowEdge[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([botFlowRepo.nodes(), botFlowRepo.edges()]).then(([n, e]) => {
      setNodes(n);
      setEdges(e);
      setLoading(false);
    });
  }, []);

  const title = lang === "ar" ? "مخطط تدفق البوت" : "Bot Flow Visualizer";
  const subtitle = lang === "ar" ? "رحلة المستخدم داخل بوت منار" : "User journey inside the MANAR bot";

  const isSelected = (id: string) => selected === id;
  const isNeighbor = (id: string) => {
    if (!selected) return false;
    if (selected === id) return false;
    return edges.some((e) => (e.from === selected && e.to === id) || (e.to === selected && e.from === id));
  };
  const isEdgeActive = (e: BotFlowEdge) => selected === e.from || selected === e.to;
  const selectedNode = nodes.find((n) => n.id === selected);

  if (loading) return <div className="bfv-page"><p className="muted-line">...</p></div>;

  return (
    <div className="bfv-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
        <div className="page-meta">
          <span className="page-date">{nodes.length} {lang === "ar" ? "عقدة" : "nodes"}</span>
        </div>
      </header>

      <div className="bfv-layout">
        <div className="bfv-canvas-wrap">
          <svg viewBox="0 0 800 760" className="bfv-svg">
            <defs>
              <linearGradient id="bfv-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(139,92,246,0.25)" />
                <stop offset="100%" stopColor="rgba(107,47,58,0.25)" />
              </linearGradient>
              <marker id="bfv-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(139,92,246,0.6)" />
              </marker>
            </defs>

            {edges.map((e, i) => {
              const a = nodes.find((n) => n.id === e.from);
              const b = nodes.find((n) => n.id === e.to);
              if (!a || !b) return null;
              const active = isEdgeActive(e);
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={active ? "var(--manar-accent)" : "url(#bfv-edge)"}
                  strokeWidth={active ? 2 : 1}
                  strokeDasharray={active ? "0" : "4 4"}
                  markerEnd="url(#bfv-arrow)"
                />
              );
            })}

            {nodes.map((n) => {
              const sel = isSelected(n.id);
              const neighbor = isNeighbor(n.id);
              const dim = selected && !sel && !neighbor;
              const label = lang === "ar" ? n.labelAr : n.labelEn;
              return (
                <g
                  key={n.id}
                  transform={"translate(" + n.x + "," + n.y + ")"}
                  className={"bfv-node" + (n.isAction ? " action" : "") + (sel ? " selected" : "") + (neighbor ? " neighbor" : "") + (dim ? " dim" : "")}
                  onClick={() => setSelected(selected === n.id ? null : n.id)}
                >
                  <rect x={-70} y={-18} width={140} height={36} rx={8} />
                  <text textAnchor="middle" y={-2} className="bfv-label">{label}</text>
                  <text textAnchor="middle" y={12} className="bfv-taps">{n.taps.toLocaleString()} · {n.conversionPct}%</text>
                </g>
              );
            })}
          </svg>
        </div>

        <aside className="bfv-rail">
          {!selectedNode && (
            <div className="bfv-empty">
              <p className="muted-line">{lang === "ar" ? "اختر عقدة لعرض تفاصيلها." : "Select a node to inspect it."}</p>
              <div className="bfv-legend">
                <div className="lg-item"><span className="lg-box" />{lang === "ar" ? "عقدة عادية" : "Normal node"}</div>
                <div className="lg-item"><span className="lg-box action" />{lang === "ar" ? "إجراء (Action)" : "Action node"}</div>
              </div>
            </div>
          )}

          {selectedNode && (
            <>
              <h3 className="bfv-detail-title">{lang === "ar" ? selectedNode.labelAr : selectedNode.labelEn}</h3>
              {selectedNode.isAction && <span className="bfv-action-chip">{lang === "ar" ? "إجراء" : "ACTION"}</span>}
              <dl className="bfv-stats">
                <div><dt>{lang === "ar" ? "النقرات" : "Taps"}</dt><dd>{selectedNode.taps.toLocaleString()}</dd></div>
                <div><dt>{lang === "ar" ? "التحويل" : "Conversion"}</dt><dd>{selectedNode.conversionPct}%</dd></div>
              </dl>
              <h4 className="bfv-sub">{lang === "ar" ? "الاتصالات" : "Connections"}</h4>
              <ul className="bfv-conn-list">
                {edges.filter((e) => e.from === selectedNode.id || e.to === selectedNode.id).map((e, i) => {
                  const other = nodes.find((n) => n.id === (e.from === selectedNode.id ? e.to : e.from));
                  if (!other) return null;
                  const dir = e.from === selectedNode.id ? "→" : "←";
                  return (
                    <li key={i} className="bfv-conn">
                      <span className="bfv-conn-dir">{dir}</span>
                      <span>{lang === "ar" ? other.labelAr : other.labelEn}</span>
                    </li>
                  );
                })}
              </ul>
              <button className="bfv-clear" type="button" onClick={() => setSelected(null)}>
                {lang === "ar" ? "إلغاء التحديد" : "Clear selection"}
              </button>
            </>
          )}
        </aside>
      </div>

      <footer className="page-foot">
        <span className="demo-badge">{t.demoBadge}</span>
      </footer>
    </div>
  );
}
