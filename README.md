# ⚽ Sistema CRUD de Jogadores de Futebol

Este projeto é um sistema CRUD completo para gerenciar jogadores de futebol. Ele permite **cadastrar, visualizar, editar e excluir** jogadores, usando:

- **Frontend:** React
- **Backend:** Node.js + Express
- **Banco de Dados:** MySQL

---

## Estrutura do Projeto

```
Crud/
├── backend/
│   ├── app.js
│   ├── db.js
│   ├── Routes/
│   └── Controllers/
├── frontend/
│   └── reactproject/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── pages/
│       │       └──ListaJogadores.jsx
|       |       └──DetalhesJogador.jsx
|       |       └──FormularioJogador.jsx   
```

---

## ⚙️ Funcionalidades

- ✅ Cadastro de jogadores
- ✅ Listagem com paginação
- ✅ Visualização detalhada
- ✅ Edição de jogadores
- ✅ Exclusão com confirmação

---

## Como executar o projeto localmente

### 1. Banco de dados MySQL

1. Crie o banco de dados:
   ```sql
   CREATE DATABASE futebol;
   ```
2. Importe o script `banco_futebol.sql` para criar a tabela `jogadores`.

---

### 2. Backend

```bash
cd backend
npm install
node app.js
```

- O backend estará rodando na porta **8800**.
- Verifique se o arquivo `db.js` está com seu usuário/senha MySQL corretos.

---

### 3. Frontend

```bash
cd frontend/reactproject
npm install
npm start
```

- O frontend abrirá em `http://localhost:3000`.

---

## Telas do Sistema

- Página inicial com listagem dos jogadores
- Botão para adicionar novo jogador
- Tela de visualização de detalhes
- Tela de edição (campos preenchidos automaticamente)

---

## Desenvolvido por

**Leonardo Min Woo Chung**

---

