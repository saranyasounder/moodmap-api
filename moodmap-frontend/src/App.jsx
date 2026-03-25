import { useMemo, useState } from "react";
import Header from "./components/Header";
import TextInputCard from "./components/TextInputCard";
import ResultCard from "./components/ResultCard";

const API_BASE_URL = "http://127.0.0.1:8000";

const LABEL_INTERPRETATIONS = {
  anger: "This text reflects frustration, irritation, or anger.",
  disgust: "This text suggests dislike, rejection, or disgust.",
  fear: "This text conveys anxiety, fear, or worry.",
  joy: "This text expresses strong positive excitement and enthusiasm.",
  neutral: "This text appears emotionally balanced or neutral.",
  sadness: "This text reflects sadness, disappointment, or emotional heaviness.",
  surprise: "This text conveys surprise, shock, or unexpected emotion.",
};

function App() {
  const [text, setText] = useState(
    "I am so excited to build this project and turn it into something portfolio-worthy."
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizedResult = useMemo(() => {
    if (!result) return null;

    const topLabel = result.top_label || "unknown";
    const scores = result.scores || {};
    const confidence =
      typeof result.confidence === "number"
        ? result.confidence
        : scores[topLabel] || 0;

    const interpretation =
      result.interpretation ||
      LABEL_INTERPRETATIONS[topLabel] ||
      "This text expresses a detectable emotional tone.";

    return {
      inputText: result.input_text || text,
      topLabel,
      confidence,
      interpretation,
      scores,
    };
  }, [result, text]);

  const handleAnalyze = async () => {
    const cleaned = text.trim();

    if (!cleaned) {
      setError("Please enter some text before analyzing.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: cleaned }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze text.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Header />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <TextInputCard
            text={text}
            setText={setText}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            loading={loading}
            error={error}
          />

          <ResultCard result={normalizedResult} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;