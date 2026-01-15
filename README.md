# 📧 Email Classifier - Sistema Inteligente de Classificação de Emails

Sistema completo de classificação automática de emails usando Inteligência Artificial (OpenAI GPT), desenvolvido com Next.js 16 e Python FastAPI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-16-black.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)

## 🎯 Sobre o Projeto

Esta aplicação foi desenvolvida para automatizar a leitura, classificação e sugestão de respostas para emails corporativos, liberando tempo da equipe para tarefas mais estratégicas.

### Funcionalidades Principais

- ✅ **Upload de Arquivos**: Suporte para .txt e .pdf
- ✅ **Classificação Automática**: Categoriza emails em Produtivo ou Improdutivo
- ✅ **Respostas Sugeridas**: Geração automática de respostas contextualizadas
- ✅ **Histórico Completo**: Armazenamento e busca de emails processados
- ✅ **Dashboard Analítico**: 4 gráficos interativos com estatísticas
- ✅ **Interface Moderna**: Design minimalista em preto e branco
- ✅ **Processamento NLP**: Remoção de stop words e pré-processamento de texto

## 🏗️ Arquitetura do Projeto

```
email-classifier/
├── frontend/              # Next.js 16 + TypeScript
│   ├── src/
│   │   ├── app/          # App Router do Next.js
│   │   ├── components/   # Componentes React
│   │   │   ├── layout/   # Sidebar, Header
│   │   │   ├── pages/    # UploadPage, HistoryPage, DashboardPage
│   │   │   ├── features/ # EmailCard, EmailModal, UploadForm
│   │   │   └── charts/   # Gráficos com Recharts
│   │   ├── lib/          # Utilitários e API client
│   │   └── types/        # TypeScript types
│   └── public/
│
└── backend/              # Python FastAPI
    ├── app/
    │   ├── main.py       # Aplicação principal
    │   ├── models.py     # Modelos Pydantic
    │   ├── services/     # Lógica de negócio
    │   │   ├── openai_service.py   # Integração com OpenAI GPT
    │   │   └── nlp_service.py      # Processamento de texto / PDF
    │   ├── routes/       # Endpoints da API
    │   └── utils/        # Funções auxiliares
    └── tests/
```

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **Recharts** - Biblioteca de gráficos
- **Lucide React** - Ícones modernos

### Backend

- **FastAPI** - Framework web assíncrono
- **OpenAI GPT** - IA para classificação e geração de respostas
- **PyPDF2** - Processamento de PDFs
- **Python 3.11** - Linguagem base

## 📋 Pré-requisitos

- Node.js 18+ e npm/yarn
- Python 3.11+
- Conta na OpenAI com API Key
- Git

## 🔧 Instalação e Configuração Local

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/email-classifier.git
cd email-classifier
```

### 2️⃣ Configurar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Criar arquivo .env
echo "OPENAI_API_KEY=sua-chave-openai-aqui" > .env
echo "DATABASE_URL=sua-string-de-conexao-do-neon" >> .env
```

**Obter API Key da OpenAI:**

1. Acesse [OpenAI Platform](https://platform.openai.com/)
2. Crie uma nova API Key
3. Cole no arquivo `.env` como `OPENAI_API_KEY`

```bash
# Executar o servidor
uvicorn app.main:app --reload
```

✅ Backend rodando em: `http://localhost:8000`
📚 Documentação da API: `http://localhost:8000/docs`

### 3️⃣ Configurar o Frontend

```bash
# Em outro terminal, entrar na pasta frontend
cd frontend

# Instalar dependências
npm install

# Criar arquivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Executar o servidor de desenvolvimento
npm run dev
```

✅ Frontend rodando em: `http://localhost:3000`

## 🌐 Deploy na Nuvem

### Deploy do Backend (Render)

1. **Criar conta no [Render](https://render.com)**

2. **Criar novo Web Service:**

   - Connect repository do GitHub
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. **Configurar variáveis de ambiente:**

   ```
   OPENAI_API_KEY=sua-chave-openai-aqui
   DATABASE_URL=postgresql+psycopg://...  # URL do Neon
   ```

4. **Deploy automático** ✅

5. **Copiar URL do deploy** (ex: `https://seu-app.onrender.com`)

### Deploy do Frontend (Vercel)

1. **Criar conta no [Vercel](https://vercel.com)**

2. **Importar repositório do GitHub**

3. **Configurar variáveis de ambiente:**

   ```
   NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com/api
   ```

4. **Deploy automático** ✅

5. **URL disponível** (ex: `https://seu-app.vercel.app`)

## 📖 Como Usar

### 1. Upload de Email

1. Acesse a página "Upload"
2. Escolha uma das opções:
   - **Upload de arquivo**: Selecione um arquivo .txt ou .pdf
   - **Cole o texto**: Cole diretamente o conteúdo do email
3. Clique em "Classificar Email"
4. Visualize a categoria e resposta sugerida

### 2. Histórico

1. Acesse a página "Histórico"
2. Visualize todos os emails processados
3. Use os filtros:
   - Busca por texto
   - Ordenação (data ou alfabética)
   - Filtro por categoria
4. Clique em um email para ver detalhes completos

### 3. Dashboard

1. Acesse a página "Dashboard"
2. Visualize estatísticas:
   - Total de emails processados
   - Distribuição por categoria
   - Remetentes mais frequentes
   - Tendências ao longo do tempo

## 🔍 Endpoints da API

### POST `/api/process-text`

Processa texto de email diretamente.

**Request Body:**

```json
{
  "text": "Conteúdo do email aqui...",
  "sender": "usuario@email.com"
}
```

**Response:**

```json
{
  "category": "Produtivo",
  "suggested_response": "Resposta sugerida pela IA...",
  "processed_text": "texto processado"
}
```

### POST `/api/process-file`

Processa arquivo .txt ou .pdf.

**Request:**

- Multipart form-data com arquivo

**Response:**

```json
{
  "category": "Improdutivo",
  "suggested_response": "Email recebido...",
  "processed_text": "texto processado"
}
```

### GET `/api/emails`

Retorna histórico de emails processados.

### GET `/api/stats`

Retorna estatísticas gerais.

## 🧪 Testes

### Backend

```bash
cd backend
pytest tests/
```

### Frontend

```bash
cd frontend
npm run test
```

## 🎨 Capturas de Tela

_Adicione screenshots do seu projeto aqui_

## 📊 Exemplos de Uso

### Email Produtivo

```
Assunto: Atualização urgente do projeto X
Conteúdo: Precisamos marcar uma reunião para discutir os próximos passos...

Classificação: Produtivo
Resposta Sugerida: "Agradeço pelo contato. Vou verificar minha agenda..."
```

### Email Improdutivo

```
Assunto: Feliz Natal!
Conteúdo: Desejando boas festas para toda equipe...

Classificação: Improdutivo
Resposta Sugerida: "Obrigado pela mensagem! Igualmente..."
```

## 🔐 Segurança

- ✅ CORS configurado para domínios específicos em produção
- ✅ Validação de entrada com Pydantic
- ✅ API Key protegida em variáveis de ambiente
- ✅ Rate limiting (implementar em produção)

## 🐛 Problemas Conhecidos

- Em produção, usar banco de dados gerenciado (ex.: Neon Postgres)
- Implementar cache para melhorar performance
- Adicionar rate limiting para proteger a API pública

## 🔁 Fluxo Técnico do Projeto

- **API e stack**  
  Backend feito em FastAPI (Python). Ele expõe rotas REST em `/api` para processar texto (`/process-text`), arquivo (`/process-file`), listar emails (`/emails`) e estatísticas (`/stats`).

- **Fluxo da IA**  
  O frontend Next.js manda o texto/arquivo para a API. A API pré-processa o texto (NLP simples), chama a OpenAI (GPT) para classificar como **Produtivo** ou **Improdutivo** e gerar a resposta sugerida.

- **Banco de dados (Neon)**  
  Depois que a IA devolve o resultado, a API salva tudo em um Postgres no Neon: remetente, assunto, conteúdo, categoria, resposta sugerida e data. O frontend então lê esse histórico e monta as páginas de histórico e dashboard.

- **Relação Front ↔ API ↔ IA ↔ BD**  
  Frontend → envia email para FastAPI → FastAPI chama OpenAI → recebe categoria + resposta → salva no Neon → devolve JSON para o frontend exibir.

- **O que o venv faz**  
  O `venv` é um ambiente virtual Python que isola as dependências do backend (FastAPI, OpenAI, etc.) para esse projeto, evitando conflito com outros projetos ou com os pacotes globais da máquina.

### 🧾 Resumo do Projeto

- Aplicação web em **Next.js + FastAPI** que classifica emails em **Produtivo** ou **Improdutivo** usando OpenAI GPT.
- O usuário envia texto ou arquivo (`.txt`/`.pdf`), e o sistema gera uma resposta automática pronta para copiar, assinada com **AutoU Digital**.
- Todos os emails processados são salvos em Postgres (Neon) e exibidos em um **histórico com filtros** e em um **dashboard com gráficos**.
- O frontend é totalmente responsivo, com **dark/light mode**, **toasts de feedback** e UI moderna com **shadcn/ui**.

## 👨‍💻 Autor

**Fernando Hiroshi**

- Portfolio: [fernandohiroshi.com](https://fernandohiroshi.com)
- LinkedIn: [fernandohiroshi](https://www.linkedin.com/in/fernando-hiroshi)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
