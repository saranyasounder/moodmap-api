from pydantic import BaseModel, Field


class TextRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="Input text to analyze"
    )


class BatchTextRequest(BaseModel):
    texts: list[str] = Field(
        ...,
        min_length=1,
        max_length=20,
        description="A list of input texts to analyze"
    )


class PredictionResponse(BaseModel):
    input_text: str
    top_label: str
    confidence: float
    interpretation: str
    scores: dict[str, float]


class BatchPredictionResponse(BaseModel):
    predictions: list[PredictionResponse]