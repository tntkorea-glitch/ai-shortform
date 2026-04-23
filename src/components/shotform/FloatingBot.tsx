"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type Message = { id: string; role: "bot" | "user"; text: string };

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: "안녕하세요! 윙스봇입니다. 무엇을 도와드릴까요?",
};

export default function FloatingBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hide on the dedicated chatbot page to avoid overlap
  if (pathname === "/wings-chatbot") return null;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "(AI 연동은 곧 추가돼요 — 임시 응답입니다)",
        },
      ]);
    }, 500);
  }

  return (
    <>
      {/* Collapsed: floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center"
          aria-label="윙스봇 열기"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Expanded: chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[340px] sm:w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <h3 className="text-sm font-bold text-white">윙스봇</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-white/90 hover:text-white hover:bg-white/15 transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-orange-50/20"
          >
            {messages.map((m) =>
              m.role === "bot" ? (
                <div key={m.id} className="flex">
                  <div className="max-w-[85%] bg-white text-slate-800 text-sm leading-relaxed px-3 py-2 rounded-xl rounded-tl-sm border border-slate-200 shadow-sm">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm leading-relaxed px-3 py-2 rounded-xl rounded-tr-sm shadow-sm">
                    {m.text}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-orange-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-orange-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                  input.trim()
                    ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md hover:shadow-lg"
                    : "bg-orange-200 text-white/80 cursor-not-allowed"
                }`}
                aria-label="전송"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
