"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Home,
  Search,
  TrendingUp,
  X,
} from "lucide-react";

const PERIODS = [
  { value: "1m", label: "1개월" },
  { value: "3m", label: "3개월" },
  { value: "6m", label: "6개월" },
  { value: "1y", label: "1년" },
];

const COUNTRIES = [
  { value: "KR", label: "대한민국", flag: "🇰🇷" },
  { value: "US", label: "미국", flag: "🇺🇸" },
  { value: "JP", label: "일본", flag: "🇯🇵" },
  { value: "GLOBAL", label: "전세계", flag: "🌐" },
];

const CATEGORIES = [
  { value: "all", label: "전체" },
  { value: "entertainment", label: "엔터테인먼트" },
  { value: "education", label: "교육" },
  { value: "gaming", label: "게임" },
  { value: "music", label: "음악" },
  { value: "tech", label: "IT/기술" },
];

const SORTS = [
  { value: "views", label: "태그별 평균 조회수" },
  { value: "growth", label: "성장률" },
  { value: "latest", label: "최신순" },
];

export default function YoutubeAnalyticsPage() {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("3m");
  const [country, setCountry] = useState("KR");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("views");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [hasCountryChip, setHasCountryChip] = useState(true);
  const [hasSortChip, setHasSortChip] = useState(true);

  const selectedCountry = COUNTRIES.find((c) => c.value === country)!;
  const selectedPeriod = PERIODS.find((p) => p.value === period)!;

  function clearAll() {
    setHasCountryChip(false);
    setHasSortChip(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-white to-rose-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Top nav */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-sm text-slate-700 hover:border-pink-300 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로가기
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-sm text-slate-700 hover:border-pink-300 hover:text-pink-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            홈으로
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
          YouTube 트렌드 분석기
        </h1>

        {/* Search panel */}
        <div className="bg-gradient-to-br from-teal-50/60 to-cyan-50/60 border border-teal-100/60 rounded-2xl p-5 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="키워드를 입력하세요. (예: 시니어 꿀팁)"
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-pink-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setPeriodOpen((v) => !v)}
                className="inline-flex items-center justify-between gap-2 min-w-[120px] px-4 py-3 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 hover:border-pink-300 transition-colors"
              >
                {selectedPeriod.label}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              {periodOpen && (
                <div className="absolute right-0 mt-1 w-full bg-white rounded-lg border border-slate-200 shadow-lg z-10 overflow-hidden">
                  {PERIODS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => {
                        setPeriod(p.value);
                        setPeriodOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-pink-50 ${
                        period === p.value
                          ? "text-pink-600 font-semibold"
                          : "text-slate-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:shadow-lg transition-all">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 mr-1">검색 옵션</span>
              <button
                onClick={() => {
                  const next =
                    COUNTRIES[
                      (COUNTRIES.findIndex((c) => c.value === country) + 1) %
                        COUNTRIES.length
                    ];
                  setCountry(next.value);
                  setHasCountryChip(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium hover:bg-pink-200 transition-colors"
              >
                <span>{selectedCountry.flag}</span>
                {selectedCountry.label}
              </button>
              <button
                onClick={() => {
                  const next =
                    CATEGORIES[
                      (CATEGORIES.findIndex((c) => c.value === category) + 1) %
                        CATEGORIES.length
                    ];
                  setCategory(next.value);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:border-pink-300 transition-colors"
              >
                {CATEGORIES.find((c) => c.value === category)!.label}
              </button>
              <button
                onClick={() => {
                  const next =
                    PERIODS[
                      (PERIODS.findIndex((p) => p.value === period) + 1) %
                        PERIODS.length
                    ];
                  setPeriod(next.value);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:border-pink-300 transition-colors"
              >
                최근 {selectedPeriod.label}
              </button>
            </div>

            {(hasCountryChip || hasSortChip) && (
              <div className="flex flex-wrap items-center gap-2">
                {hasCountryChip && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-medium">
                    국가: {selectedCountry.label}
                    <button
                      onClick={() => setHasCountryChip(false)}
                      className="hover:text-pink-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {hasSortChip && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-medium">
                    {SORTS.find((s) => s.value === sort)!.label}
                    <button
                      onClick={() => setHasSortChip(false)}
                      className="hover:text-pink-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAll}
                  className="text-xs text-pink-500 hover:text-pink-700 underline underline-offset-2"
                >
                  모두 지우기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <TrendingUp className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-lg text-slate-600 font-medium mb-1">
            분석할 키워드를 검색하세요
          </p>
          <p className="text-sm text-slate-400">
            관심 있는 주제의 유튜브 트렌드를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
