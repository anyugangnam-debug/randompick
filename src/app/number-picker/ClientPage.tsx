"use client";

import { useState } from "react";

export default function NumberPickerClientPage() {
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const pickNumbers = () => {
    setError("");
    setResults([]);
    setCopied(false);

    if (minVal >= maxVal) {
      setError("끝 번호는 시작 번호보다 커야 합니다.");
      return;
    }
    if (count < 1) {
      setError("최소 1개 이상 뽑아야 합니다.");
      return;
    }

    const rangeSize = maxVal - minVal + 1;
    if (!allowDuplicates && count > rangeSize) {
      setError("중복 없이 뽑을 경우 범위 내 총 개수(" + rangeSize + "개)를 초과할 수 없습니다.");
      return;
    }

    setIsPicking(true);
    setTimeout(() => {
      const drawn: number[] = [];
      const pool = Array.from({ length: rangeSize }, (_, i) => minVal + i);

      if (allowDuplicates) {
        for (let i = 0; i < count; i++) {
          drawn.push(pool[Math.floor(Math.random() * pool.length)]);
        }
      } else {
        // Fisher-Yates shuffle then take first `count`
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        drawn.push(...pool.slice(0, count));
        drawn.sort((a, b) => a - b);
      }

      setResults(drawn);
      setIsPicking(false);
    }, 600);
  };

  const copyResults = () => {
    navigator.clipboard.writeText(results.join(", ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🔢 번호 추첨기</h1>
        <p className="text-gray-500 dark:text-gray-400">범위를 지정하고 행운의 번호를 뽑아보세요.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="min-val" className="block text-sm font-medium mb-2">시작 번호</label>
            <input
              id="min-val"
              type="number"
              value={minVal}
              onChange={(e) => setMinVal(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max-val" className="block text-sm font-medium mb-2">끝 번호</label>
            <input
              id="max-val"
              type="number"
              value={maxVal}
              onChange={(e) => setMaxVal(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="pick-count" className="block text-sm font-medium mb-2">뽑을 개수</label>
          <input
            id="pick-count"
            type="number"
            min={1}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={allowDuplicates}
            onChange={(e) => setAllowDuplicates(e.target.checked)}
            className="w-5 h-5 rounded text-indigo-600 border-gray-300"
          />
          <span className="text-sm font-medium">중복 당첨 허용</span>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={pickNumbers}
          disabled={isPicking}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {isPicking ? "추첨 중..." : "번호 추첨하기"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/50 text-center space-y-6">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">추첨 결과</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {results.map((num, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold shadow-sm"
              >
                {num}
              </div>
            ))}
          </div>
          <button
            onClick={copyResults}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition"
          >
            {copied ? "복사 완료! ✓" : "결과 복사하기"}
          </button>
        </div>
      )}
    </div>
  );
}
