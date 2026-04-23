"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

export default function YoutubeTrendsPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Top nav */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-10 mt-8 md:mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            유튜브 실시간 분석
          </h1>
          <p className="text-base md:text-lg text-slate-500">
            Google Trends 기반으로 YouTube 키워드 트렌드를 실시간으로 분석합니다
          </p>
        </div>

        {/* Search card */}
        <div className="bg-emerald-50/60 border border-emerald-100/70 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
            키워드 분석
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            분석하고 싶은 YouTube 키워드를 입력하세요
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="예: 쇼츠 편집, 유튜브 마케팅"
              className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-emerald-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
            <button
              disabled={!query.trim()}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                query.trim()
                  ? "bg-emerald-900 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg"
                  : "bg-emerald-900/50 text-white/80 cursor-not-allowed"
              }`}
            >
              <Search className="w-4 h-4" />
              분석하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
