import matter from "gray-matter";
import resumeSource from "@/content/이력서.md";
import careerSource from "@/content/경력기술서.md";
import portfolioSource from "@/content/포트폴리오.md";

export type Skill = { label: string; icon: "code" | "server" | "database" | "network"; values: string };
export type Employment = { company: string; role: string; date: string; detail: string };
export type CareerArea = {
  number: string;
  title: string;
  summary: string;
  responsibilities: string[];
  ownership: string;
};
export type CaseStudy = {
  number: string;
  period: string;
  title: string;
  summary: string;
  metrics: string[];
  evidence: string;
  team: string;
  role: string;
  collaboration?: string;
  stack: string;
  problem: string;
  actions: string[];
  result: string;
  architecture?: { before: string[]; after: string[] };
};
export type MoreWork = { icon: "layers" | "server" | "network"; title: string; summary: string; actions: string[]; result: string };
export type SiteContent = {
  resume: {
    name: string; role: string; headline: string; accentHeadline: string; introduction: string;
    currentStatus: string; availability: string;
    email: string; phone: string; githubLabel: string; githubUrl: string; careerDuration: string;
    resumeTitle: string; resumeDescription: string; stats: { value: string; label: string }[]; skills: Skill[];
    employmentTitle: string; employmentRange: string; employment: Employment[];
  };
  career: { subtitle: string; areas: CareerArea[] };
  portfolio: { title: string; subtitle: string; cases: CaseStudy[]; moreWork: MoreWork[] };
};

function readFrontMatter<T>(source: string, filename: string): T {
  const parsed = matter(source);
  if (!Object.keys(parsed.data).length) throw new Error(`${filename}의 YAML front matter가 비어 있습니다.`);
  return parsed.data as T;
}

export function loadSiteContent(): SiteContent {
  const resume = readFrontMatter<SiteContent["resume"]>(resumeSource, "이력서.md");
  const career = readFrontMatter<SiteContent["career"]>(careerSource, "경력기술서.md");
  const portfolio = readFrontMatter<SiteContent["portfolio"]>(portfolioSource, "포트폴리오.md");
  if (!resume.skills?.length || !resume.employment?.length || !career.areas?.length || !portfolio.cases?.length) {
    throw new Error("Markdown front matter에 skills, employment, areas, cases 데이터가 필요합니다.");
  }
  return { resume, career, portfolio };
}
