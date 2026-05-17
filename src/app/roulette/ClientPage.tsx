"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b",
  "#10b981", "#3b82f6", "#ef4444", "#14b8a6",
  "#f97316", "#84cc16",
];

function drawWheel(canvas: HTMLCanvasElement, items: string[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx || items.length === 0) return;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = cx - 4;
  const sliceAngle = (2 * Math.PI) / items.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  items.forEach((item, i) => {
    const start = i * sliceAngle - Math.PI / 2;
    const end = start + sliceAngle;

    // Sector
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold " + Math.min(14, Math.floor(r / items.length * 1.2)) + "px sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 3;
    const label = item.length > 8 ? item.slice(0, 7) + "…" : item;
    ctx.fillText(label, r - 10, 5);
    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, 16, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 3;
  ctx.stroke();
}

export default function RouletteClientPage() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);

  // Draw wheel whenever items change
  useEffect(() => {
    if (canvasRef.current) {
      drawWheel(canvasRef.current, items);
    }
  }, [items]);

  useEffect(() => {
    const saved = localStorage.getItem("rouletteItems");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
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
  };

  const spin = useCallback(() => {
    if (items.length < 2 || isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Spin: 5~8 full rotations + random offset
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const randomOffset = Math.random() * 360;
    const newRotation = rotationRef.current + extraSpins + randomOffset;

    rotationRef.current = newRotation;
    setRotation(newRotation);

    // After 4s transition, calculate winner
    setTimeout(() => {
      const sliceAngle = 360 / items.length;
      // Pointer is at top (0deg). Wheel rotated `newRotation` clockwise.
      // The sector at the top = which sector is under angle 0 of the wheel
      const normalized = ((newRotation % 360) + 360) % 360;
      // Because wheel spins clockwise, the sector under pointer = normalize backwards
      const winIndex = Math.floor(((360 - normalized) % 360) / sliceAngle) % items.length;
      setResult(items[winIndex]);
      setIsSpinning(false);
    }, 4100);
  }, [items, isSpinning]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🎡 룰렛 돌리기</h1>
        <p className="text-gray-500 dark:text-gray-400">항목을 추가하고 룰렛을 돌려보세요!</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto space-y-6">

        {/* Wheel + Pointer */}
        <div className="relative flex flex-col items-center">
          {/* Pointer */}
          <div
            className="relative z-10 mb-[-12px]"
            style={{
              width: 0,
              height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "24px solid #ef4444",
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))",
            }}
          />
          {/* Canvas wheel */}
          <div className="relative rounded-full overflow-hidden shadow-2xl border-4 border-indigo-500">
            <canvas
              ref={canvasRef}
              width={260}
              height={260}
              style={{
                display: "block",
                transform: "rotate(" + rotation + "deg)",
                transition: isSpinning
                  ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 1)"
                  : "none",
              }}
            />
          </div>

          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 text-sm text-center px-8">
                항목을 추가하면<br />룰렛이 나타납니다
              </p>
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <p className="text-sm text-gray-500 mb-1">결과</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              🎉 {result} 🎉
            </p>
          </div>
        )}

        {items.length < 2 && items.length > 0 && (
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
            <div
              key={i}
              className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 text-white font-medium"
              style={{ background: COLORS[i % COLORS.length] }}
            >
              {item}
              <button
                onClick={() => removeItem(i)}
                disabled={isSpinning}
                className="opacity-70 hover:opacity-100 ml-1"
                aria-label={"삭제: " + item}
              >
                &times;
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-gray-400 w-full text-center py-2">추가된 항목이 없습니다.</p>
          )}
        </div>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={isSpinning || items.length < 2}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {isSpinning ? "돌아가는 중... 🎡" : "룰렛 돌리기!"}
        </button>
      </div>
    </div>
  );
}
