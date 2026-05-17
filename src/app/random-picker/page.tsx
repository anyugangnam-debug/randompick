import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "다중 제비뽑기",
  description: "제비뽑기, 다중 제비뽑기, 랜덤 매칭 - 여러 개의 당첨을 한 번에 뽑아야 할 때 사용하는 다중 선택기.",
};

export default function RandomPickerPage() {
  return <ClientPage />;
}
