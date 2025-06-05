import express from 'express';
import cors from 'cors';
import bichinhoRoutes from './routes/bichinho.js';
import userRoutes from './routes/users.js';
import feedRoutes from './routes/feed.js';
import authRoutes from './routes/auth.js';
import leiturasRoutes from './routes/leituras.js';
import conquistasRoutes from './routes/conquistas.js';
import metasRoutes from './routes/metas.js';
import cron from "node-cron";
import db from "./db.js";

// 00:00 todos os dias
cron.schedule("0 0 * * *", () => {
  db.query("UPDATE user_metas SET status = 0", (err) => {
    if (err) return console.error("Erro ao resetar metas:", err);
    console.log("Metas resetadas (00:00).");
  });
});

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use(express.json());

app.use('/', authRoutes);
app.use('/api/bichinho', bichinhoRoutes);
app.use('/feed', feedRoutes);
app.use('/user', userRoutes);
app.use('/leituras', leiturasRoutes);
app.use('/metas', metasRoutes);
app.use('/conquistas', conquistasRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});