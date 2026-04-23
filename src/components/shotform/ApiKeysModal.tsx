"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  RotateCcw,
  X,
} from "lucide-react";

type KeyDef = {
  id: string;
  label: string;
  description: string;
  placeholder: string;
};

const API_KEYS: KeyDef[] = [
  {
    id: "openai",
    label: "OpenAI API Key",
    description: "GPT-4 / DALL·E / Whisper 등 사용",
    placeholder: "sk-...",
  },
  {
    id: "anthropic",
    label: "Anthropic API Key",
    description: "Claude 모델 사용",
    placeholder: "sk-ant-...",
  },
  {
    id: "gemini",
    label: "Google Gemini API Key",
    description: "Gemini Pro / Ultra 사용",
    placeholder: "AIza...",
  },
  {
    id: "elevenlabs",
    label: "ElevenLabs API Key",
    description: "AI 음성(TTS) 생성",
    placeholder: "xi-...",
  },
  {
    id: "replicate",
    label: "Replicate API Key",
    description: "이미지 / 영상 생성 모델",
    placeholder: "r8_...",
  },
  {
    id: "runway",
    label: "Runway API Key",
    description: "AI 영상 생성",
    placeholder: "runway_...",
  },
  {
    id: "suno",
    label: "Suno API Key",
    description: "AI 음악 생성",
    placeholder: "suno_...",
  },
  {
    id: "youtube_data",
    label: "YouTube Data API Key",
    description: "채널·영상 메타데이터 분석",
    placeholder: "AIza...",
  },
  {
    id: "google_cloud",
    label: "Google Cloud Service Account",
    description: "서비스 계정 JSON (한 줄로 붙여넣기)",
    placeholder: '{"type":"service_account", ...}',
  },
];

const STORAGE_KEY = "wingsaistudio:apikeys";

export default function ApiKeysModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValues(JSON.parse(raw));
    } catch {}
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1500);
    } catch {}
  }

  function reset() {
    if (!confirm("모든 API 키를 초기화하시겠어요?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setValues({});
  }

  function copyValue(id: string) {
    const v = values[id];
    if (!v) return;
    navigator.clipboard.writeText(v).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1000);
    });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col animate-fade-in-up"
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">API 키 설정</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI 서비스 이용을 위한 API 키를 입력하세요. 브라우저에만 저장됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {API_KEYS.map((k) => {
            const isVisible = visible[k.id];
            const v = values[k.id] ?? "";
            return (
              <div key={k.id}>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-semibold text-slate-700">
                    {k.label}
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {k.description}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type={isVisible ? "text" : "password"}
                    value={v}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [k.id]: e.target.value }))
                    }
                    placeholder={k.placeholder}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-orange-400 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 font-mono"
                  />
                  <button
                    onClick={() =>
                      setVisible((prev) => ({ ...prev, [k.id]: !isVisible }))
                    }
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                    aria-label={isVisible ? "숨기기" : "보기"}
                  >
                    {isVisible ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyValue(k.id)}
                    disabled={!v}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="복사"
                  >
                    {copied === k.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            재설정
          </button>
          <div className="flex items-center gap-2">
            {savedFlash && (
              <span className="text-xs text-green-600 font-semibold">
                ✓ 저장됨
              </span>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors"
            >
              취소
            </button>
            <button
              onClick={save}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
