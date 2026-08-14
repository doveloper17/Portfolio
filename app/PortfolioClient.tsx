"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Database,
  Download,
  GitBranch,
  Layers3,
  Mail,
  MapPin,
  Network,
  Phone,
  ServerCog,
} from "lucide-react";
import { useState } from "react";
import type { CaseStudy as CaseStudyType, SiteContent } from "@/lib/content";

const skillIcons = { code: Code2, server: ServerCog, database: Database, network: Network };
const moreWorkIcons = { layers: Layers3, server: ServerCog, network: Network };

function CaseStudy({ item }: { item: CaseStudyType }) {
  const [open, setOpen] = useState(item.number === "01");
  return (
    <article className={`case-study ${open ? "is-open" : ""}`}>
      <button className="case-heading" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="case-number">{item.number}</span>
        <span className="case-intro">
          <span className="case-period">{item.period}</span>
          <strong>{item.title}</strong>
          <span>{item.summary}</span>
        </span>
        <span className="case-toggle" aria-hidden="true"><ChevronDown size={20} /></span>
      </button>
      <div className="case-metrics" aria-label={`${item.title} 핵심 성과`}>
        <span className="case-metrics-title">Key impact</span>
        <div className="case-metric-list">
          {item.metrics.map((metric) => <span key={metric}>{metric}</span>)}
        </div>
      </div>
      {open && (
        <div className="case-detail">
          <div className="case-flow" aria-label="개선 전후 비교">
            <div className="case-flow-block before">
              <p className="detail-label">Challenge</p>
              <h4>개선 전</h4>
              <p>{item.problem}</p>
            </div>
            <div className="case-flow-arrow" aria-hidden="true"><ArrowRight size={21} /></div>
            <div className="case-flow-block after">
              <p className="detail-label">Outcome</p>
              <h4>개선 후</h4>
              <p>{item.result}</p>
            </div>
          </div>
          <div className="case-decisions">
            <div>
              <p className="detail-label">My contribution</p>
              <h4>기술적 판단과 기여</h4>
            </div>
            <ol>
              {item.actions.map((action, index) => (
                <li key={action}><span>{String(index + 1).padStart(2, "0")}</span><p>{action}</p></li>
              ))}
            </ol>
          </div>
          <div className="case-stack">
            <span>Stack</span>
            <p>{item.stack}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function PortfolioClient({ content }: { content: SiteContent }) {
  const { resume, career, portfolio } = content;
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label={`${resume.name} 포트폴리오 홈`}>Do Hoon<span>.</span></a>
        <nav aria-label="주요 메뉴">
          <a href="#resume">이력서</a><a href="#career">경력기술서</a><a href="#portfolio">포트폴리오</a>
        </nav>
        <a className="icon-link" href={resume.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub 열기"><GitBranch size={20} /></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span />{resume.role} · {resume.location}</p>
          <h1>{resume.headline}<br /><em>{resume.accentHeadline}</em></h1>
          <p className="hero-description">{resume.introduction}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#portfolio">대표 프로젝트 보기 <ArrowDown size={18} /></a>
            <button className="text-button" onClick={() => window.print()}><Download size={18} /> PDF로 저장</button>
          </div>
        </div>
        <div className="hero-visual" aria-label="주요 성과 요약">
          <div className="flow-node node-source">External systems<span>API · EDI · Webhook</span></div>
          <div className="flow-line line-one" />
          <div className="flow-node node-core">Backend platform<span>Java · Kotlin · Spring</span></div>
          <div className="flow-line line-two" />
          <div className="flow-node node-product">Product data<span>Reliable · Observable</span></div>
          <div className="signal signal-one" /><div className="signal signal-two" />
        </div>
      </section>

      <section className="impact-strip" aria-label="핵심 경력 수치">
        {resume.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <section className="section resume-section" id="resume">
        <div className="section-kicker"><span>01</span> RESUME</div>
        <div className="section-grid">
          <div>
            <h2>{resume.resumeTitle}</h2>
            <p className="lead">{resume.resumeDescription}</p>
          </div>
          <div className="profile-list">
            <a href={`mailto:${resume.email}`}><Mail size={17} /><span>Email</span><strong>{resume.email}</strong></a>
            <a href={`tel:${resume.phone.replace(/\s/g, "")}`}><Phone size={17} /><span>Phone</span><strong>{resume.phone}</strong></a>
            <div><MapPin size={17} /><span>Location</span><strong>{resume.location}</strong></div>
            <a href={resume.githubUrl} target="_blank" rel="noreferrer"><GitBranch size={17} /><span>GitHub</span><strong>{resume.githubLabel}</strong></a>
          </div>
        </div>
        <div className="skill-grid">
          {resume.skills.map(({ label, icon, values }) => { const Icon = skillIcons[icon]; return <div className="skill-row" key={label}><Icon size={20} /><span>{label}</span><strong>{values}</strong></div>; })}
        </div>
      </section>

      <section className="section career-section" id="career">
        <div className="section-kicker"><span>02</span> CAREER</div>
        <div className="section-heading-row"><h2>경력기술서</h2><p>{career.subtitle}</p></div>
        <div className="career-layout">
          <aside><BriefcaseBusiness size={22} /><strong>Experience</strong><span>{career.range}</span></aside>
          <div className="timeline">
            {career.items.map((item, index) => <article key={item.company} className="timeline-item">
              <span className="timeline-dot">{index === 0 && <span>Latest</span>}</span>
              <div className="timeline-date">{item.date}</div>
              <div><h3>{item.company}</h3><p className="timeline-role">{item.role}</p><p>{item.detail}</p></div>
            </article>)}
          </div>
        </div>
        <div className="career-highlight">
          <span>{career.highlightTitle}</span>
          {career.highlights.map((highlight) => <div key={highlight}>{highlight}</div>)}
        </div>
      </section>

      <section className="section portfolio-section" id="portfolio">
        <div className="section-kicker"><span>03</span> SELECTED WORK</div>
        <div className="section-heading-row"><h2>{portfolio.title}</h2><p>{portfolio.subtitle}</p></div>
        <div className="cases">{portfolio.cases.map((item) => <CaseStudy item={item} key={item.number} />)}</div>
      </section>

      <section className="section other-work">
        <div className="section-kicker"><span>+</span> MORE WORK</div>
        <div className="other-grid">{portfolio.moreWork.map((item) => { const Icon = moreWorkIcons[item.icon]; return <article key={item.title}><Icon size={23} /><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.actions.map((action) => <li key={action}>{action}</li>)}</ul><strong>{item.result}</strong></article>; })}</div>
      </section>

      <footer>
        <div><p className="eyebrow"><span />LET&apos;S BUILD RELIABLE SYSTEMS</p><h2>함께 일할 백엔드 개발자를<br />찾고 계신가요?</h2></div>
        <div className="footer-contact"><a href={`mailto:${resume.email}`}>{resume.email} <ArrowUpRight size={19} /></a><a href={resume.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={19} /></a></div>
        <p className="copyright">© 2026 Lee Dohoon. Built with care for clarity.</p>
      </footer>
    </main>
  );
}
