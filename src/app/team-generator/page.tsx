import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "팀 나누기",
  description: "팀 나누기, 랜덤 팀 배정, 조 나누기 - 인원수와 팀 개수를 입력하면 공평하게 랜덤으로 팀을 나누어 드립니다. 워크샵, 게임, 조별과제에 필수!",
};

export default function TeamGeneratorPage() {
  return <ClientPage />;
}
