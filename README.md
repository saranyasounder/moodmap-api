# MoodMap

**MoodMap** is an NLP-powered emotion analysis web app that classifies emotional tone in user text using a transformer model served through a FastAPI backend and visualized through a React + Tailwind frontend.

It allows users to paste in text, analyze emotional tone, and view:
- the top predicted emotion
- model confidence
- a human-readable interpretation
- a score breakdown across all emotion classes

---

## Features

### Frontend
- Built with **React + Tailwind CSS**
- Clean, portfolio-ready UI
- Interactive text analysis
- Emotion score visualization
- Loading and error states
- Example prompts for quick testing

### Backend
- Built with **FastAPI**
- Uses a **Hugging Face transformer model**
- Returns:
  - top emotion
  - confidence score
  - interpretation
  - full label score breakdown
- Input validation and error handling
- Batch prediction support

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Vite

### Backend
- Python
- FastAPI
- Hugging Face Transformers
- PyTorch
- Uvicorn

---

## Project Structure

```bash
moodmap/
├── moodmap-api/              # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── routes.py
│   │   ├── schemas.py
│   │   ├── model.py
│   │   └── config.py
│   ├── tests/
│   │   └── test_api.py
│   ├── requirements.txt
│   └── README.md
│
├── moodmap-frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
```

---

# How to Run the App Locally

You need to run **both** the backend and frontend.

---

## 1. Clone the repository

```bash
git clone <your-repo-url>
cd moodmap
```

---

# Backend Setup (FastAPI)

## 2. Navigate into the backend folder

```bash
cd moodmap-api
```

## 3. Create and activate a virtual environment

### Mac / Linux
```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows
```bash
python -m venv venv
venv\Scripts\activate
```

## 4. Install backend dependencies

```bash
pip install -r requirements.txt
```

## 5. Run the backend server

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```txt
http://127.0.0.1:8000
```

You can test the API directly at:

```txt
http://127.0.0.1:8000/docs
```

---

# Frontend Setup (React + Tailwind)

Open a **new terminal window** and run the frontend separately.

## 6. Navigate into the frontend folder

```bash
cd moodmap-frontend
```

## 7. Install frontend dependencies

```bash
npm install
```

If Tailwind / Vite plugins are not already installed, run:

```bash
npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react
```

## 8. Start the frontend

```bash
npm run dev
```

The frontend will usually run at:

```txt
http://localhost:5173
```

---

# Important: CORS Setup

Since the frontend and backend run on different ports, the FastAPI backend must allow requests from the React app.

Make sure your `app/main.py` includes:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from app.config import APP_TITLE, APP_VERSION

app = FastAPI(
    title=APP_TITLE,
    version=APP_VERSION,
    description="A FastAPI backend that analyzes text and returns emotion scores using Hugging Face Transformers."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
```

Without this, the frontend will not be able to communicate with the backend.

---

# API Endpoints

## `GET /`
Basic API status check.

### Example response
```json
{
  "message": "MoodMap API is running"
}
```

---

## `GET /health`
Health check endpoint.

### Example response
```json
{
  "status": "ok"
}
```

---

## `POST /predict`
Analyze a single text input.

### Request body
```json
{
  "text": "I am so excited to build this project"
}
```

### Example response
```json
{
  "input_text": "I am so excited to build this project",
  "top_label": "joy",
  "confidence": 0.9821,
  "interpretation": "This text expresses strong positive excitement and enthusiasm.",
  "scores": {
    "anger": 0.0012,
    "disgust": 0.0008,
    "fear": 0.0024,
    "joy": 0.9821,
    "neutral": 0.0071,
    "sadness": 0.0035,
    "surprise": 0.0029
  }
}
```

---

## `POST /predict/batch`
Analyze multiple text inputs.

### Request body
```json
{
  "texts": [
    "I am so excited about this opportunity.",
    "I feel anxious about tomorrow.",
    "That result was shocking."
  ]
}
```

---

# Common Issues

## 1. `404 Not Found` on `/predict`
Make sure:
- the backend is running
- the frontend is calling the correct backend URL
- your route exists in `routes.py`

---

## 2. CORS errors in browser console
Make sure:
- `CORSMiddleware` is added in `main.py`
- your frontend URL is included in `allow_origins`

---

## 3. Model takes a while to load the first time
This is normal.

The first run downloads the Hugging Face model and tokenizer files, so startup may take longer initially.

---

## 4. `ValueError: too many values to unpack`
This means your `routes.py` and `model.py` are out of sync.

Make sure both files use the same return format from `analyze_text()`.

---

# Why I Built This

I built MoodMap to better understand how machine learning models can be integrated into production-style software systems.

Rather than stopping at notebook experimentation, I wanted to build a project that demonstrates:

- backend API design
- model inference integration
- input validation and error handling
- frontend-to-backend communication
- full-stack deployment readiness

This project helped me combine software engineering, data/ML integration, and frontend product thinking in a single application.

---

# Future Improvements

- Deploy backend on Render
- Deploy frontend on Vercel
- Add authentication
- Add user history / saved analyses
- Add charts for emotion trends over time
- Add support for CSV / bulk upload
- Add model comparison mode

---

# Author

Built by **Saranya Sounder Rajan**
