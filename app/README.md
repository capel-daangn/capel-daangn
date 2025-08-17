# Resume App

이 프로젝트는 개인 이력서를 다국어로 표시하는 Next.js 웹 애플리케이션입니다.

## 개인정보 관리

개인정보(이메일, LinkedIn, GitHub 주소)는 중앙화된 설정 파일에서 관리됩니다.

### 설정 파일 위치
```
src/config/personal.json
```

### 설정 파일 구조
```json
{
  "contact": {
    "email": "your.email@example.com",
    "linkedin": "https://www.linkedin.com/in/your-profile",
    "github": "https://github.com/your-username"
  }
}
```

### 개인정보 업데이트 방법
1. `src/config/personal.json` 파일을 수정
2. 모든 언어 파일과 컴포넌트에서 자동으로 반영됨

## 다국어 지원

- 한국어 (ko)
- 영어 (en)  
- 일본어 (jp)

각 언어의 메시지 파일은 `src/messages/` 디렉토리에 있으며, 개인정보는 `{{personal.contact.email}}` 형태의 템플릿을 사용하여 자동으로 치환됩니다.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
