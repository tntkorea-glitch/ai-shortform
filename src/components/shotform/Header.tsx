"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import ApiKeysModal from "./ApiKeysModal";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  const [apiModalOpen, setApiModalOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-200/50 text-pink-700 text-sm font-semibold">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              wingsAIStudio ShotForm
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100">
              부스텍AI홈
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <button
              title="API 키 설정"
              onClick={() => setApiModalOpen(true)}
              className="inline-flex items-center justify-center size-9 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <ApiKeysModal open={apiModalOpen} onClose={() => setApiModalOpen(false)} />
    </header>
  );
}
