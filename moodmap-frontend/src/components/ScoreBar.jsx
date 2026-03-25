function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

export default function ScoreBar({ label, score }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="capitalize text-slate-200">{label}</span>
        <span className="text-slate-400">{formatPercent(score)}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${Math.max(score * 100, 2)}%` }}
        />
      </div>
    </div>
  );
}