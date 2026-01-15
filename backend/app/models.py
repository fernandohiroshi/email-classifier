from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EmailText(BaseModel):
    text: str
    # Email do remetente opcional para não quebrar clientes existentes.
    sender: Optional[str] = None

class EmailResponse(BaseModel):
    category: str
    suggested_response: str
    processed_text: str

class Email(BaseModel):
    id: str
    sender: str
    subject: str
    content: str
    category: str
    suggested_response: str
    date: str

class Stats(BaseModel):
    total: int
    productive: int
    unproductive: int