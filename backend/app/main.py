from fastapi import FastAPI
from app.routes import auth, business, admin
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine

from app.models import user
from app.routes import auth, business, admin, analytics

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(business.router)
app.include_router(admin.router)
app.include_router(analytics.router)