import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "벌칙 뽑기",
  description: "벌칙뽑기, 랜덤 벌칙, 게임 벌칙 추천 - 술자리, MT, 모임에서 사용할 수 있는 재미있는 벌칙 랜덤 뽑기.",
};

export default function PunishmentPickerPage() {
  return <ClientPage />;
}
