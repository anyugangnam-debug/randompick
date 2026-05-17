import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "룰렛 돌리기",
  description: "룰렛 돌리기, 랜덤 룰렛, 온라인 룰렛 - 모바일에서 바로 사용하는 부드러운 룰렛 돌리기. 항목을 추가하고 빙글빙글 룰렛을 돌려보세요.",
};

export default function RoulettePage() {
  return <ClientPage />;
}
