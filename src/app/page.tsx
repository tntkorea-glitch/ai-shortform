import Link from "next/link";
import {
  ArrowRight,
  ChartColumn,
  ChartLine,
  MessageSquare,
  Scissors,
  ShoppingBag,
  Zap,
} from "lucide-react";
import Header from "@/components/shotform/Header";
import ProgressIndicator from "@/components/shotform/ProgressIndicator";

type Feature = {
  icon: typeof Scissors;
  title: string;
  description: string;
  href: string;
  iconGradient: string;
  hoverGradient: string;
  recommended?: boolean;
};

const shortformFeatures: Feature[] = [
  {
    icon: Scissors,
    title: "일반 숏폼",
    description: "1,2,3분 AI 숏폼 영상",
    href: "/shorts",
    iconGradient: "bg-gradient-to-br from-pink-500 via-red-500 to-orange-500",
    hoverGradient: "bg-gradient-to-br from-pink-500 via-red-500 to-orange-500",
  },
  {
    icon: ShoppingBag,
    title: "쇼핑 숏폼",
    description: "15초~20초 쇼핑 영상을 빠르게 제작",
    href: "/shopping",
    iconGradient: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500",
    hoverGradient: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500",
    recommended: true,
  },
  {
    icon: ChartColumn,
    title: "채널 분석",
    description: "채널 데이터를 종합적으로 분석하여 성장 전략을 제시합니다",
    href: "/channel-analysis",
    iconGradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500",
    hoverGradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500",
  },
];

const toolFeatures: Feature[] = [
  {
    icon: ChartColumn,
    title: "유튜브 분석",
    description: "데이터 기반 인사이트로 채널 성장을 돕습니다",
    href: "/youtube-analytics",
    iconGradient: "bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500",
    hoverGradient: "bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500",
  },
  {
    icon: ChartLine,
    title: "유튜브 실시간 분석",
    description: "실시간 키워드 트렌드를 한눈에 확인",
    href: "/youtube-trends",
    iconGradient: "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500",
    hoverGradient: "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500",
  },
  {
    icon: MessageSquare,
    title: "윙스AI 1:1봇",
    description: "AI가 1:1로 답변해드립니다",
    href: "/wings-chatbot",
    iconGradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500",
    hoverGradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const Icon = feature.icon;
  return (
    <Link
      href={feature.href}
      className={`group block relative overflow-hidden rounded-xl border-0 shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-2xl cursor-pointer hover:scale-[1.02] ${
        feature.recommended ? "ring-2 ring-pink-200 ring-offset-2" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {feature.recommended && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 shadow-md">
            추천
          </span>
        </div>
      )}
      <div
        className={`absolute inset-0 ${feature.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 group-hover:from-transparent group-hover:to-transparent transition-all duration-300" />
      <div className="relative p-6 md:p-8 h-full flex flex-col min-h-[220px]">
        <div
          className={`p-4 rounded-2xl ${feature.iconGradient} shadow-lg group-hover:scale-110 transition-transform duration-300 w-fit mb-4`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300 mb-2">
          {feature.title}
        </h3>
        <p className="text-sm md:text-base text-slate-600 group-hover:text-white/90 transition-colors duration-300 flex-grow">
          {feature.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500 group-hover:text-white/70 transition-colors duration-300">
            바로 시작하기
          </span>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-100">
      {/* Decorative background blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-100/10 to-orange-100/10 rounded-full blur-3xl" />
      </div>

      <Header />

      {/* Main */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          {/* Hero */}
          <section className="text-center py-8 md:py-12 lg:py-16 space-y-6">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 bg-clip-text text-transparent min-h-[1.2em]">
                AI 숏폼 자동 제작
                <span className="animate-blink text-slate-400">|</span>
              </h1>
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 rounded-full animate-pulse" />
              </div>
            </div>
            <p
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              15초 쇼츠를 빠르고 쉽게 제작하세요
            </p>

            <ProgressIndicator />

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up"
              style={{ animationDelay: "1.5s" }}
            >
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 rounded-md w-full sm:w-auto px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                지금 바로 쇼츠 만들기
              </button>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 rounded-md w-full sm:w-auto px-8 text-base font-semibold border-2 border-slate-300 bg-white/80 shadow-xs hover:bg-slate-100 transition-all text-slate-900"
              >
                모든 기능 살펴보기
              </a>
            </div>
          </section>

          {/* Features */}
          <div id="features" className="space-y-12 md:space-y-16 mt-16 md:mt-24">
            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  숏폼 제작
                </h2>
                <p className="text-base text-slate-600">
                  15초 쇼츠를 빠르고 쉽게 제작하세요
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortformFeatures.map((feature, idx) => (
                  <FeatureCard key={feature.title} feature={feature} index={idx} />
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  분석 &amp; 도구
                </h2>
                <p className="text-base text-slate-600">
                  채널 성장과 운영을 돕는 보조 도구
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolFeatures.map((feature, idx) => (
                  <FeatureCard key={feature.title} feature={feature} index={idx} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/50 bg-white/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-slate-600 space-y-2">
            <p className="font-semibold text-slate-900">© 2026 wingsAIStudio ShotForm</p>
            <p className="text-xs text-slate-500">AI 기반 유튜브 영상 제작 플랫폼</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
