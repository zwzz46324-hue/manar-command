import { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { systemMapRepo } from "../../adapters/mock/repository";
import type { SystemMapEdge, SystemMapNode } from "../../domain/types";
import "./LiveSystemMap.css";

export function LiveSystemMap() {
  const { lang, t } = useLang();
  const [nodes, setNodes] = useState<SystemMapNode[]>([]);
  const [edges, setEdges] = useState<SystemMapEdge[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([systemMapRepo.nodes(), systemMapRepo.edges()])
      .then(([n, e]) => { setNodes(n); setEdges(e); setLoading(false); });
  }, []);

  const stateLabelsAr: Record<string, string> = { healthy: "سليم", degraded: "متدهور", down: "متوقف" };
  const stateLabelsEn: Record<string, string> = { healthy: "Healthy", degraded: "Degraded", down: "Down" };
  const stateLabels = lang === "ar" ? stateLabelsAr : stateLabelsEn;

  const layerLabelsAr: Record<string, string> = { core: "نواة", data: "بيانات", service: "خدمة", ai: "ذكاء", integration: "تكامل", channel: "قناة", user: "مستخدم" };
  const layerLabelsEn: Record<string, string> = { core: "Core", data: "Data", service: "Service", ai: "AI", integration: "Integration", channel: "Channel", user: "User" };
  const layerLabels = lang === "ar" ? layerLabelsAr : layerLabelsEn;

  const title = lang === "ar" ? "خريطة المنظومة الحية" : "Live System Map";
  const subtitle = lang === "ar" ? "كيف يتصل كل جزء من منار ببقية الأجزاء" : "How every part of MANAR connects to the rest";

  const isSelected = (id: string) => selected === id;
  const isNeighbor = (id: string) => {
    if (!selected) return false;
    if (selected === id) return false;
    return edges.some((e) => (e.from === selected && e.to === id) || (e.to === selected && e.from === id));
  };
  const isEdgeActive = (e: SystemMapEdge) => selected === e.from || selected === e.to;

  const selectedNode = nodes.find((n) => n.id === selected);

  if (loading) return <div className="sm-page"><p className="muted-line">...</p></div>;

  return (
    <div className="sm-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{t.pageEyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </header>

      <div className="sm-layout">
        <div className="sm-canvas-wrap">
          <svg viewBox="0 0 800 700" className="sm-svg">
            <defs>
              <linearGradient id="sm-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(139,92,246,0.25)" />
                <stop offset="100%" stopColor="rgba(107,47,58,0.25)" />
              </linearGradient>
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
                  stroke={active ? "var(--manar-accent)" : "url(#sm-edge)"}
                  strokeWidth={active ? 1.8 : 1}
                  strokeDasharray={active ? "0" : "4 4"}
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
                  className={"sm-node state-" + n.state + (sel ? " selected" : "") + (neighbor ? " neighbor" : "") + (dim ? " dim" : "")}
                  onClick={() => setSelected(selected === n.id ? null : n.id)}
                >
                  <circle r={sel ? 14 : 10} />
                  <circle className="sm-pulse" r={sel ? 14 : 10} />
                  <text y={-22} textAnchor="middle" className="sm-label">{label}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <aside className="sm-rail">
          {!selectedNode && (
            <div className="sm-rail-empty">
              <p className="muted-line">{lang === "ar" ? "اختر عقدة لعرض تفاصيلها." : "Select a node to inspect it."}</p>
              <div className="sm-legend">
                <div className="lg-item"><span className="lg-dot lg-healthy" />{stateLabels.healthy}</div>
                <div className="lg-item"><span className="lg-dot lg-degraded" />{stateLabels.degraded}</div>
                <div className="lg-item"><span className="lg-dot lg-down" />{stateLabels.down}</div>
              </div>
            </div>
          )}

          {selectedNode && (
            <>
              <div className={"sm-detail-state state-" + selectedNode.state}>
                <span className={"sm-dot state-" + selectedNode.state} />
                {stateLabels[selectedNode.state]}
              </div>
              <h3 className="sm-detail-title">{lang === "ar" ? selectedNode.labelAr : selectedNode.labelEn}</h3>
              <p className="sm-detail-layer">{layerLabels[selectedNode.layer]}</p>

              <h4 className="sm-sub">{lang === "ar" ? "الاتصالات" : "Connections"}</h4>
              <ul className="sm-conn-list">
                {edges.filter((e) => e.from === selectedNode.id || e.to === selectedNode.id).map((e, i) => {
                  const other = nodes.find((n) => n.id === (e.from === selectedNode.id ? e.to : e.from));
                  if (!other) return null;
                  return (
                    <li key={i} className="sm-conn">
                      <span className={"sm-dot small state-" + other.state} />
                      <span>{lang === "ar" ? other.labelAr : other.labelEn}</span>
                    </li>
                  );
                })}
              </ul>

              <button className="sm-clear" type="button" onClick={() => setSelected(null)}>
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
