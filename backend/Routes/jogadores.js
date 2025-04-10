import express from "express";
import {
  getJogadores,
  insertJogador,
  updateJogador,
  deleteJogador
} from "../Controllers/jogadores.js";

const router = express.Router();

router.get("/", getJogadores);
router.post("/", insertJogador);
router.put("/:id", updateJogador);
router.delete("/:id", deleteJogador);

export default router;
