import express from "express";
import { getConquistaPaginas, completeConquistaPaginas  } from "../controllers/conquistas.js";

const router = express.Router();

router.get("/getPaginas/:id", getConquistaPaginas);
router.put('/completePaginas/:id', completeConquistaPaginas);

export default router;