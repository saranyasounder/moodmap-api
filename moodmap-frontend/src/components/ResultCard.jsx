import ScoreBar from "./ScoreBar";

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

export default function ResultCard({ result, loading }) {
  const entries = result
    ? Object.entries(result.scores).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
        Analysis Result
      </p>

      {!result && !loading ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-white/10 bg-slate-900/40 p-8 text-slate-400">
          Your analysis result will appear here once you submit text.
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6 space-y-4">
          <div className="h-8 w-40 animate-pulse rounded-xl bg-white/10" />
          <div className="h-5 w-full animate-pulse rounded-xl bg-white/10" />
          <div className="h-24 animate-pulse rounded-2xl bg-white/10" />
          <div className="space-y-3">
            <div className="h-4 animate-pulse rounded-xl bg-white/10" />
            <div className="h-4 animate-pulse rounded-xl bg-white/10" />
            <div className="h-4 animate-pulse rounded-xl bg-white/10" />
          </div>
        </div>
      ) : null}

      {result ? (
        <>
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold capitalize text-white">
                {result.topLabel}
              </h2>
              <p className="mt-3 max-w-xl text-slate-300">
                {result.interpretation}
              </p>
            </div>

            <div className="rounded-[22px] border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-right">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                Confidence
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {formatPercent(result.confidence)}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
              Original Text
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              {result.inputText}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
              Emotion Breakdown
            </p>

            <div className="mt-4 space-y-4">
              {entries.map(([label, score]) => (
                <ScoreBar key={label} label={label} score={score} />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}