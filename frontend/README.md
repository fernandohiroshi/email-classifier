## Frontend - Email Classifier (Next.js 16)

Interface web do projeto **Email Classifier**, construída com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** e componentes **shadcn/ui**.

Ela consome a API FastAPI do backend para:

- Upload de arquivos (.txt / .pdf) ou texto de email
- Classificação (Produtivo / Improdutivo)
- Exibição de resposta sugerida
- Histórico de emails processados
- Dashboard com gráficos (Recharts)

---

## 📋 Pré-requisitos

- Node.js 18+
- npm (ou yarn/pnpm/bun)
- Backend rodando em `http://localhost:8000` (ou outra URL configurada na env)

---

## 🔧 Configuração e execução em desenvolvimento

1. Instalar dependências:

```bash
npm install
```

2. Configurar a URL da API em `.env.local` (raiz do frontend):

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
```

Se o backend estiver em outra URL, ajuste o valor de `NEXT_PUBLIC_API_URL`.

3. Rodar o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acessar a aplicação em:

- http://localhost:3000

---

## 📦 Build de produção

Para gerar o build de produção:

```bash
npm run build
npm run start
```

Por padrão, o Next vai escutar em `http://localhost:3000`.

Certifique-se de que a variável `NEXT_PUBLIC_API_URL` aponte para a URL pública do backend em produção.

---

## 📚 Estrutura principal

- `src/app/page.tsx` – Componente raiz SPA (Sidebar + Upload / Histórico / Dashboard)
- `src/components/pages/*` – Páginas internas (UploadPage, HistoryPage, DashboardPage)
- `src/components/features/*` – Componentes de funcionalidade (UploadForm, EmailModal, etc.)
- `src/components/charts/*` – Gráficos (Recharts)
- `src/components/ui/*` – Biblioteca de componentes shadcn/ui
- `src/lib/api.ts` – Cliente para a API FastAPI (`process-text`, `process-file`, `emails`, `stats`)

---

## 🧪 Testes (se aplicável)

Se forem adicionados testes no futuro, os comandos típicos são:

```bash
npm run test
```

---

## 🚀 Deploy

O frontend pode ser publicado em qualquer provedor compatível com Next.js (Vercel, Netlify, etc.).

No Vercel, basta:

- Importar o repositório
- Definir `NEXT_PUBLIC_API_URL` apontando para o backend em produção
- Executar o fluxo padrão de deploy
