import express from "express";
import {login, register, createPost, getConquistas, getUserPosts, getuserInfo } from "../controllers/users.js";

const router = express.Router();

// register
router.post('/', register);

// login
router.post('/login', login);

// para postagens
router.post("/createPost/:id", createPost);
router.get("/posts/:id", getUserPosts);

// conquistas
router.get("/conquistas/:id", getConquistas);

// para o perfil
router.get("/:id", getuserInfo);

export default router;