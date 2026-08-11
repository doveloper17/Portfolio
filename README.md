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

주요 경력과 프로젝트 데이터는 `app/page.tsx`, 스타일은 `app/globals.css`에서 관리합니다.
