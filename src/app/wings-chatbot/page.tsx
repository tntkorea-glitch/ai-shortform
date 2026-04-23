"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Bot, Home, Send } from "lucide-react";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const INITIAL_GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: "안녕하세요! 윙스AI입니다. 유튜브 관련 질문이 있으시면 무엇이든 물어보세요. 채널 성장, 콘텐츠 기획, 편집 팁, 알고리즘 등 모든 것을 도와드립니다.",
};

export default function WingsChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "(AI 연동은 곧 추가돼요 — 이 응답은 임시 메시지입니다)",
        },
      ]);
    }, 500);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Top nav + title row */}
        <div className="flex items-start gap-3 mb-8">
          <div className="flex gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors shadow-sm"
              aria-label="뒤로"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors shadow-sm"
              aria-label="홈"
            >
              <Home className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-2">
              <span role="img" aria-label="speech">
                💬
              </span>
              윙스AI 1:1봇
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              유튜브 전문가 AI와 1:1 상담
            </p>
          </div>
        </div>

        {/* Chat card */}
        <div className="bg-emerald-50/60 border border-emerald-100/70 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-emerald-100/70 flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-700">채팅</h2>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="p-5 md:p-6 space-y-4 min-h-[320px] max-h-[480px] overflow-y-auto">
            {messages.map((m) =>
              m.role === "bot" ? (
                <div key={m.id} className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="max-w-[80%] bg-emerald-100/70 text-slate-800 text-sm leading-relaxed px-4 py-3 rounded-xl rounded-tl-sm">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-3 justify-end">
                  <div className="max-w-[80%] bg-white text-slate-800 text-sm leading-relaxed px-4 py-3 rounded-xl rounded-tr-sm border border-slate-200 shadow-sm">
                    {m.text}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-emerald-100/70 bg-white/50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="유튜브 관련 질문을 입력하세요..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-slate-200 focus:border-emerald-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                  input.trim()
                    ? "bg-slate-700 hover:bg-slate-800 text-white shadow-md"
                    : "bg-slate-300 text-white/80 cursor-not-allowed"
                }`}
                aria-label="전송"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
