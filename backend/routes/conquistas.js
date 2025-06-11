import express from "express";
import { getConquistaPaginas, completeConquistaPaginas, getConquistaQuackito, completeConquistaQuackito, getConquistaLivros, completeConquistaLivros, getConquistaPosts, completeConquistaPosts  } from "../controllers/conquistas.js";

const router = express.Router();

// conquista 50 paginas
router.get("/getPaginas/:id", getConquistaPaginas);
router.put('/completePaginas/:id', completeConquistaPaginas);
// conquista nivel 3 quackito
router.get("/getQuackito/:id", getConquistaQuackito);
router.put('/completeQuackito/:id', completeConquistaQuackito);
// conquista 10 leituras
router.get("/getLivros/:id", getConquistaLivros);
router.put('/livros/:id', completeConquistaLivros);
// conquista 5 posts
router.get("/getPosts/:id", getConquistaLivros);
router.put('/posts/:id', completeConquistaPosts);

export default router;