import re
from typing import List

STOP_WORDS = {
    'a', 'o', 'e', 'de', 'da', 'do', 'em', 'um', 'uma', 'os', 'as',
    'dos', 'das', 'para', 'com', 'por', 'que', 'não', 'mais', 'ser',
    'ao', 'na', 'no', 'nos', 'nas', 'também', 'já', 'até', 'pela'
}

def preprocess_text(text: str) -> str:
    """Remove stop words e faz limpeza básica do texto"""
    # Converter para minúsculas
    text = text.lower()
    
    # Remover caracteres especiais, mantendo espaços
    text = re.sub(r'[^a-záàâãéèêíïóôõöúçñ\s]', '', text)
    
    # Remover stop words
    words = text.split()
    filtered_words = [word for word in words if word not in STOP_WORDS and len(word) > 2]
    
    return ' '.join(filtered_words)

def extract_email_info(text: str) -> dict:
    """Extrai informações básicas do email"""
    lines = text.strip().split('\n')
    
    return {
        'subject': lines[0][:100] if lines else "Sem assunto",
        'preview': text[:200] + "..." if len(text) > 200 else text
    }