import { Metadata } from "next";

export const metadata: Metadata = {
  title: "다중 제비뽑기",
  description: "여러 개의 당첨을 한 번에 뽑아야 할 때 사용하는 다중 선택기.",
};

export default function RandomPickerPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🎟️ 다중 제비뽑기</h1>
        <p className="text-gray-500">한 번에 여러 명의 당첨자를 뽑습니다.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center py-12 text-gray-500">
        여러 개 선택 가능한 폼
      </div>
    </div>
  );
}
