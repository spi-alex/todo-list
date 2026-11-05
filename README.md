# Gerenciador de Tarefas

Projeto de desenvolvimento web para gerenciamento de tarefas individuais, desenvolvido com Next.js, Prisma e Clerk.

## Dependências necessárias

Antes de começar, certifique-se de ter instalado na sua máquina:
- **Node.js** (versão 20.9 ou superior / recomendada 22 LTS)
- **Docker Desktop** (para rodar o banco de dados PostgreSQL)
- **Git**

---

## Como configurar o arquivo .env

1. Na raiz do projeto, crie um arquivo chamado `.env` (você pode se basear no arquivo `.env.example`).
2. Cole o seguinte conteúdo e preencha com as suas chaves do Clerk e dados do banco:

```env
# Banco de dados (PostgreSQL via Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todolist?schema=public"

# Chaves de autenticação do Clerk (pegue no seu dashboard do Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=sua_publishable_key_aqui
CLERK_SECRET_KEY=sua_secret_key_aqui

# Rotas de redirecionamento do Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/tasks
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/tasks