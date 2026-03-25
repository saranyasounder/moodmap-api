from transformers import pipeline
from app.config import MODEL_NAME

classifier = pipeline(
    task="text-classification",
    model=MODEL_NAME,
    top_k=None
)


LABEL_INTERPRETATIONS = {
    "anger": "This text reflects frustration, irritation, or anger.",
    "disgust": "This text suggests dislike, rejection, or disgust.",
    "fear": "This text conveys anxiety, fear, or worry.",
    "joy": "This text expresses strong positive excitement and enthusiasm.",
    "neutral": "This text appears emotionally balanced or neutral.",
    "sadness": "This text reflects sadness, disappointment, or emotional heaviness.",
    "surprise": "This text conveys surprise, shock, or unexpected emotion."
}


def analyze_text(text: str) -> tuple[str, float, str, dict[str, float]]:
    results = classifier(text)

    if isinstance(results, list) and len(results) > 0 and isinstance(results[0], list):
        results = results[0]

    scores = {
        item["label"]: round(float(item["score"]), 4)
        for item in results
    }

    top_label = max(scores, key=scores.get)
    confidence = scores[top_label]
    interpretation = LABEL_INTERPRETATIONS.get(
        top_label,
        "This text expresses a detectable emotional tone."
    )

    return top_label, confidence, interpretation, scores


def analyze_batch(texts: list[str]) -> list[tuple[str, float, str, dict[str, float]]]:
    outputs = []

    for text in texts:
        result = analyze_text(text)
        outputs.append(result)

    return outputs