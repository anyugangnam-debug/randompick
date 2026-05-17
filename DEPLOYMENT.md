# 랜덤뽑기 사이트 배포 가이드

## 1. Vercel 배포 방법 (추천)
Next.js 프로젝트는 제작사인 Vercel을 통해 가장 쉽고 완벽하게 배포할 수 있습니다. SEO, SSR, 이미지 최적화 등의 기능을 별도 설정 없이 100% 활용할 수 있습니다.

### Vercel 배포 순서
1. **GitHub에 코드 푸시**
   ```bash
   git add .
   git commit -m "초기 설정 완료"
   git push origin main
   ```
2. Vercel(https://vercel.com)에 로그인 (GitHub 계정 연동 권장)
3. **Add New Project** 클릭
4. 조금 전 푸시한 **가챠뽑기(랜덤뽑기)** 레포지토리 선택 (Import)
5. Framework Preset이 **Next.js**로 자동 인식되는지 확인
6. **Deploy** 버튼 클릭
7. 배포가 완료되면 Vercel에서 제공하는 URL(예: `https://gacha-picker.vercel.app`)을 통해 접속

---

## 2. GitHub Pages 배포 방법
정적 사이트 호스팅 방식인 GitHub Pages를 사용할 수 있습니다. 단, 이 경우 정적 내보내기(Static Export)를 지원하지 않는 일부 Next.js 서버 기능(예: Image 최적화 컴포넌트 일부, Server Actions 등)에 제한이 생길 수 있습니다.

### GitHub Pages 배포 순서
1. `next.config.ts` 파일 수정
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: "export",  // 정적 내보내기 활성화
     images: { unoptimized: true }, // GitHub Pages에서는 이미지 최적화 지원 안 함
     // basePath: "/repo-name", // (선택) 커스텀 도메인이 아니라면 레포지토리 이름을 입력해야 할 수 있음
   };

   export default nextConfig;
   ```
2. **GitHub Actions Workflow 생성**
   프로젝트 루트에 `.github/workflows/deploy.yml` 파일을 만들고 아래 코드를 작성합니다.
   ```yaml
   name: Deploy Next.js site to Pages
   on:
     push:
       branches: ["main"]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: "20"
             cache: npm
         - name: Install dependencies
           run: npm ci
         - name: Build with Next.js
           run: npx next build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./out
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```
3. GitHub 레포지토리의 **Settings > Pages** 메뉴로 이동
4. **Build and deployment > Source** 옵션을 `GitHub Actions`로 변경
5. 코드를 푸시하면 Actions 탭에서 빌드 및 배포가 진행됩니다.
