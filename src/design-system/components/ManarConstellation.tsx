
import React, { useState } from "react";
import "./ManarConstellation.css";

export type ConstellationNode = {
  id: string;
  labelAr: string;
  labelEn: string;
  x: number;
  y: number;
  kind: "academic" | "content" | "review" | "document" | "publish";
};

export type ConstellationEdge = {
  from: string;
  to: string;
};

type Props = {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
  lang: "ar" | "en";
  onSelect?: (id: string | null) => void;
};

export function ManarConstellation({ nodes, edges, lang, onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (id: string) => {
    const next = selected === id ? null : id;
    setSelected(next);
    onSelect?.(next);
  };

  const isDimmed = (id: string) => {
    if (!selected) return false;
    if (id === selected) return false;
    const connected = edges.some(
      (e) => (e.from === selected && e.to === id) || (e.to === selected && e.from === id)
    );
    return !connected;
  };

  const isEdgeActive = (e: ConstellationEdge) => {
    if (!selected) return false;
    return e.from === selected || e.to === selected;
  };

  return (
    <div className="constellation-wrap">
      <svg viewBox="0 0 800 400" className="constellation-svg" role="img" aria-label="MANAR Constellation">
        <defs>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,92,246,0.15)" />
            <stop offset="100%" stopColor="rgba(107,47,58,0.15)" />
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
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={active ? "rgba(139,92,246,0.65)" : "url(#edge-grad)"}
              strokeWidth={active ? 1.6 : 1}
              strokeDasharray={active ? "0" : "3 3"}
            />
          );
        })}

        {nodes.map((n) => {
          const dim = isDimmed(n.id);
          const isSel = selected === n.id;
          const label = lang === "ar" ? n.labelAr : n.labelEn;
          return (
            <g
              key={n.id}
              transform={"translate(" + n.x + "," + n.y + ")"}
              className={"const-node kind-" + n.kind + (dim ? " dim" : "") + (isSel ? " selected" : "")}
              onClick={() => handleClick(n.id)}
            >
              <circle r={isSel ? 9 : 6} />
              <text x={0} y={-16} textAnchor="middle" className="const-label">{label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
