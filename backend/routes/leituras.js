import express from "express";
import {getLeituras, updateLeitura, createLeitura } from "../controllers/leituras.js";

const router = express.Router();

router.post("/createLeitura/:id", createLeitura);
router.get("/getLeituras/:id", getLeituras);
router.put('/:id', updateLeitura);

export default router;