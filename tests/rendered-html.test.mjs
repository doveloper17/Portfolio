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
  assert.match(html, /복잡한 데이터 흐름/);
  assert.match(html, /외부 데이터를 신뢰 가능한 API로 만드는/);
  assert.match(html, /구직 중/);
  assert.match(html, /입사 가능 시점 협의 가능/);
  assert.match(html, /Manager\(직급\)/);
  assert.match(html, /전체 흐름/);
  assert.match(html, /신뢰 가능한 데이터/);
  assert.match(html, /점진적 전환/);
  assert.match(html, /운영 책임/);
  assert.match(html, /물동량 데이터 수집 구조 개선/);
  assert.match(html, /일평균 수집량 1.8만 건 → 4.5만 건/);
  assert.match(html, /재처리 시간 건당 30초 이상 → 약 5초/);
  assert.match(html, /월 가동 기간 약 30일 → 15일/);
  assert.match(html, /운영 환경에서 동일한 조회를 약 30회 측정한 평균 응답 시간/);
  assert.match(html, /평균 응답 시간 약 1,000ms → 500ms/);
  assert.match(html, /총 7명 · 백엔드 4명 · 프론트엔드 1명 · QA 2명/);
  assert.match(html, /노출 약 25,000회 · CTR 0.36%/);
  assert.match(html, /약 26개 터미널 데이터 관리/);
  assert.match(html, /고객사별 API 일평균 약 4천 회 호출/);
  assert.equal((html.match(/class="case-study is-open"/g) ?? []).length, 4);
  assert.doesNotMatch(html, /TypeScript|CTR 0.31%|약 3천 회 호출/);
  assert.doesNotMatch(html, /조회 기능 개발 속도 약 30% 향상 예상/);
  assert.doesNotMatch(html, /수집량 2.5배 증가/);
  assert.match(html, /경력기술서/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
});
