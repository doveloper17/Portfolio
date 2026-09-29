import type { CaseStudy, MoreWork, SiteContent, StoryBlock } from "./content";

// The reviewed Markdown is also the site's content source. Preserve its order and wording.
export function plainText(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").trim();
}

export function parsePortfolio(source: string): SiteContent["portfolio"] {
  const chunks = source.split(/^## /m).slice(1).map((chunk) => {
    const end = chunk.indexOf("\n");
    return { title: chunk.slice(0, end).trim(), body: chunk.slice(end + 1).trim() };
  });
  const aboutSource = chunks.find((chunk) => chunk.title === "자기소개");
  const skillsSource = chunks.find((chunk) => chunk.title === "기술 스택");
  const operations = chunks.find((chunk) => chunk.title === "유지보수 / 운영");
  if (!aboutSource || !skillsSource || !operations) throw new Error("통합본의 자기소개·기술 스택·유지보수 / 운영을 확인하세요.");
  const [introduction, ...aboutParts] = aboutSource.body.split(/^### /m);
  const about = aboutParts.map((part) => {
    const end = part.indexOf("\n");
    return { title: part.slice(0, end).trim(), text: plainText(part.slice(end + 1)) };
  });
  const icons = ["server", "database", "network", "code"] as const;
  const skills = skillsSource.body.split("\n").filter((line) => line.startsWith("- ")).map((line, index) => {
    const separator = line.indexOf(":");
    return { label: line.slice(2, separator), values: line.slice(separator + 1).trim(), icon: icons[index % icons.length] };
  });
  const cases: CaseStudy[] = chunks.filter((chunk) => /^\d{2}\./.test(chunk.title)).map((chunk) => {
    const number = chunk.title.slice(0, 2);
    const item: CaseStudy = { number, title: chunk.title.slice(4).trim(), period: "", role: "", sections: [] };
    let section: CaseStudy["sections"][number] | undefined;
    let pending: string[] = [];
    let diagram: string[] | undefined;
    let caption = "구성도";
    const getBlocks = (): StoryBlock[] => {
      if (!section) {
        section = { title: "작업 범위", blocks: [] };
        item.sections.push(section);
      }
      return section.blocks;
    };
    const flush = () => {
      if (pending.length) getBlocks().push({ type: "paragraph", text: plainText(pending.join(" ")) });
      pending = [];
    };
    for (const raw of chunk.body.split("\n")) {
      const line = raw.trim();
      if (diagram !== undefined) {
        if (line === "```") {
          getBlocks().push({ type: "diagram", source: diagram.join("\n"), caption });
          diagram = undefined;
        } else diagram.push(raw);
        continue;
      }
      if (line === "```mermaid") { flush(); diagram = []; continue; }
      if (!line || line === "---") { flush(); continue; }
      const meta = line.match(/^\*\*(기간|담당|개인 담당|팀 공동 작업):\*\*\s*(.+)$/);
      if (meta) {
        if (meta[1] === "기간") item.period = meta[2];
        else if (meta[1] === "팀 공동 작업") item.team = meta[2];
        else { item.role = meta[2]; item.roleLabel = meta[1]; }
        continue;
      }
      if (line.startsWith("### ")) {
        flush(); section = { title: line.slice(4), blocks: [] }; item.sections.push(section); caption = section.title; continue;
      }
      if (line.startsWith("#### ") || /^\*\*.+\*\*$/.test(line)) {
        flush(); caption = plainText(line.replace(/^#### /, "")); getBlocks().push({ type: "heading", text: caption }); continue;
      }
      if (line.startsWith("- ")) {
        flush(); const blocks = getBlocks(); const last = blocks.at(-1);
        if (last?.type === "list") last.items.push(plainText(line.slice(2)));
        else blocks.push({ type: "list", items: [plainText(line.slice(2))] });
        continue;
      }
      pending.push(line);
    }
    flush();
    if (diagram !== undefined || !item.period || !item.role) throw new Error(`프로젝트 ${number}의 메타 정보 또는 구성도를 확인하세요.`);
    return item;
  });
  const moreWork: MoreWork[] = operations.body.split(/^### /m).slice(1).map((part) => {
    const end = part.indexOf("\n");
    const lines = part.slice(end + 1).split("\n").map((line) => line.trim()).filter((line) => line && line !== "---");
    return { title: part.slice(0, end).trim(), icon: "server", summary: lines.filter((line) => !line.startsWith("- ")).join(" "), actions: lines.filter((line) => line.startsWith("- ")).map((line) => plainText(line.slice(2))) };
  });
  if (!cases.length || !about.length || !skills.length) throw new Error("통합본의 주요 콘텐츠가 비어 있습니다.");
  return { title: "포트폴리오", subtitle: "", introduction: plainText(introduction), about, skills, cases, moreWork };
}
