import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "번호 추첨기",
  description: "번호추첨, 랜덤 번호 뽑기, 추첨기 - 시작 번호와 끝 번호를 지정하면 해당 범위 내에서 무작위 번호를 추첨합니다. 이벤트 추첨에 최적화!",
};

export default function NumberPickerPage() {
  return <ClientPage />;
}
