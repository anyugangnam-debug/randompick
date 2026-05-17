"use client";

import { useState, useEffect } from "react";

const DEFAULT_PUNISHMENTS = [
  "물 한 컵 마시기",
  "팔굽혀펴기 10개",
  "노래 한 소절 부르기",
  "웃긴 표정 짓기",
  "친구에게 칭찬 한마디 하기",
  "10초 동안 춤추기",
  "다음 판 진행하기",
];

export default function PunishmentPickerClientPage() {
  const [items, setItems] = useState<string[]>(DEFAULT_PUNISHMENTS);
  const [input, setInput] = useState("");
  const [isPicking, setIsPicking] = useState(false);
  const [displayResult, setDisplayResult] = useState<string | null>(null);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("punishments");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setItems(parsed);
      } catch {}
    }
  }, []);

  const saveItems = (newItems: string[]) => {
    setItems(newItems);
    localStorage.setItem("punishments", JSON.stringify(newItems));
  };

  const addItem = () => {
    const trimmed = input.trim();
    if (trimmed && !items.includes(trimmed)) {
      saveItems([...items, trimmed]);
      setInput("");
    }
  };

  const removeItem = (index: number) => {
    saveItems(items.filter((_, i) => i !== index));
    setFinalResult(null);
    setDisplayResult(null);
  };

  const pickPunishment = () => {
    if (items.length === 0 || isPicking) return;
    setIsPicking(true);
    setFinalResult(null);
    setDisplayResult(null);

    let count = 0;
    const interval = setInterval(() => {
      setDisplayResult(items[Math.floor(Math.random() * items.length)]);
      count++;
      if (count >= 20) {
        clearInterval(interval);
        const final = items[Math.floor(Math.random() * items.length)];
        setDisplayResult(null);
        setFinalResult(final);
        setIsPicking(false);
      }
    }, 90);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">⚡ 벌칙 뽑기</h1>
        <p className="text-gray-500 dark:text-gray-400">긴장감 넘치는 랜덤 벌칙!</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto space-y-6">
        {/* Result display */}
        <div className="h-32 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-100 dark:border-red-900/40">
          {displayResult && (
            <span className="text-xl font-bold text-red-400 blur-[1px] transition-all">{displayResult}</span>
          )}
          {finalResult && !displayResult && (
            <span className="text-xl font-bold text-red-600 dark:text-red-400 text-center px-4 animate-bounce">
              {"🔥 " + finalResult + " 🔥"}
            </span>
          )}
          {!displayResult && !finalResult && (
            <span className="text-gray-400 dark:text-gray-500 text-sm">버튼을 눌러 벌칙을 뽑으세요</span>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="벌칙 추가 입력"
            disabled={isPicking}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none"
          />
          <button
            onClick={addItem}
            disabled={isPicking || !input.trim()}
            className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 disabled:opacity-50 transition"
          >
            추가
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
          {items.map((item, i) => (
            <div key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm flex items-center gap-2">
              <span>{item}</span>
              <button onClick={() => removeItem(i)} disabled={isPicking} className="text-gray-400 hover:text-red-500">
                &times;
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-red-500 w-full text-center py-2">등록된 벌칙이 없습니다.</p>
          )}
        </div>

        <button
          onClick={pickPunishment}
          disabled={isPicking || items.length === 0}
          className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {isPicking ? "뽑는 중..." : "벌칙 뽑기!"}
        </button>
      </div>
    </div>
  );
}
