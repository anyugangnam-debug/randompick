"use client";

import { useState, useEffect } from "react";

export default function TeamGeneratorClientPage() {
  const [namesText, setNamesText] = useState("");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("teamGeneratorNames");
    if (saved) setNamesText(saved);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNamesText(e.target.value);
    localStorage.setItem("teamGeneratorNames", e.target.value);
  };

  const generateTeams = () => {
    setError("");
    setTeams([]);

    const names = namesText
      .split(/[,\n]/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    const unique = Array.from(new Set(names));

    if (unique.length < 2) {
      setError("최소 2명 이상의 이름을 입력해주세요.");
      return;
    }

    const tc = Math.max(2, Math.min(teamCount, unique.length));
    setIsGenerating(true);

    setTimeout(() => {
      const shuffled = [...unique].sort(() => Math.random() - 0.5);
      const result: string[][] = Array.from({ length: tc }, () => []);
      shuffled.forEach((name, idx) => {
        result[idx % tc].push(name);
      });
      setTeams(result);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">👥 팀 나누기</h1>
        <p className="text-gray-500 dark:text-gray-400">이름을 입력하고 공평하게 팀을 나누어보세요.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-xl mx-auto space-y-6">
        <div>
          <label htmlFor="names-input" className="block text-sm font-medium mb-2">
            참가자 이름 <span className="text-gray-400 font-normal">(쉼표 또는 줄바꿈으로 구분)</span>
          </label>
          <textarea
            id="names-input"
            value={namesText}
            onChange={handleTextChange}
            placeholder={"홍길동, 김철수, 이영희\n또는 한 줄에 한 명씩 입력"}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        <div>
          <label htmlFor="team-count" className="block text-sm font-medium mb-2">
            나눌 팀 개수
          </label>
          <input
            id="team-count"
            type="number"
            min={2}
            value={teamCount}
            onChange={(e) => setTeamCount(Math.max(2, parseInt(e.target.value) || 2))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={generateTeams}
          disabled={isGenerating}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {isGenerating ? "팀 나누는 중..." : teams.length > 0 ? "다시 섞기" : "팀 나누기 시작"}
        </button>
      </div>

      {teams.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {teams.map((team, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/50"
            >
              <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                {index + 1}팀{" "}
                <span className="text-sm font-normal text-gray-500">({team.length}명)</span>
              </h3>
              <ul className="space-y-2">
                {team.map((member, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
