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
  Network,
  Phone,
  ServerCog,
} from "lucide-react";
import { useState } from "react";
import type { CaseStudy as CaseStudyType, SiteContent } from "@/lib/content";

const skillIcons = { code: Code2, server: ServerCog, database: Database, network: Network };
const moreWorkIcons = { layers: Layers3, server: ServerCog, network: Network };

function CaseStudy({ item }: { item: CaseStudyType }) {
  const [open, setOpen] = useState(true);
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
      <div className="case-context">
        <span className="case-context-title">Evidence</span>
        <div className="case-context-list">
          <div><span>측정 기준</span><p>{item.evidence}</p></div>
          <div><span>{item.team}</span><p>{item.role}</p></div>
        </div>
      </div>
      <div className="case-detail" aria-hidden={!open}>
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
          {item.architecture && (
            <div className="case-architecture" aria-label={`${item.title} 구조 변화`}>
              <div>
                <span>Before</span>
                <p>{item.architecture.before.join(" → ")}</p>
              </div>
              <ArrowRight className="case-architecture-arrow" size={21} aria-hidden="true" />
              <div className="after">
                <span>After</span>
                <p>{item.architecture.after.join(" → ")}</p>
              </div>
            </div>
          )}
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
          {item.collaboration && (
            <div className="case-collaboration">
              <span>Collaboration</span>
              <p>{item.collaboration}</p>
            </div>
          )}
          <div className="case-stack">
            <span>Stack</span>
            <p>{item.stack}</p>
          </div>
      </div>
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
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span />{resume.role}</p>
          <h1>{resume.headline}<br /><em>{resume.accentHeadline}</em></h1>
          <p className="hero-description">{resume.introduction}</p>
          <p className="hero-status"><span>{resume.currentStatus}</span><span>{resume.availability}</span></p>
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
            <a href={resume.githubUrl} target="_blank" rel="noreferrer"><GitBranch size={17} /><span>GitHub</span><strong>{resume.githubLabel}</strong></a>
          </div>
        </div>
        <div className="skill-grid">
          {resume.skills.map(({ label, icon, values }) => { const Icon = skillIcons[icon]; return <div className="skill-row" key={label}><Icon size={20} /><span>{label}</span><strong>{values}</strong></div>; })}
        </div>
        <div className="employment">
          <div className="employment-heading">
            <BriefcaseBusiness size={21} />
            <div><strong>{resume.employmentTitle}</strong><span>{resume.employmentRange}</span></div>
          </div>
          <div className="employment-list">
            {resume.employment.map((item) => (
              <article key={`${item.company}-${item.date}`}>
                <time>{item.date}</time>
                <div><h3>{item.company}</h3><strong>{item.role}</strong></div>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section career-section" id="career">
        <div className="section-kicker"><span>02</span> CAREER</div>
        <div className="section-heading-row"><h2>경력기술서</h2>{career.subtitle && <p>{career.subtitle}</p>}</div>
        <div className="career-areas">
          {career.areas.map((area) => (
            <article className="career-area" key={area.number}>
              <div className="career-area-meta"><span>{area.number}</span></div>
              <div className="career-area-intro"><h3>{area.title}</h3><p>{area.summary}</p></div>
              <div className="career-area-detail">
                <ul>{area.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
                <div className="career-area-ownership"><span>Ownership</span><strong>{area.ownership}</strong></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section portfolio-section" id="portfolio">
        <div className="section-kicker"><span>03</span> SELECTED WORK</div>
        <div className="section-heading-row"><h2>{portfolio.title}</h2>{portfolio.subtitle && <p>{portfolio.subtitle}</p>}</div>
        <div className="cases">{portfolio.cases.map((item) => <CaseStudy item={item} key={item.number} />)}</div>
      </section>

      <section className="section other-work">
        <div className="section-kicker"><span>+</span> MORE WORK</div>
        <div className="other-grid">{portfolio.moreWork.map((item) => { const Icon = moreWorkIcons[item.icon]; return <article key={item.title}><Icon size={23} /><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.actions.map((action) => <li key={action}>{action}</li>)}</ul><strong>{item.result}</strong></article>; })}</div>
      </section>

      <footer>
        <div><p className="eyebrow"><span />LET&apos;S BUILD RELIABLE SYSTEMS</p><h2>함께 일할 백엔드 개발자를<br />찾고 계신가요?</h2></div>
        <div className="footer-contact"><a href={`mailto:${resume.email}`}>{resume.email} <ArrowUpRight size={19} /></a></div>
        <p className="copyright">© 2026 Lee Dohoon. Built with care for clarity.</p>
      </footer>
    </main>
  );
}
