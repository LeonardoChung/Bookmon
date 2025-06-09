import express from "express";
import { listMetas, getMetaPaginas, completeMetaPaginas, getMetaPost, completeMetaPost, getMetaCarne, completeMetaCarne, getMetaLeitura, completeMetaLeitura } from "../controllers/metas.js";

const router = express.Router();

// meta de páginas
router.get("/getPaginas/:id", getMetaPaginas);
router.put('/completePaginas/:id', completeMetaPaginas);

// meta de post
router.get("/getPost/:id", getMetaPost);
router.put('/completePost/:id', completeMetaPost);

// meta de carne
router.get("/getCarne/:id", getMetaCarne);
router.put('/completeCarne/:id', completeMetaCarne);

// meta de leitura
router.get("/getLeitura/:id", getMetaLeitura);
router.put('/completeLeitura/:id', completeMetaLeitura);

// listar metas
router.get("/list/:id", listMetas); 

export default router;