const EXAMPLES = [
  "I am so excited for this opportunity and I cannot wait to get started.",
  "I feel a little nervous and overwhelmed about everything right now.",
  "This result was unexpected, and honestly I am still shocked.",
];

export default function TextInputCard({
  text,
  setText,
  onAnalyze,
  onClear,
  loading,
  error,
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
            Input
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Analyze text emotion
          </h2>
          <p className="mt-2 text-slate-300">
            Paste a sentence, paragraph, or note and MoodMap will classify its
            emotional tone.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Characters
          </p>
          <p className="mt-1 text-lg font-semibold text-white">{text.length}</p>
        </div>
      </div>

      <div className="mt-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here..."
          className="min-h-[260px] w-full rounded-[24px] border border-white/10 bg-slate-900/80 p-5 text-base leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze Emotion"}
        </button>

        <button
          onClick={onClear}
          disabled={loading}
          className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Clear
        </button>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="mt-8">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
          Quick examples
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              onClick={() => setText(example)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-left text-sm text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}