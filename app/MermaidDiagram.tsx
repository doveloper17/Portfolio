"use client";

import { useEffect, useId, useState } from "react";

let engine: Promise<typeof import("mermaid")["default"]> | undefined;
function getEngine() {
  engine ??= import("mermaid").then(({ default: mermaid }) => {
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", fontFamily: "Arial, sans-serif", themeVariables: { primaryColor: "#eef4f0", primaryTextColor: "#203a30", primaryBorderColor: "#7c998c", lineColor: "#597767", edgeLabelBackground: "#f6f8f6", clusterBkg: "#fafcfb", clusterBorder: "#bbcfc3", fontSize: "15px" }, flowchart: { htmlLabels: true, useMaxWidth: true, curve: "linear", diagramPadding: 20, padding: 22, nodeSpacing: 40, rankSpacing: 56 } });
    return mermaid;
  });
  return engine;
}

function CollectionFlowDiagram() {
  return (
    <svg className="collection-flow-svg" viewBox="0 0 760 660" role="img" aria-label="공공 API 기반 수집과 집계 흐름">
      <defs>
        <marker id="collection-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#597767" /></marker>
      </defs>

      <rect className="collection-app" x="70" y="18" width="370" height="535" rx="3" />
      <text className="collection-group-title" x="255" y="45" textAnchor="middle">수집·집계 애플리케이션</text>

      <g className="collection-node">
        <rect x="128" y="65" width="254" height="72" rx="3" />
        <text x="255" y="106" textAnchor="middle">구간 수집 및 생성</text>
      </g>
      <g className="collection-node">
        <rect x="128" y="238" width="254" height="92" rx="3" />
        <text x="255" y="279" textAnchor="middle"><tspan x="255">공공 API로</tspan><tspan x="255" dy="25">구간별 물동량 수집</tspan></text>
      </g>
      <g className="collection-node">
        <rect x="110" y="425" width="290" height="92" rx="3" />
        <text x="255" y="466" textAnchor="middle"><tspan x="255">월별 완료 확인</tspan><tspan x="255" dy="25">완료 시 SQL 집계</tspan></text>
      </g>

      <g className="collection-node">
        <rect x="520" y="151" width="176" height="72" rx="3" />
        <text x="608" y="192" textAnchor="middle">Service Bus</text>
      </g>
      <g className="collection-database">
        <path d="M530 354v68c0 13 35 23 78 23s78-10 78-23v-68" />
        <ellipse cx="608" cy="354" rx="78" ry="23" />
        <text x="608" y="405" textAnchor="middle">원천 RDB</text>
      </g>
      <g className="collection-database">
        <path d="M177 587v42c0 12 35 22 78 22s78-10 78-22v-42" />
        <ellipse cx="255" cy="587" rx="78" ry="22" />
        <text x="255" y="624" textAnchor="middle">집계 테이블</text>
      </g>

      <path className="collection-arrow" d="M255 137 V176 H520" />
      <path className="collection-arrow" d="M520 210 H255 V238" />
      <path className="collection-arrow" d="M255 330 V375 H530" />
      <path className="collection-arrow" d="M530 422 H455 V471 H400" />
      <path className="collection-arrow" d="M255 517 L255 565" />

      <g className="collection-edge-label"><text x="348" y="161" textAnchor="middle">메시지 전송</text></g>
      <g className="collection-edge-label"><text x="348" y="231" textAnchor="middle">메시지 수신</text></g>
      <g className="collection-edge-label"><text x="380" y="359" textAnchor="middle">데이터·완료 상태 저장</text></g>
    </svg>
  );
}

export default function MermaidDiagram({ source, caption }: { source: string; caption: string }) {
  const id = `diagram-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const isCollectionFlow = source.includes("portfolio-layout: collection-v2");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (isCollectionFlow) return;
    let active = true;
    getEngine().then((mermaid) => mermaid.render(id, source)).then(({ svg }) => { if (active) setSvg(svg); }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [id, isCollectionFlow, source]);
  return (
    <figure className="mermaid-diagram" aria-label={caption}>
      {isCollectionFlow ? <CollectionFlowDiagram /> : svg ? <div className="mermaid-canvas" dangerouslySetInnerHTML={{ __html: svg }} /> : <p role="status">{failed ? "구성도를 표시하지 못했습니다." : "구성도를 불러오는 중입니다."}</p>}
    </figure>
  );
}
