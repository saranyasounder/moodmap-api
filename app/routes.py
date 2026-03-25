from fastapi import APIRouter, HTTPException
from app.schemas import (
    TextRequest,
    BatchTextRequest,
    PredictionResponse,
    BatchPredictionResponse
)
from app.model import analyze_text, analyze_batch
from app.config import MAX_TEXT_LENGTH

router = APIRouter()


@router.get("/")
def home():
    return {"message": "MoodMap API is running"}


@router.get("/health")
def health_check():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict(request: TextRequest):
    text = request.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    if len(text) > MAX_TEXT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Text exceeds maximum length of {MAX_TEXT_LENGTH} characters."
        )

    try:
        top_label, confidence, interpretation, scores = analyze_text(text)

        return PredictionResponse(
            input_text=text,
            top_label=top_label,
            confidence=confidence,
            interpretation=interpretation,
            scores=scores
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


@router.post("/predict/batch", response_model=BatchPredictionResponse)
def predict_batch(request: BatchTextRequest):
    cleaned_texts = [text.strip() for text in request.texts]

    if any(not text for text in cleaned_texts):
        raise HTTPException(status_code=400, detail="One or more texts are empty.")

    if any(len(text) > MAX_TEXT_LENGTH for text in cleaned_texts):
        raise HTTPException(
            status_code=400,
            detail=f"One or more texts exceed maximum length of {MAX_TEXT_LENGTH} characters."
        )

    try:
        results = analyze_batch(cleaned_texts)

        predictions = [
            PredictionResponse(
                input_text=text,
                top_label=top_label,
                confidence=confidence,
                interpretation=interpretation,
                scores=scores
            )
            for text, (top_label, confidence, interpretation, scores) in zip(cleaned_texts, results)
        ]

        return BatchPredictionResponse(predictions=predictions)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Batch prediction failed: {str(e)}"
        )