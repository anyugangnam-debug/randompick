import { Metadata } from "next";

export const metadata: Metadata = {
  title: "벌칙 뽑기",
  description: "술자리, MT, 모임에서 사용할 수 있는 재미있는 벌칙 랜덤 뽑기.",
};

export default function PunishmentPickerPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">⚡ 벌칙 뽑기</h1>
        <p className="text-gray-500">긴장감 넘치는 랜덤 벌칙 룰렛</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center py-12 text-gray-500">
        벌칙 프리셋 및 커스텀 벌칙 뽑기 영역
      </div>
    </div>
  );
}
