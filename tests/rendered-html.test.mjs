import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /이도훈 \| Backend Engineer/);
  assert.match(html, /외부 데이터를 신뢰 가능한 API로 만드는/);
  assert.match(html, /구직 중/);
  assert.match(html, /입사 가능 시점 협의 가능/);
  assert.doesNotMatch(html, /Manager\(직급\)/);
  assert.match(html, /전체 흐름/);
  assert.match(html, /신뢰 가능한 데이터/);
  assert.match(html, /점진적 전환/);
  assert.match(html, /운영 책임/);
  const portfolio = html.slice(html.indexOf('id="portfolio"'), html.indexOf('<footer'));
  assert.equal((portfolio.match(/class="project-story/g) ?? []).length, 7);
  assert.equal((portfolio.match(/<figure /g) ?? []).length, 7);
  for (const number of ["01", "02", "03", "04", "05", "06"]) {
    assert.ok(portfolio.includes('id="project-' + number + '-title"'));
  }
  assert.match(portfolio, /id="project-07-title">유지보수 \/ 운영/);
  assert.doesNotMatch(portfolio, /구성도 원문 보기/);
  assert.match(portfolio, /주요 구현 약 1개월/);
  assert.match(portfolio, /주요 구현 약 3주/);
  assert.match(portfolio, /팀 공동 작업/);
  assert.match(html, /NoSQL\(Cosmos DB\)/);
  const about = html.slice(html.indexOf('id="about"'), html.indexOf('id="career"'));
  assert.equal((about.match(/class="about-topic"/g) ?? []).length, 3);
  assert.match(about, /기능 구현 이전에, 서비스의 전체 흐름을 봅니다/);
  assert.match(about, /dohun1017@naver\.com/);
  assert.doesNotMatch(html, /id="resume"/);
  assert.match(about, /개발 이후의 운영까지 맡으며 개선점을 찾습니다/);
  assert.match(about, /변경의 이유와 영향을 관계자들과 함께 맞춥니다/);
  assert.match(portfolio, /한 달치 데이터 수집 완료 기간: 약 30일 → 15일/);
  assert.match(portfolio, /1분 이상 → 약 5초/);
  assert.match(portfolio, /데드레터 큐/);
  assert.match(portfolio, /약 1,000ms에서 500ms로 감소/);
  assert.match(portfolio, /30분간 유지되는 쿠키/);
  assert.match(portfolio, /한국 시간\(UTC\+9\)/);
  assert.match(portfolio, /공급자–출발항–도착항 조합 약 5.9만 개/);
  assert.doesNotMatch(portfolio, /중복 BL|EDI 처리 중 예외|유효 스케줄 약 1.7만|검토 메모|사용자 확인/);
  assert.doesNotMatch(html, /TypeScript|CTR 0.31%|약 3천 회 호출/);
  assert.doesNotMatch(html, /조회 기능 개발 속도 약 30% 향상 예상/);
  assert.doesNotMatch(html, /수집량 2.5배 증가/);
  const operations = portfolio.slice(portfolio.indexOf('id="project-07"'));
  for (const title of ["광고 플랫폼 - 링고", "화이트라벨", "OV 선박명 개선", "정시성 데이터 제공", "배포 환경·서비스 통신", "개발 작업 자동화"]) assert.ok(operations.includes('<h4>' + title + '</h4>'));
  assert.ok(!operations.includes("AI ETA"));
  assert.match(operations, /링고 백엔드 담당자/);
  assert.doesNotMatch(operations, /CRM|Trial|확인 기간|작업 기록|월 평균 약 7건/);
  assert.match(portfolio, /RDB 커밋 후 메시지 큐에 이벤트를 발행/);
  assert.doesNotMatch(portfolio, /문서 갱신 성공 후|실패 시 RDB 롤백|CTR 0.36%/);
  assert.match(html, /핵심 경력 요약/);
  assert.match(operations, /PROJECT 07 <span>2022\.08–2026\.06<\/span>/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
});
