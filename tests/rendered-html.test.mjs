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
  assert.match(html, /물동량 데이터 수집 구조 개선/);
  assert.match(html, /경력기술서/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
});
