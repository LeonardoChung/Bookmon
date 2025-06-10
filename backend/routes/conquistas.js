import express from "express";
import { getConquistaPaginas, completeConquistaPaginas, getConquistaQuackito, completeConquistaQuackito, completeConquistaLivros, completeConquistaPosts  } from "../controllers/conquistas.js";

const router = express.Router();

router.get("/getPaginas/:id", getConquistaPaginas);
router.put('/completePaginas/:id', completeConquistaPaginas);
router.get("/getQuackito/:id", getConquistaQuackito);
router.put('/completeQuackito/:id', completeConquistaQuackito);
router.put('/livros/:id', completeConquistaLivros);
router.put('/posts/:id', completeConquistaPosts);
export default router;