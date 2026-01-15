import os
import re

from dotenv import load_dotenv
from openai import OpenAI

# Carrega variáveis de ambiente do arquivo .env em ambiente local.
# Em produção (Render, por exemplo), as variáveis são injetadas pela plataforma.
load_dotenv()

# Configuração da OpenAI API usada para:
# - Classificar o email em "Produtivo" ou "Improdutivo";
# - Gerar uma resposta automática adequada ao conteúdo do email.
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    # Em produção, essa variável deve ser configurada nas env vars do serviço
    # (por exemplo, painel do Render). Em desenvolvimento, vem do arquivo .env.
    raise RuntimeError("OPENAI_API_KEY não configurada. Defina no .env ou nas variáveis de ambiente do serviço.")

client = OpenAI(api_key=OPENAI_API_KEY)


async def classify_with_openai(text: str) -> dict:
    """Classifica o email e gera uma resposta automática usando OpenAI.

    Esta função implementa exatamente o que o desafio solicita na parte de IA:
    - Analisa o conteúdo textual do email;
    - Determina a categoria do email ("Produtivo" ou "Improdutivo");
    - Gera uma resposta automática profissional em português.

    Retorna um dicionário no formato:
    {"category": str, "suggested_response": str}
    """

    prompt = f"""
    Você é um assistente especializado em classificação de emails corporativos.

    Analise o seguinte email e forneça:
    1. Classificação: "Produtivo" (se for relacionado a trabalho, reuniões, projetos,
       solicitações, dúvidas profissionais, atualizações de casos)
       ou "Improdutivo" (se for spam, marketing, newsletters, felicitações, mensagens sociais)
    2. Uma resposta sugerida profissional e apropriada

    Email:
    {text}

    Responda EXATAMENTE neste formato:
    CATEGORIA: [Produtivo ou Improdutivo]
    RESPOSTA: [sua resposta sugerida em português, profissional e cordial]
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Você é um assistente que responde em português do Brasil."},
                {"role": "user", "content": prompt},
            ],
        )

        result_text = response.choices[0].message.content or ""

        # Extrai a categoria e a resposta do texto retornado pelo modelo,
        # garantindo que o formato fique consistente para o restante da aplicação.
        category_match = re.search(r"CATEGORIA:\s*(Produtivo|Improdutivo)", result_text, re.IGNORECASE)
        response_match = re.search(r"RESPOSTA:\s*(.+)", result_text, re.DOTALL)

        category = category_match.group(1).capitalize() if category_match else "Improdutivo"
        suggested_response = response_match.group(1).strip() if response_match else "Obrigado pela sua mensagem. Entraremos em contato em breve."

        return {
            "category": category,
            "suggested_response": suggested_response,
        }
    except Exception as e:
        print(f"Erro ao processar com OpenAI: {str(e)}")
        # Fallback simples para o caso de falha na API da OpenAI.
        # Mantém o fluxo funcionando, retornando uma classificação padrão
        # e uma resposta genérica, em vez de quebrar a requisição.
        return {
            "category": "Improdutivo",
            "suggested_response": "Obrigado pela sua mensagem. Entraremos em contato em breve.",
        }
