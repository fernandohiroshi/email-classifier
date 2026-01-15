import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Carregar variáveis de ambiente (.env) em desenvolvimento
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Em desenvolvimento local, isso ajuda a identificar configuração faltando.
    # Em produção (Render), a variável deve estar configurada no painel.
    raise RuntimeError("DATABASE_URL não configurada. Defina no .env ou nas variáveis de ambiente do serviço.")

# Garantir que usamos o driver psycopg (psycopg3) com SQLAlchemy.
# Neon normalmente fornece URLs começando com "postgresql://".
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql://") and "+" not in DATABASE_URL.split(":")[0]:
    # "postgresql://" -> "postgresql+psycopg://"
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

# Engine síncrono. Para o volume deste projeto, é suficiente e simples.
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependência do FastAPI para obter uma sessão de banco por requisição."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
