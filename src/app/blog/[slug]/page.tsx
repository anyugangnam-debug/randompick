import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "post-1" },
    { slug: "post-2" },
    { slug: "post-3" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `포스트: ${resolvedParams.slug}`,
    description: `${resolvedParams.slug}에 대한 자세한 정보입니다.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <article className="prose dark:prose-invert lg:prose-lg mx-auto">
      <h1>{resolvedParams.slug}</h1>
      <p>SEO에 최적화된 블로그 포스트 내용이 들어갈 자리입니다.</p>
      <p>이곳에 H2, H3 태그 등 시맨틱 마크업을 활용하여 콘텐츠를 작성하면 SEO 점수가 올라갑니다.</p>
    </article>
  );
}
