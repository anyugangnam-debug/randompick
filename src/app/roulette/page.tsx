import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "룰렛 돌리기",
  description: "모바일에서 바로 사용하는 부드러운 룰렛 돌리기. 항목을 추가하고 빙글빙글 룰렛을 돌려보세요.",
};

export default function RoulettePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🎡 룰렛 돌리기</h1>
        <p className="text-gray-500">원판 룰렛을 돌려 무작위로 하나를 선택하세요.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-full max-w-[300px] mx-auto flex items-center justify-center border-4 border-indigo-500 shadow-inner mb-8">
          <span className="text-gray-400">룰렛 컴포넌트 영역</span>
        </div>
        
        <p className="text-center text-sm text-gray-500 mb-4">
          ※ 룰렛 기능은 현재 준비 중입니다. (기본 제비뽑기를 사용해주세요!)
        </p>

        <Link href="/">
          <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-transform active:scale-95">
            제비뽑기로 돌아가기
          </button>
        </Link>
      </div>
      
      {/* AdSense Placeholder */}
      <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 text-sm">
        [Google AdSense Banner Area]
      </div>
    </div>
  );
}
