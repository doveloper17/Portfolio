import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이도훈 | Backend Engineer",
  description: "외부 시스템과 복잡한 데이터 흐름을 안정적인 서비스 구조로 전환하는 백엔드 개발자 이도훈의 이력서와 포트폴리오",
  metadataBase: new URL("https://doveloper17.github.io/Portfolio/"),
  openGraph: {
    title: "이도훈 | Backend Engineer",
    description: "Java · Kotlin · Spring 기반 백엔드 엔지니어 포트폴리오",
    type: "website",
    images: ["https://doveloper17.github.io/Portfolio/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
