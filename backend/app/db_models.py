from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime

from .database import Base, engine


class EmailDB(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    sender_email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    suggested_response = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# Cria as tabelas automaticamente em desenvolvimento / primeiro deploy.
# Em ambientes mais complexos, seria recomendado usar migrações.
Base.metadata.create_all(bind=engine)
