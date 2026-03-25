export default function Header() {
  return (
    <header className="grid gap-6 rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
          MoodMap
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Emotion analysis for human text.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          MoodMap is a React + Tailwind frontend for an NLP-powered FastAPI
          backend. It analyzes emotional tone in text and returns a top emotion,
          confidence score, and label breakdown.
        </p>
      </div>

      <div className="flex flex-col justify-between rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">
            Project Highlights
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-100">
            <p>FastAPI backend with Hugging Face model inference</p>
            <p>React frontend with interactive text analysis</p>
            <p>Tailwind UI for seamless user experience</p>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-300">
          Built to showcase backend, frontend, and ML integration in one
          project.
        </div>
      </div>
    </header>
  );
}