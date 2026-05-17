import { Metadata } from "next";

export const metadata: Metadata = {
  title: "번호 추첨기",
  description: "시작 번호와 끝 번호를 지정하면 해당 범위 내에서 무작위 번호를 추첨합니다. 이벤트 추첨에 최적화!",
};

export default function NumberPickerPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🔢 번호 추첨기</h1>
        <p className="text-gray-500">범위를 지정하고 행운의 번호를 뽑아보세요.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center py-12 text-gray-500">
        최소/최대 번호 입력 및 추첨기 UI 영역
      </div>
    </div>
  );
}
