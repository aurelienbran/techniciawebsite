from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, documents, maintenance
from config.settings import Settings

app = FastAPI(title="TechnicIA API")
settings = Settings()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(documents.router, prefix="/documents", tags=["documents"])
app.include_router(maintenance.router, prefix="/maintenance", tags=["maintenance"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}