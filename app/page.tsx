"use client";

import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
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

const skills = [
  { label: "Language", icon: Code2, values: "Java · Kotlin · TypeScript" },
  { label: "Backend", icon: ServerCog, values: "Spring Boot · Batch · JPA · QueryDSL · NestJS" },
  { label: "Data", icon: Database, values: "PostgreSQL · MySQL · MSSQL · Cosmos DB · Redis" },
  { label: "Platform", icon: Network, values: "Azure · AKS · Kubernetes · Docker · Service Bus" },
];

const cases = [
  {
    number: "01",
    period: "2024.03 - 2025.08",
    title: "물동량 데이터 수집 구조 개선",
    summary: "불안정한 PC 크롤링을 데이터 사용 목적 중심의 배치 파이프라인으로 전환했습니다.",
    metrics: ["일 1.8만 → 4.5만 건", "운영 PC 12대 → VM 1대", "수집량 2.5배"],
    stack: "Java · Spring Batch · NestJS · Azure Service Bus · VM",
    problem: "IP 차단, CAPTCHA, 브라우저 중단과 PC 장애로 수집량이 일정하지 않았고 누락 구간 복구에도 많은 운영 시간이 들었습니다.",
    actions: [
      "실패 사유별 메시지 처리, 저장 재시도와 특정 구간 재수집 API를 먼저 구축해 기존 구조를 안정화",
      "서비스가 실제 사용하는 BL·컨테이너·기업별 집계 항목을 기준으로 외부 API와 Spring Batch 흐름 재설계",
      "원천 수집과 서비스용 집계를 분리하고 중복 BL 제거, 건수 비교와 정합성 검증을 처리 과정에 포함",
    ],
    result: "처리량을 늘리면서 운영 장비와 장애 요인을 줄였습니다. 실패를 발견하고 재처리할 수 있는 경로까지 함께 설계해 새 구조를 운영자가 신뢰할 수 있게 했습니다.",
  },
  {
    number: "02",
    period: "2026.03 - 2026.05",
    title: "선박 추적 조회 구조 CQRS 전환",
    summary: "약 20개 테이블에 분산된 BL 조회 모델을 Cosmos DB 단일 문서로 통합했습니다.",
    metrics: ["약 20개 테이블 → 1 문서", "gRPC → REST", "AKS 점진 전환"],
    stack: "Java · Spring Boot · Azure Cosmos DB · Kubernetes · REST",
    problem: "한 화면을 위해 다수 테이블과 API를 조합해야 해 필드 추가나 조회 조건 변경 시 영향 범위가 계속 커졌습니다.",
    actions: [
      "조회 사용 사례를 기준으로 문서 경계를 정의하고 기존 쓰기 모델과 조회 모델의 책임을 분리",
      "기존·신규 API 응답 비교와 마이그레이션 데이터 검증을 분리해 오류 원인을 추적할 수 있게 구성",
      "내부 gRPC 호출을 REST로 변경하고 Kubernetes 서비스 통신과 HTTP Proxy까지 전환 범위에 포함",
    ],
    result: "다중 테이블 조회와 API 조합 책임을 줄이고 데이터 의존 범위를 축소했습니다. 기능 코드뿐 아니라 마이그레이션, QA, 배포 경로를 포함한 전환 계획을 담당했습니다.",
  },
  {
    number: "03",
    period: "2023.08 - 2024.12 · 2026.02 - 2026.03",
    title: "광고 관리에서 성과 측정 플랫폼까지",
    summary: "광고 등록, 실제 노출, 클릭 로그와 CTR 집계를 하나의 제품 흐름으로 연결했습니다.",
    metrics: ["광고 구좌 4개", "CTR 자동 집계", "신규 광고 계약"],
    stack: "Java · Spring Boot · JPA · QueryDSL · Azure Blob/Table Storage",
    problem: "광고 관리 데이터와 실제 서비스 노출이 분리돼 있었고, 상품 확대에 따라 슬롯·이미지별 성과와 하위 호환성을 함께 관리해야 했습니다.",
    actions: [
      "광고 상품·카테고리·슬롯·이미지 구조와 CRUD API, 백오피스 기능 개발",
      "노출·클릭 위치, 사용자, IP, 슬롯과 이미지 단위 로그를 수집하고 봇·Google Ads 요청 제외",
      "운영 중인 V1 사용처를 유지하면서 신규 구조와 집계 기준을 V2로 추가해 순차 전환",
    ],
    result: "4개 광고 구좌의 운영과 자동 성과 측정 기반을 만들었습니다. 측정 기간 세로형 CTR 0.31%, 플로팅 CTR 0.36%를 확인했고 신규 광고 계약으로 이어졌습니다.",
  },
  {
    number: "04",
    period: "2025.05 - 2025.07",
    title: "CRM 리드 수집·동기화 자동화",
    summary: "분산된 리드 채널과 Pipedrive 변경 이벤트를 내부 서비스에 일관되게 연결했습니다.",
    metrics: ["유입 채널 3개 통합", "Webhook 9개 이벤트", "실시간 동기화"],
    stack: "Java · Spring Boot · Pipedrive REST API · Webhook · Zapier",
    problem: "Facebook, Calendly, 내부 서비스의 등록 방식이 달라 수동 처리와 누락 위험이 있었고 외부 CRM 변경을 내부 DB에 안정적으로 반영하기 어려웠습니다.",
    actions: [
      "Person, Note, Lead, Deal, Organization API Client와 생성·수정·삭제 이벤트 처리 구현",
      "Update 이벤트 Upsert, Custom Field 저장, 삭제 후 복원 시 연락처 누락 등 외부 API 예외 처리",
      "초기 데이터 적재와 Deal·Lead·Organization 관계를 매핑하고 채널별 유입 흐름 통합",
    ],
    result: "세 개 채널과 아홉 개 Webhook 이벤트를 실시간 동기화해 수동 등록과 지연 가능성을 줄이고 CRM과 내부 서비스 사이의 데이터 기준을 정립했습니다.",
  },
];

const career = [
  { company: "트레드링스", role: "Backend Engineer · Manager", date: "2022.08 - 2026.06", detail: "해운 물류 SaaS의 데이터 수집, 선박 추적, 광고, CRM과 플랫폼 백엔드를 개발했습니다." },
  { company: "프리랜서", role: "Backend / Full-stack Engineer", date: "2021.08 - 2021.12", detail: "신한 O2O 서비스의 백엔드와 운영 기능을 개발했습니다." },
  { company: "티웹", role: "Software Engineer", date: "2020.10 - 2021.07", detail: "Java 기반 업무 시스템과 서비스 기능을 개발했습니다." },
  { company: "드림시스", role: "Software Engineer", date: "2019.08 - 2020.08", detail: "기업용 웹 시스템 개발과 유지보수를 담당했습니다." },
];

function CaseStudy({ item }: { item: (typeof cases)[number] }) {
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
      <div className="case-metrics">{item.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
      {open && (
        <div className="case-detail">
          <div>
            <p className="detail-label">Problem</p>
            <p>{item.problem}</p>
          </div>
          <div>
            <p className="detail-label">My contribution</p>
            <ul>{item.actions.map((action) => <li key={action}><Check size={16} />{action}</li>)}</ul>
          </div>
          <div>
            <p className="detail-label">Result</p>
            <p>{item.result}</p>
          </div>
          <p className="case-stack">{item.stack}</p>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="이도훈 포트폴리오 홈">DH<span>.</span></a>
        <nav aria-label="주요 메뉴">
          <a href="#resume">이력서</a><a href="#career">경력기술서</a><a href="#portfolio">포트폴리오</a>
        </nav>
        <a className="icon-link" href="https://github.com/doveloper17" target="_blank" rel="noreferrer" aria-label="GitHub 열기"><GitBranch size={20} /></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span />BACKEND ENGINEER · SEOUL</p>
          <h1>복잡한 데이터 흐름을<br /><em>운영 가능한 서비스</em>로 만듭니다.</h1>
          <p className="hero-description">외부 API, EDI, Webhook, 크롤링처럼 통제하기 어려운 시스템을 안정적인 데이터와 API로 바꿔온 6년 차 Java·Kotlin 백엔드 개발자 이도훈입니다.</p>
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
        <div><strong>6년 3개월</strong><span>총 개발 경력</span></div>
        <div><strong>2.5×</strong><span>일 수집량 증가</span></div>
        <div><strong>25+</strong><span>연동 선사</span></div>
        <div><strong>20 → 1</strong><span>조회 데이터 구조</span></div>
      </section>

      <section className="section resume-section" id="resume">
        <div className="section-kicker"><span>01</span> RESUME</div>
        <div className="section-grid">
          <div>
            <h2>기능 구현을 넘어,<br />서비스의 전체 흐름을 봅니다.</h2>
            <p className="lead">도메인과 기존 구조를 빠르게 파악하고 반복 장애의 원인을 데이터 구조와 처리 흐름에서 찾습니다. 설계부터 정합성 검증, 배포와 모니터링까지 제품의 전체 수명주기를 경험했습니다.</p>
          </div>
          <div className="profile-list">
            <a href="mailto:dohun1017@naver.com"><Mail size={17} /><span>Email</span><strong>dohun1017@naver.com</strong></a>
            <a href="tel:+821099719279"><Phone size={17} /><span>Phone</span><strong>+82 10-9971-9279</strong></a>
            <div><MapPin size={17} /><span>Location</span><strong>Seoul, Korea</strong></div>
            <a href="https://github.com/doveloper17" target="_blank" rel="noreferrer"><GitBranch size={17} /><span>GitHub</span><strong>doveloper17</strong></a>
          </div>
        </div>
        <div className="skill-grid">
          {skills.map(({ label, icon: Icon, values }) => <div className="skill-row" key={label}><Icon size={20} /><span>{label}</span><strong>{values}</strong></div>)}
        </div>
      </section>

      <section className="section career-section" id="career">
        <div className="section-kicker"><span>02</span> CAREER</div>
        <div className="section-heading-row"><h2>경력기술서</h2><p>총 6년 3개월 · 백엔드 중심의 제품 개발과 운영</p></div>
        <div className="career-layout">
          <aside><BriefcaseBusiness size={22} /><strong>Experience</strong><span>2019 — 2026</span></aside>
          <div className="timeline">
            {career.map((item, index) => <article key={item.company} className="timeline-item">
              <span className="timeline-dot">{index === 0 && <span>Latest</span>}</span>
              <div className="timeline-date">{item.date}</div>
              <div><h3>{item.company}</h3><p className="timeline-role">{item.role}</p><p>{item.detail}</p></div>
            </article>)}
          </div>
        </div>
        <div className="career-highlight">
          <span>트레드링스 주요 범위</span>
          <div>물동량 수집</div><div>선박 추적 / CQRS</div><div>광고 플랫폼</div><div>CRM 자동화</div><div>선사·터미널 연동</div>
        </div>
      </section>

      <section className="section portfolio-section" id="portfolio">
        <div className="section-kicker"><span>03</span> SELECTED WORK</div>
        <div className="section-heading-row"><h2>문제와 판단이 보이는<br />포트폴리오</h2><p>수치뿐 아니라 왜 바꿨고, 어떤 기준으로 설계했는지 정리했습니다.</p></div>
        <div className="cases">{cases.map((item) => <CaseStudy item={item} key={item.number} />)}</div>
      </section>

      <section className="section other-work">
        <div className="section-kicker"><span>+</span> MORE WORK</div>
        <div className="other-grid">
          <article>
            <Layers3 size={23} />
            <h3>선사·터미널 스케줄 연동</h3>
            <p>공급자마다 다른 규격의 해운 스케줄을 제품에서 사용할 수 있는 공통 데이터로 변환했습니다.</p>
            <ul>
              <li>FCL·Vessel·Terminal 수집 API와 정규화 로직 개발</li>
              <li>공식 API, EDIFACT EDI, 웹 크롤링 방식 통합</li>
              <li>누락·중복·선박명 불일치 검증과 재수집 흐름 운영</li>
            </ul>
            <strong>25개 이상 선사 · 6개 터미널 · 일 약 1.7만 유효 스케줄</strong>
          </article>
          <article>
            <ServerCog size={23} />
            <h3>운영 안정화와 모니터링</h3>
            <p>장애 대응을 일회성 조치로 끝내지 않고 로그, 수집 상태와 알림 흐름을 기준으로 반복 원인을 제거했습니다.</p>
            <ul>
              <li>Datadog 로그 기반 서비스 오류 원인과 영향 범위 추적</li>
              <li>크롤링 수집량·실패 구간 모니터링과 복구 로직 점검</li>
              <li>사용하지 않는 모니터링 제거와 알림 기준 정리</li>
            </ul>
            <strong>월 평균 약 7건의 운영 이슈 분석·대응</strong>
          </article>
          <article>
            <Network size={23} />
            <h3>White Label & Integration</h3>
            <p>Ocean Visibility의 추적 기능을 고객사의 서비스와 브랜드 환경에서도 사용할 수 있도록 확장했습니다.</p>
            <ul>
              <li>고객사별 로고·색상·서비스 조건 설정 CRUD API 개발</li>
              <li>Plugin, Partner Mapview, Share Link와 SaaS 데이터 연동</li>
              <li>백오피스 관리 기능, 이메일 템플릿과 선박명 데이터 개선</li>
            </ul>
            <strong>SaaS 직접 방문 없이 고객사 채널에서 추적 기능 제공</strong>
          </article>
        </div>
      </section>

      <footer>
        <div><p className="eyebrow"><span />LET&apos;S BUILD RELIABLE SYSTEMS</p><h2>함께 일할 백엔드 개발자를<br />찾고 계신가요?</h2></div>
        <div className="footer-contact"><a href="mailto:dohun1017@naver.com">dohun1017@naver.com <ArrowUpRight size={19} /></a><a href="https://github.com/doveloper17" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={19} /></a></div>
        <p className="copyright">© 2026 Lee Dohoon. Built with care for clarity.</p>
      </footer>
    </main>
  );
}
