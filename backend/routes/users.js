import express from "express";
import { createPost, getPosts } from "../controllers/users";

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPosts);

export default router;