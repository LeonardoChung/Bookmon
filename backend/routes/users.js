import express from "express";
import { createPost, getConquistas, getPosts, getuserInfo } from "../controllers/users.js";

const router = express.Router();

// para o perfil
router.get("/:id", getuserInfo);

// para postagens
router.post("/", createPost);
router.get("/posts/:id", getPosts);

// conquistas
router.get("/conquistas/:id", getConquistas);

export default router;