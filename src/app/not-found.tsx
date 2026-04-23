import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Construction className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
          준비 중입니다
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          이 기능은 곧 만나보실 수 있어요
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
