import express from "express";
import { getConquistaPaginas, completeConquistaPaginas, getConquistaQuackito, completeConquistaQuackito, completeConquistaLivros  } from "../controllers/conquistas.js";

const router = express.Router();

router.get("/getPaginas/:id", getConquistaPaginas);
router.put('/completePaginas/:id', completeConquistaPaginas);
router.get("/getQuackito/:id", getConquistaQuackito);
router.put('/completeQuackito/:id', completeConquistaQuackito);
router.put('/livros/:id', completeConquistaLivros);
export default router;