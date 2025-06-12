## 🐥📖 Bookmon

Uma plataforma que busca incentivar a leitura! No Bookmon, você adota um Quackito (um bichinho virtual) que cresce e evolui conforme você lê!
Desenvolvido com React, Node.js (Express) e MySQL.

## 📌 Funcionalidades
📚 Registro de leituras

💬 Postagens para a comunidade

🐣 Mascote virtual (estilo Pou) que evolui com base na leitura

🧠 Sistema gameficado de pontuação, metas e conquistas

🔐 Autenticação de usuários

## 💭 Como rodar o projeto?
No MySQL Workbench rode o script bookmon.sql

### 1. Clone o repositório:
No terminal, navegue até o local onde deseja salvar o projeto e execute

`git clone https://github.com/LeonardoChung/Bookmon`

### 2. Para o backend, execute no terminal (cd backend):
 ```
npm install
npm install bcryptjs cors express jsonwebtoken mysql mysql2 node-cron
 ```

### 3. Para o frontend, abra um novo terminal e execute no terminal (cd frontend/reactproject):
 ```
npm install
npm install axios jwt-decode react-confetti react-use
 ```

### 4. Agora, quando quiser rodar o projeto, digite em dois terminais:
 ```
cd backend
npm start
 ```

 ```
cd frontend/reactproject
npm start
 ```

