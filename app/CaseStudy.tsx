import { ArrowDown } from "lucide-react";
import type { CaseStudy as CaseStudyType, ProjectFlow } from "@/lib/content";
import MermaidDiagram from "./MermaidDiagram";

function FlowDiagram({ flow, id }: { flow: ProjectFlow; id: string }) {
  return (
    <figure className="project-diagram" aria-labelledby={id}>
      <figcaption id={id}>구성도 <span>{flow.caption}</span></figcaption>
      {flow.lanes.map((lane) => (
        <div className="diagram-lane" key={lane.label}>
          <p className="lane-label">{lane.label}</p>
          <ol className="diagram-steps">
            {lane.steps.map((step, index) => (
              <li className="diagram-step" key={step.title}>
                {index > 0 && <span className="diagram-edge"><ArrowDown size={15} aria-hidden="true" /><span>{step.via || "다음 단계"}</span></span>}
                <div className="diagram-node"><strong>{step.title}</strong><span>{step.detail}</span></div>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <p className="diagram-note">{flow.note}</p>
    </figure>
  );
}

export default function CaseStudy({ item }: { item: CaseStudyType }) {
  const id = `project-${item.number}`;
  return (
    <article className="project-story" id={id} aria-labelledby={`${id}-title`}>
      <header className="project-header">
        <p className="project-overline">PROJECT {item.number} <span>{item.period}</span></p>
        <h3 id={`${id}-title`}>{item.title}</h3>
        {item.summary && <p className="project-summary">{item.summary}</p>}
        <dl className="project-meta">
          <div><dt>{item.roleLabel || "담당"}</dt><dd>{item.role}</dd></div>
          {item.team && <div><dt>팀 공동 작업</dt><dd>{item.team}</dd></div>}
          {item.stack && <div><dt>기술</dt><dd>{item.stack}</dd></div>}
        </dl>
      </header>
      {item.sections.map((section, index) => {
        const sectionId = `${id}-section-${index}`;
        if (section.flow) return <FlowDiagram key={sectionId} flow={section.flow} id={`${id}-diagram`} />;
        return (
          <section className="story-section story-result" key={sectionId} aria-labelledby={sectionId}>
            <h4 id={sectionId}>{section.title}</h4>
            {section.blocks.map((block, blockIndex) => {
              if (block.type === "diagram") return <MermaidDiagram key={blockIndex} source={block.source} caption={block.caption} />;
              if (block.type === "list") return <ul key={blockIndex}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
              if (block.type === "heading") return <h5 className="story-subheading" key={blockIndex}>{block.text}</h5>;
              return <p key={blockIndex}>{block.text}</p>;
            })}
          </section>
        );
      })}
    </article>
  );
}
