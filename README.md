# 이도훈 Backend Engineer Portfolio

이력서, 경력기술서와 대표 프로젝트를 하나로 구성한 정적 포트폴리오입니다.

## Local development

Node.js 22.13 이상이 필요합니다.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run build:pages
```

- `npm run build`: Sites 배포용 vinext 빌드
- `npm run build:pages`: GitHub Pages 정적 빌드 (`out/`)

`main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 GitHub Pages 배포를 실행합니다. 저장소 이름이 `Portfolio`가 아닌 경우 workflow의 `GITHUB_PAGES_BASE_PATH`를 저장소 경로에 맞게 변경해야 합니다.

## Content

홈페이지 문구와 데이터는 아래 Markdown 파일의 YAML front matter에서 관리합니다.

- `content/이력서.md`: 소개, 연락처, 핵심 수치, 기술 스택
- `content/경력기술서.md`: 회사별 경력과 주요 업무 범위
- `content/포트폴리오.md`: 대표 프로젝트와 More Work

파일을 저장하면 개발 서버에서는 자동 반영되며, 배포 환경에서는 다시 빌드할 때 반영됩니다. 화면 구조와 디자인은 `app/PortfolioClient.tsx`, `app/globals.css`에서 관리합니다.
