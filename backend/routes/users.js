import express from "express";
import {createPost,completeConquistas, getConquistas, getUserPosts, getuserInfo } from "../controllers/users.js";


const router = express.Router();

// para postagens
router.post("/createPost/:id", createPost);
router.get("/posts/:id", getUserPosts);

// conquistas
router.get("/conquistas/:id", getConquistas);
router.put("/conquistas/paginas/:id", completeConquistas);

// para o perfil
router.get("/:id", getuserInfo);

export default router;