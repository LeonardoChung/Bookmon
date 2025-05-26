import express from "express";
import {login, register} from "../controllers/auth.js";

const router = express.Router();

// register
router.post('/cadastro', register);

// login
router.post('/login', login);

export default router;