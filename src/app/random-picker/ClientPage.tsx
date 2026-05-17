"use client";

import { useState, useEffect } from "react";

interface Match {
  participant: string;
  result: string;
  isBlank: boolean;
}

export default function RandomPickerClientPage() {
  const [participantsText, setParticipantsText] = useState("");
  const [resultsText, setResultsText] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedP = localStorage.getItem("multiPickerParticipants");
    const savedR = localStorage.getItem("multiPickerResults");
    if (savedP) setParticipantsText(savedP);
    if (savedR) setResultsText(savedR);
  }, []);

  const parseList = (text: string) =>
    text
      .split(/[,\n]/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

  const runMatch = () => {
    setError("");
    setMatches([]);

    const participants = parseList(participantsText);
    const resultItems = parseList(resultsText);

    if (participants.length === 0) {
      setError("참가자를 입력해주세요.");
      return;
    }
    if (resultItems.length === 0) {
      setError("결과(상품/역할)를 입력해주세요.");
      return;
    }

    setIsMatching(true);
    setTimeout(() => {
      // Shuffle results
      const shuffled = [...resultItems].sort(() => Math.random() - 0.5);

      const newMatches: Match[] = participants.map((p, idx) => ({
        participant: p,
        result: idx < shuffled.length ? shuffled[idx] : "꽝 😢",
        isBlank: idx >= shuffled.length,
      }));

      setMatches(newMatches);
      setIsMatching(false);
    }, 600);
  };

  const pCount = parseList(participantsText).length;
  const rCount = parseList(resultsText).length;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🎟️ 다중 제비뽑기</h1>
        <p className="text-gray-500 dark:text-gray-400">참가자와 결과를 한 번에 랜덤 매칭해드립니다.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="participants" className="block text-sm font-medium mb-2">
              참가자 목록
            </label>
            <textarea
              id="participants"
              value={participantsText}
              onChange={(e) => {
                setParticipantsText(e.target.value);
                localStorage.setItem("multiPickerParticipants", e.target.value);
              }}
              placeholder={"참가자 입력\n(쉼표 또는 줄바꿈)"}
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">총 {pCount}명</p>
          </div>

          <div>
            <label htmlFor="result-items" className="block text-sm font-medium mb-2">
              결과 목록 <span className="text-gray-400 font-normal">(상품 / 역할)</span>
            </label>
            <textarea
              id="result-items"
              value={resultsText}
              onChange={(e) => {
                setResultsText(e.target.value);
                localStorage.setItem("multiPickerResults", e.target.value);
              }}
              placeholder={"결과 입력\n(참가자보다 적으면 '꽝' 처리)"}
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">총 {rCount}개</p>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={runMatch}
          disabled={isMatching}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {isMatching ? "매칭 중..." : matches.length > 0 ? "다시 매칭하기" : "매칭 시작"}
        </button>
      </div>

      {matches.length > 0 && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">참가자</th>
                <th scope="col" className="px-6 py-4 font-bold">당첨 결과</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {matches.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4 font-medium">{m.participant}</td>
                  <td className={"px-6 py-4 font-bold " + (m.isBlank ? "text-gray-400" : "text-indigo-600 dark:text-indigo-400")}>
                    {m.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
