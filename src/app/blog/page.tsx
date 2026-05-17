import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "블로그",
  description: "랜덤뽑기, 팀나누기 등과 관련된 유용한 팁과 활용 사례를 공유합니다.",
};

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">📝 블로그</h1>
        <p className="text-gray-500">유용한 팁과 활용 사례</p>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Link href={`/blog/post-${i}`} key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition block">
            <h2 className="text-xl font-bold mb-2">샘플 블로그 포스트 {i}</h2>
            <p className="text-gray-500 text-sm">SEO 최적화를 위한 블로그 포스트 예시입니다...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
