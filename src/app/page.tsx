"use client";

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const addItem = () => {
    if (input.trim() && !items.includes(input.trim())) {
      setItems([...items, input.trim()]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const startPicking = () => {
    if (items.length < 2) return;
    
    setIsPicking(true);
    setResult(null);
    
    let count = 0;
    const maxCount = 20; // 20 times animation
    const interval = setInterval(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setResult(randomItem);
      count++;
      
      if (count >= maxCount) {
        clearInterval(interval);
        setIsPicking(false);
        // Set final result
        const finalItem = items[Math.floor(Math.random() * items.length)];
        setResult(finalItem);
      }
    }, 100);
  };

  return (
    <div className="space-y-12">
      {/* Main Hero / Quick Picker */}
      <section className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          간편한 <span className="text-indigo-500">제비뽑기</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          회원가입 없이 즉시 사용 가능한 랜덤뽑기. 항목을 입력하고 시작하세요!
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
          {/* Result Area */}
          <div className="h-32 flex items-center justify-center mb-6 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden relative">
            {result ? (
              <div className={`text-3xl font-bold transition-all ${isPicking ? 'scale-110 text-indigo-400 blur-[1px]' : 'scale-100 text-indigo-600 dark:text-indigo-400'}`}>
                {result}
              </div>
            ) : (
              <div className="text-gray-400 dark:text-gray-500">결과가 여기에 표시됩니다</div>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="항목 입력 (예: 치킨)"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition"
              disabled={isPicking}
            />
            <button
              onClick={addItem}
              disabled={isPicking || !input.trim()}
              className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 transition"
            >
              추가
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 max-h-40 overflow-y-auto p-1">
            {items.map((item, i) => (
              <div key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm flex items-center gap-2">
                {item}
                <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500" disabled={isPicking}>
                  &times;
                </button>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-sm text-gray-400 w-full text-center py-2">
                추가된 항목이 없습니다.
              </div>
            )}
          </div>

          <button
            onClick={startPicking}
            disabled={isPicking || items.length < 2}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            {isPicking ? "뽑는 중..." : "시작하기"}
          </button>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 text-sm">
        [Google AdSense Banner Area]
      </section>

      {/* Other Tools Links */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { href: "/roulette", title: "룰렛 돌리기", icon: "🎡" },
          { href: "/team-generator", title: "팀 나누기", icon: "👥" },
          { href: "/number-picker", title: "번호 추첨", icon: "🔢" },
          { href: "/punishment-picker", title: "벌칙 뽑기", icon: "⚡" },
          { href: "/random-picker", title: "다중 제비뽑기", icon: "🎟️" },
        ].map((tool) => (
          <Link key={tool.href} href={tool.href} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-500 hover:shadow-md transition-all text-center space-y-2 group">
            <div className="text-3xl group-hover:scale-110 transition-transform">{tool.icon}</div>
            <div className="font-medium">{tool.title}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
