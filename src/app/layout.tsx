import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | 랜덤뽑기 - 가장 빠르고 직관적인 랜덤 선택기",
    default: "랜덤뽑기 - 가장 빠르고 직관적인 랜덤 선택기",
  },
  description: "회원가입 없이 즉시 사용 가능한 랜덤 뽑기, 룰렛, 팀 나누기, 벌칙 뽑기 유틸리티",
  openGraph: {
    title: "랜덤뽑기 - 가장 빠르고 직관적인 랜덤 선택기",
    description: "회원가입 없이 즉시 사용 가능한 모바일 최적화 랜덤 뽑기 유틸리티",
    url: "https://anyugangnam-debug.github.io/randompick",
    siteName: "랜덤뽑기",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://anyugangnam-debug.github.io/randompick",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased dark:bg-gray-900 bg-gray-50">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E2ZVH8GQYT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E2ZVH8GQYT');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col text-gray-900 dark:text-gray-100 font-sans">
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
              🎲 랜덤뽑기
            </Link>
            <nav className="hidden sm:flex gap-4">
              <Link href="/roulette" className="text-sm font-medium hover:text-indigo-600">룰렛</Link>
              <Link href="/random-picker" className="text-sm font-medium hover:text-indigo-600">제비뽑기</Link>
              <Link href="/team-generator" className="text-sm font-medium hover:text-indigo-600">팀나누기</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
          {children}
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8 mt-auto">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} 랜덤뽑기. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/blog" className="hover:text-gray-900 dark:hover:text-gray-100">블로그</Link>
              <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">개인정보처리방침</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
