"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  LogOut,
  Moon,
  User,
  UserCog,
} from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center size-9 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
        aria-label="계정"
      >
        <User className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in-up">
          <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-pink-50 to-orange-50">
            <p className="text-sm font-semibold text-slate-800">게스트</p>
            <p className="text-xs text-slate-500 mt-0.5">로그인 후 이용해주세요</p>
          </div>
          <nav className="py-1">
            <DropdownItem icon={UserCog} label="내 계정" />
            <DropdownItem icon={Moon} label="다크 모드" right={<ChevronDown className="w-3 h-3 rotate-[-90deg]" />} />
            <DropdownItem icon={HelpCircle} label="도움말" />
            <div className="h-px bg-slate-100 my-1" />
            <DropdownItem icon={LogOut} label="로그아웃" danger />
          </nav>
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  icon: Icon,
  label,
  right,
  danger,
}: {
  icon: typeof User;
  label: string;
  right?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
        danger ? "text-rose-600" : "text-slate-700"
      }`}
    >
      <span className="inline-flex items-center gap-2.5">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      {right}
    </button>
  );
}
