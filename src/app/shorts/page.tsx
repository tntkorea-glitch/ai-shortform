"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Clock, Home, Sparkles, Video } from "lucide-react";

type Category = {
  id: string;
  label: string;
  emoji: string;
};

const CATEGORIES: Category[] = [
  { id: "quote", label: "명언", emoji: "💡" },
  { id: "health", label: "건강", emoji: "📱" },
  { id: "self", label: "자기계발", emoji: "📚" },
  { id: "trend", label: "사회(트렌드)", emoji: "📱" },
  { id: "history", label: "역사", emoji: "📜" },
  { id: "universe", label: "우주", emoji: "🪐" },
  { id: "saju", label: "사주", emoji: "🙂" },
  { id: "psychology", label: "심리학", emoji: "🧠" },
  { id: "custom", label: "직접입력", emoji: "✏️" },
];

const DURATIONS = [
  { value: "15s", label: "15초" },
  { value: "30s", label: "30초" },
  { value: "1m", label: "1분" },
  { value: "2m", label: "2분" },
  { value: "3m", label: "3분" },
];

export default function ShortsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("1m");
  const [customInput, setCustomInput] = useState("");

  const canGenerate =
    selectedCategory !== null &&
    (selectedCategory !== "custom" || customInput.trim().length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          {/* Banner header */}
          <div className="relative px-6 md:px-10 py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  쇼츠 영상 제작
                </h1>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">홈으로</span>
              </Link>
            </div>
            <p className="mt-2 text-sm text-white/90">
              AI로 쉽고 빠르게 쇼츠 영상을 만들어보세요
            </p>
          </div>

          {/* Main content */}
          <div className="px-6 md:px-10 py-8 md:py-12">
            {/* Category */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                카테고리 선택
              </h2>
              <p className="text-sm text-slate-500">
                원하는 콘텐츠 카테고리를 선택해주세요
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group flex flex-col items-center justify-center gap-3 py-6 md:py-8 px-4 rounded-xl border-2 transition-all ${
                      active
                        ? "bg-gradient-to-br from-pink-100 to-purple-100 border-purple-400 shadow-md scale-[1.02]"
                        : "bg-teal-50/50 border-teal-100 hover:border-purple-200 hover:bg-teal-50 hover:shadow-sm"
                    }`}
                  >
                    <span className="text-4xl md:text-5xl leading-none">
                      {cat.emoji}
                    </span>
                    <span
                      className={`text-sm md:text-base font-semibold ${
                        active ? "text-purple-700" : "text-slate-700"
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom input - only when 직접입력 selected */}
            {selectedCategory === "custom" && (
              <div className="mb-6 animate-fade-in-up">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="원하는 주제를 입력하세요 (예: 최신 AI 트렌드)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-slate-700 placeholder:text-slate-400"
                />
              </div>
            )}

            {/* Duration */}
            <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-5 md:p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-500" />
                <h3 className="text-base md:text-lg font-bold text-slate-800">
                  영상 길이 선택
                </h3>
              </div>
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {DURATIONS.map((d) => {
                  const active = selectedDuration === d.value;
                  return (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDuration(d.value)}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium ${
                        active
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-md"
                          : "bg-white border-teal-100 text-slate-600 hover:border-purple-200"
                      }`}
                    >
                      <Clock
                        className={`w-3.5 h-3.5 ${
                          active ? "text-white" : "text-slate-400"
                        }`}
                      />
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button
              disabled={!canGenerate}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base md:text-lg font-bold transition-all ${
                canGenerate
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] cursor-pointer"
                  : "bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 text-white/90 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              주제 생성하기
            </button>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
