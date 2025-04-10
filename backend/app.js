import express from "express";
import cors from "cors";
import jogadorRoutes from "./Routes/jogadores.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", jogadorRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
