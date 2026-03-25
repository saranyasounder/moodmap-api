from fastapi import FastAPI
from app.routes import router
from app.config import APP_TITLE, APP_VERSION, APP_DESCRIPTION
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=APP_TITLE,
    version=APP_VERSION,
    description=APP_DESCRIPTION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)