import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routes.email_routes import router as email_router

app = FastAPI(
    title="Email Classifier API",
    description="API para classificação automática de emails usando IA",
    version="1.0.0",
)

# Configurar CORS (em produção, configure ALLOWED_ORIGINS)
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
if allowed_origins_env.strip() == "*":
    allowed_origins = ["*"]
else:
    allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    """Adiciona alguns headers básicos de segurança às respostas."""
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("X-XSS-Protection", "1; mode=block")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    return response

# Incluir rotas
app.include_router(email_router)

@app.get("/")
async def root():
    return {
        "message": "Email Classifier API",
        "status": "online",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}