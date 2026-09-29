"use client";

import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  GitBranch,
  Mail,
  Network,
  Phone,
  ServerCog,
} from "lucide-react";
import type { SiteContent } from "@/lib/content";
import CaseStudy from "./CaseStudy";

const skillIcons = { code: Code2, server: ServerCog, database: Database, network: Network };

export default function PortfolioClient({ content }: { content: SiteContent }) {
  const { resume, career, portfolio } = content;
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label={`${resume.name} 포트폴리오 홈`}>Do Hoon<span>.</span></a>
        <nav aria-label="주요 메뉴">
          <a href="#about">About me</a><a href="#career">경력 요약</a><a href="#portfolio">포트폴리오</a>
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
          <div className="flow-node node-core">Backend platform<span>Java · Spring Boot</span></div>
          <div className="flow-line line-two" />
          <div className="flow-node node-product">Product data<span>Reliable · Observable</span></div>
          <div className="signal signal-one" /><div className="signal signal-two" />
        </div>
      </section>

      <section className="impact-strip" aria-label="핵심 경력 수치">
        {resume.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-title">
        <div className="section-kicker"><span>01</span> ABOUT</div>
        <div className="section-heading-row about-heading"><h2 id="about-title">About me</h2></div>
        <div className="section-grid about-content">
          <div className="about-topics">
            <article className="about-topic about-topic-primary">
              <h3>{resume.resumeTitle}</h3>
              <p>{resume.resumeDescription}</p>
            </article>
            {portfolio.about.map((topic) => <article className="about-topic" key={topic.title}><h3>{topic.title}</h3><p>{topic.text}</p></article>)}
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
        <div className="section-kicker"><span>02</span> CAREER SUMMARY</div>
        <div className="section-heading-row"><h2>핵심 경력 요약</h2>{career.subtitle && <p>{career.subtitle}</p>}</div>
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
        <nav className="project-nav" aria-label="프로젝트 바로가기">
          {portfolio.cases.map((item) => <a href={`#project-${item.number}`} key={item.number}><span className="project-nav-number">{item.number}</span><span className="project-nav-title">{item.title}</span></a>)}
          <a href="#project-07"><span className="project-nav-number">07</span><span className="project-nav-title">유지보수 / 운영</span></a>
        </nav>
        <div className="project-stories">
          {portfolio.cases.map((item) => <CaseStudy item={item} key={item.number} />)}
          <section className="project-story portfolio-operations" id="project-07" aria-labelledby="project-07-title">
            <header className="project-header">
              <p className="project-overline">PROJECT 07 <span>2022.08–2026.06</span></p>
              <h3 id="project-07-title">유지보수 / 운영</h3>
              <p className="project-summary">트레드링스 재직 기간 동안 주요 프로젝트와 함께 수행한 제품 개발 및 운영 업무입니다.</p>
            </header>
            <div className="operations-list">{portfolio.moreWork.map((item) => <article key={item.title}><h4>{item.title}</h4><div>{item.summary && <p>{item.summary}</p>}<ul>{item.actions.map((action) => <li key={action}>{action}</li>)}</ul>{item.result && <strong>{item.result}</strong>}</div></article>)}</div>
          </section>
        </div>
      </section>

      <footer>
        <div><p className="eyebrow"><span />LET&apos;S BUILD RELIABLE SYSTEMS</p><h2>함께 일할 백엔드 개발자를<br />찾고 계신가요?</h2></div>
        <div className="footer-contact"><a href={`mailto:${resume.email}`}>{resume.email} <ArrowUpRight size={19} /></a></div>
        <p className="copyright">© 2026 Lee Dohoon. Built with care for clarity.</p>
      </footer>
    </main>
  );
}
