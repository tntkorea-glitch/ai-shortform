"use client";

import { useEffect, useState } from "react";
import {
  CircleCheck,
  FileText,
  Image as ImageIcon,
  Play,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";

const STEPS = [
  {
    icon: FileText,
    label: "대본",
    gradient: "from-blue-500 to-cyan-500",
    progressingMessage: "대본을 작성하고 있습니다...",
  },
  {
    icon: ImageIcon,
    label: "이미지",
    gradient: "from-purple-500 to-pink-500",
    progressingMessage: "이미지를 생성하고 있습니다...",
  },
  {
    icon: Volume2,
    label: "음성",
    gradient: "from-amber-500 to-orange-500",
    progressingMessage: "음성을 생성하고 있습니다...",
  },
  {
    icon: Play,
    label: "영상",
    gradient: "from-pink-500 to-red-500",
    progressingMessage: "영상을 합성하고 있습니다...",
  },
];

export default function ProgressIndicator() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pt-4 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
      <div className="relative py-8">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < active;
            const isActive = idx === active;
            const isLast = idx === STEPS.length - 1;

            return (
              <div key={step.label} className="flex items-center">
                <div
                  className={`relative flex flex-col items-center transition-all duration-500 ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                      isDone || isActive
                        ? `bg-gradient-to-br ${step.gradient} shadow-xl`
                        : "bg-white/80 border-2 border-slate-200"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 ${
                        isDone || isActive ? "text-white" : "text-slate-400"
                      }`}
                    />
                    {isDone && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                        <CircleCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs md:text-sm font-medium transition-colors duration-500 ${
                      isDone || isActive ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                    </div>
                  )}
                </div>

                {!isLast && (
                  <div className="relative w-8 md:w-16 h-1 mx-1 md:mx-2">
                    <div className="absolute inset-0 bg-slate-200 rounded-full" />
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: isDone ? "100%" : isActive ? "50%" : "0%",
                      }}
                    />
                    {isActive && (
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-move-dot"
                        style={{ left: "50%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 via-red-500/10 to-orange-500/10 border border-pink-200/50">
            <Zap className="w-4 h-4 text-pink-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-700">
              {STEPS[active].progressingMessage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
