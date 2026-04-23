"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Home,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

type Tab = "projects" | "guide";

export default function ShoppingPage() {
  const [tab, setTab] = useState<Tab>("projects");
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  function openModal() {
    setNewName("");
    setNewDesc("");
    setIsModalOpen(true);
  }

  function createProject() {
    if (!newName.trim()) return;
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newName.trim(),
        description: newDesc.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            홈으로
          </Link>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            쇼핑 숏폼
          </h1>
          <div className="w-20" />
        </div>

        {/* Tabs + action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="inline-flex gap-2">
            <button
              onClick={() => setTab("projects")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "projects"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                  : "bg-white border border-orange-100 text-slate-600 hover:border-orange-300"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              프로젝트 목록
            </button>
            <button
              onClick={() => setTab("guide")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "guide"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                  : "bg-white border border-orange-100 text-slate-600 hover:border-orange-300"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              가이드북 보기
            </button>
          </div>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />새 프로젝트 만들기
          </button>
        </div>

        {tab === "projects" ? (
          <>
            <p className="text-sm text-slate-500 mb-3">
              쇼핑 상품 프로젝트를 관리하세요
            </p>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="프로젝트 검색..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-orange-100 focus:border-orange-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* List or empty */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-slate-600 mb-5">
                  {projects.length === 0
                    ? "프로젝트가 없습니다"
                    : "검색 결과가 없습니다"}
                </p>
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />새 프로젝트 만들기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-white border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
                        <ShoppingBag className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-800 flex-1">
                        {p.name}
                      </h3>
                    </div>
                    {p.description && (
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {p.description}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 mt-3">
                      {new Date(p.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl border border-orange-100 p-8 text-center">
            <BookOpen className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <p className="text-slate-600">가이드북 준비 중입니다</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            메인으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-7 animate-fade-in-up"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  새 프로젝트 만들기
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              프로젝트의 이름과 설명을 입력하여 새 프로젝트를 생성합니다
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  프로젝트 이름
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="프로젝트 이름을 입력하세요"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-orange-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  설명 (선택사항)
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="프로젝트 설명을 입력하세요"
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-orange-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
              >
                취소
              </button>
              <button
                onClick={createProject}
                disabled={!newName.trim()}
                className={`px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all ${
                  newName.trim()
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 shadow-md hover:shadow-lg"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
