from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "MoodMap API is running"


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_predict_valid_text():
    payload = {"text": "I am very happy today!"}
    response = client.post("/predict", json=payload)

    assert response.status_code == 200
    data = response.json()

    assert "input_text" in data
    assert "top_label" in data
    assert "scores" in data
    assert isinstance(data["scores"], dict)


def test_predict_empty_text():
    payload = {"text": "   "}
    response = client.post("/predict", json=payload)

    assert response.status_code == 400
    assert response.json()["detail"] == "Text cannot be empty."