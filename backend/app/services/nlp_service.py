import PyPDF2
import io
from fastapi import HTTPException
from app.utils.text_processing import preprocess_text

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extrai texto de um arquivo PDF"""
    try:
        pdf_file = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar PDF: {str(e)}")

def process_email_text(text: str) -> str:
    """Processa o texto do email"""
    return preprocess_text(text)