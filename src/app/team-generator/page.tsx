import { Metadata } from "next";

export const metadata: Metadata = {
  title: "팀 나누기",
  description: "인원수와 팀 개수를 입력하면 공평하게 랜덤으로 팀을 나누어 드립니다. 워크샵, 게임, 조별과제에 필수!",
};

export default function TeamGeneratorPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">👥 팀 나누기</h1>
        <p className="text-gray-500">이름을 입력하고 몇 팀으로 나눌지 선택하세요.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center py-12 text-gray-500">
        팀 나누기 폼 및 결과 UI 영역
      </div>
      
      <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 text-sm">
        [Google AdSense Banner Area]
      </div>
    </div>
  );
}
