"use client";

import { useState, useEffect } from "react";

export default function RouletteClientPage() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [displayResult, setDisplayResult] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rouletteItems");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const saveItems = (newItems: string[]) => {
    setItems(newItems);
    localStorage.setItem("rouletteItems", JSON.stringify(newItems));
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
    setResult(null);
    setDisplayResult(null);
  };

  const spin = () => {
    if (items.length < 2 || isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    setDisplayResult(null);

    let count = 0;
    const maxCount = 25;
    const interval = setInterval(() => {
      setDisplayResult(items[Math.floor(Math.random() * items.length)]);
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        const final = items[Math.floor(Math.random() * items.length)];
        setResult(final);
        setDisplayResult(null);
        setIsSpinning(false);
      }
    }, 80);
  };

  // Build conic-gradient string without template literals in JSX
  const buildGradient = () => {
    if (items.length === 0) return "#e5e7eb";
    const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#14b8a6"];
    const parts = items.map((_, i) => {
      const color = COLORS[i % COLORS.length];
      const start = (i * 360) / items.length;
      const end = ((i + 1) * 360) / items.length;
      return color + " " + start + "deg " + end + "deg";
    });
    return "conic-gradient(" + parts.join(", ") + ")";
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🎡 룰렛 돌리기</h1>
        <p className="text-gray-500 dark:text-gray-400">원판 룰렛을 돌려 무작위로 하나를 선택하세요.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto space-y-6">
        {/* Roulette wheel */}
        <div className="relative flex items-center justify-center">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 w-0 h-0"
            style={{ borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "20px solid #ef4444" }}
          />
          <div
            className="w-60 h-60 rounded-full border-4 border-indigo-500 shadow-xl transition-transform"
            style={{
              background: buildGradient(),
              transitionDuration: isSpinning ? "3s" : "0s",
              transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.12, 1)",
            }}
          >
            {/* Sector labels */}
            {items.map((item, i) => {
              const angle = (i * 360) / items.length + 360 / items.length / 2;
              const rad = (angle * Math.PI) / 180;
              const r = 70;
              const x = 120 + r * Math.sin(rad);
              const y = 120 - r * Math.cos(rad);
              return (
                <div
                  key={i}
                  className="absolute text-white text-xs font-bold"
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%) rotate(" + angle + "deg)",
                    maxWidth: 60,
                    textAlign: "center",
                    wordBreak: "break-all",
                    pointerEvents: "none",
                  }}
                >
                  {item.length > 6 ? item.slice(0, 6) + "…" : item}
                </div>
              );
            })}
          </div>
        </div>

        {/* Result */}
        <div className="h-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-xl">
          {displayResult && (
            <span className="text-2xl font-bold text-indigo-400 blur-[1px]">{displayResult}</span>
          )}
          {result && !displayResult && (
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 animate-bounce">
              🎉 {result} 🎉
            </span>
          )}
          {!displayResult && !result && (
            <span className="text-gray-400 dark:text-gray-500 text-sm">결과가 여기에 표시됩니다</span>
          )}
        </div>

        {items.length < 2 && (
          <p className="text-center text-sm text-red-500">항목을 2개 이상 추가해주세요.</p>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="항목 입력 (예: 치킨)"
            disabled={isSpinning}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={addItem}
            disabled={isSpinning || !input.trim()}
            className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 disabled:opacity-50 transition"
          >
            추가
          </button>
        </div>

        {/* Items list */}
        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
          {items.map((item, i) => (
            <div key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm flex items-center gap-2">
              {item}
              <button onClick={() => removeItem(i)} disabled={isSpinning} className="text-gray-400 hover:text-red-500">
                &times;
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-gray-400 w-full text-center py-2">추가된 항목이 없습니다.</p>
          )}
        </div>

        <button
          onClick={spin}
          disabled={isSpinning || items.length < 2}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {isSpinning ? "돌아가는 중..." : "룰렛 돌리기"}
        </button>
      </div>
    </div>
  );
}
