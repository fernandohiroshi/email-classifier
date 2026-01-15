from datetime import datetime
from typing import List

from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Form
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError

from app.models import EmailText, EmailResponse, Email
from app.services.openai_service import classify_with_openai
from app.services.nlp_service import extract_text_from_pdf, process_email_text
from app.utils.text_processing import extract_email_info
from app.database import get_db
from app.db_models import EmailDB


MAX_FILE_SIZE_MB = 5
ALLOWED_FILE_EXTENSIONS = {".pdf", ".txt"}


router = APIRouter(prefix="/api", tags=["emails"])


def _is_valid_email(sender: str | None) -> bool:
    if not sender:
        return False
    sender = sender.strip()
    return "@" in sender and "." in sender.split("@")[-1]


@router.post("/process-text", response_model=EmailResponse)
async def process_text(email: EmailText, db: Session = Depends(get_db)):
    """Processa texto de email diretamente"""
    if not email.text or not email.text.strip():
        raise HTTPException(status_code=400, detail="Texto do email é obrigatório.")

    if email.sender and not _is_valid_email(email.sender):
        raise HTTPException(status_code=400, detail="Remetente inválido.")

    # Pré-processar texto
    processed = process_email_text(email.text)

    # Classificar com OpenAI
    result = await classify_with_openai(email.text)

    # Extrair informações
    email_info = extract_email_info(email.text)

    # Definir remetente (permite manter compatibilidade enquanto o front não envia explicitamente)
    sender_email = email.sender or "usuario@email.com"

    # Salvar no banco de dados (Neon/Postgres)
    db_email = EmailDB(
        sender_email=sender_email,
        subject=email_info["subject"],
        content=email.text,
        category=result["category"],
        suggested_response=result["suggested_response"],
        created_at=datetime.utcnow(),
    )
    db.add(db_email)
    try:
        db.commit()
        db.refresh(db_email)
    except OperationalError:
        db.rollback()
        raise HTTPException(
            status_code=503,
            detail="Falha temporária ao conectar no banco de dados. Tente novamente em instantes.",
        )

    return EmailResponse(
        category=result["category"],
        suggested_response=result["suggested_response"],
        processed_text=processed,
    )


@router.post("/process-file", response_model=EmailResponse)
async def process_file(
    file: UploadFile = File(...),
    sender: str | None = Form(None),
    db: Session = Depends(get_db),
):
    """Processa arquivo .txt ou .pdf"""
    content = await file.read()

    if not sender or not _is_valid_email(sender):
        raise HTTPException(status_code=400, detail="Remetente inválido.")

    # Limitar tamanho do arquivo
    max_bytes = MAX_FILE_SIZE_MB * 1024 * 1024
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"Arquivo muito grande. Tamanho máximo: {MAX_FILE_SIZE_MB}MB.",
        )

    filename = (file.filename or "").lower()

    # Extrair texto baseado no tipo de arquivo
    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(content)
    elif filename.endswith(".txt"):
        text = content.decode("utf-8")
    else:
        raise HTTPException(
            status_code=400,
            detail="Formato não suportado. Use .txt ou .pdf",
        )

    # Pré-processar texto
    processed = process_email_text(text)

    # Classificar com OpenAI
    result = await classify_with_openai(text)

    # Extrair informações
    email_info = extract_email_info(text)

    # Definir remetente com fallback
    sender_email = sender or "usuario@email.com"

    # Salvar no banco de dados (Neon/Postgres)
    db_email = EmailDB(
        sender_email=sender_email,
        subject=email_info["subject"],
        content=text,
        category=result["category"],
        suggested_response=result["suggested_response"],
        created_at=datetime.utcnow(),
    )
    db.add(db_email)
    try:
        db.commit()
        db.refresh(db_email)
    except OperationalError:
        db.rollback()
        raise HTTPException(
            status_code=503,
            detail="Falha temporária ao conectar no banco de dados. Tente novamente em instantes.",
        )

    return EmailResponse(
        category=result["category"],
        suggested_response=result["suggested_response"],
        processed_text=processed,
    )


@router.get("/emails")
async def get_emails(db: Session = Depends(get_db)):
    """Retorna todos os emails processados"""
    emails: List[EmailDB] = (
        db.query(EmailDB).order_by(EmailDB.created_at.desc()).all()
    )

    # Adaptar para o formato esperado pelo frontend (campos compatíveis com Email do models.py)
    result = [
        {
            "id": str(email.id),
            "sender": email.sender_email,
            "subject": email.subject,
            "content": email.content,
            "category": email.category,
            "suggested_response": email.suggested_response,
            "date": email.created_at.isoformat(),
        }
        for email in emails
    ]

    return {"emails": result}


@router.get("/stats")
async def get_stats(db: Session = Depends(get_db)):
    """Retorna estatísticas dos emails"""
    total = db.query(EmailDB).count()
    productive = (
        db.query(EmailDB).filter(EmailDB.category == "Produtivo").count()
    )
    unproductive = total - productive

    return {
        "total": total,
        "productive": productive,
        "unproductive": unproductive,
    }