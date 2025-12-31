DevBurger API 🍔

API do projeto DevBurger, responsável por gerenciar autenticação, usuários, produtos, pedidos e pagamentos.
Desenvolvida em Node.js, seguindo boas práticas de organização, segurança e escalabilidade.

🚀 Tecnologias

Node.js

Express

PostgreSQL

MongoDB

Sequelize

Mongoose

JWT (Autenticação)

Stripe (Pagamentos)

Docker & Docker Compose

📁 Estrutura do projeto
src/
 ├── config/          # Configurações (database, auth, etc.)
 ├── controllers/     # Controllers da aplicação
 ├── database/        # Migrations e seeders (Sequelize)
 ├── middlewares/     # Middlewares (auth, validações)
 ├── models/          # Models Sequelize e Mongoose
 ├── routes/          # Definição das rotas
 ├── services/        # Serviços externos (Stripe, etc.)
 ├── app.js           # Configuração do Express
 └── server.js        # Inicialização do servidor

⚙️ Variáveis de ambiente

Crie um arquivo .env baseado no .env.example:

PORT=3001

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=devburger

# MongoDB
MONGO_URI=mongodb://localhost:27017/devburger

# Auth
JWT_SECRET=sua_chave_secreta

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx


⚠️ Nunca versionar o arquivo .env

▶️ Como rodar o projeto
Pré-requisitos

Node.js (v18 ou superior)

Docker e Docker Compose

PostgreSQL

MongoDB

Instalação das dependências
npm install
# ou
yarn

Rodando com Docker (recomendado)
docker compose up --build


A API ficará disponível em:

http://localhost:3001

Rodando sem Docker
npm run dev
# ou
yarn dev

🔐 Autenticação

A autenticação é feita utilizando JWT.

O login retorna um token

Rotas protegidas exigem o header:

Authorization: Bearer <token>

💳 Pagamentos

Os pagamentos são processados via Stripe:

Criação de Payment Intent

Confirmação do pagamento no frontend

Comunicação segura entre frontend e backend

📦 Funcionalidades principais

Cadastro e login de usuários

Autenticação com JWT

CRUD de produtos

Criação e gerenciamento de pedidos

Integração com Stripe

Upload de imagens

Controle de permissões (admin)

🧪 Boas práticas aplicadas

Arquitetura MVC

Separação de responsabilidades

Variáveis de ambiente

Segurança com JWT

Docker para padronização de ambiente

Código organizado e escalável

