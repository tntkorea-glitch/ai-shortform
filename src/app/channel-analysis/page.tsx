"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  ChartColumn,
  Home,
  Sparkles,
  Video,
} from "lucide-react";

export default function ChannelAnalysisPage() {
  const [input, setInput] = useState("");
  const canSubmit = input.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 text-slate-100">
      {/* Decorative glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4" />
            홈으로
          </Link>
        </div>

        {/* Hero */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
            <ChartColumn className="w-8 h-8 text-purple-300" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              채널 분석
            </h1>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-400 mb-10 ml-0 md:ml-[72px]">
          YouTube 채널 데이터를 수집하고 AI가 분석, 인사이트를 종합적으로
          분석합니다
        </p>

        {/* Input card */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg md:text-xl font-bold text-white">
              채널 정보 입력
            </h2>
          </div>

          <label className="block text-sm text-slate-400 mb-2">
            채널 ID, URL 또는 채널명
          </label>
          <div className="relative">
            <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="YouTube 채널 ID 또는 URL, 채널명을 입력하세요. 예: @skip1ro, PewDiePie"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-purple-500 focus:outline-none text-sm text-white placeholder:text-slate-500"
            />
          </div>

          <div className="flex justify-end mt-5">
            <button
              disabled={!canSubmit}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                canSubmit
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              채널 분석 시작
            </button>
          </div>
        </div>

        {/* Example tips */}
        <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
          <p className="text-xs text-slate-500 mb-2">입력 예시</p>
          <div className="flex flex-wrap gap-2">
            {["@MrBeast", "PewDiePie", "UCX6OQ3DkcsbYNE6H8uQQuVA"].map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="px-2.5 py-1 rounded-md bg-slate-700/50 hover:bg-purple-500/30 text-xs text-slate-300 hover:text-purple-200 transition-colors border border-slate-600/50 hover:border-purple-500/50"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
