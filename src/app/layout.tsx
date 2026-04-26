import type { Metadata } from "next";
import Script from "next/script";
import FloatingBot from "@/components/shotform/FloatingBot";
import "./globals.css";
import "../../public/design-system/tokens.css";

export const metadata: Metadata = {
  title: "WingsAIStudio",
  description: "AI 기반 유튜브 영상 제작 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <Script src="/inapp-guard.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingBot />
      </body>
    </html>
  );
}
