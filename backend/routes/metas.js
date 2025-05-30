import express from "express";
import { getMetaLeitura, completeMetaLeitura } from "../controllers/metas.js";

const router = express.Router();

// meta de leitura
router.get("/leitura/:id", getMetaLeitura);
router.put('/leitura/:id', completeMetaLeitura);

export default router;