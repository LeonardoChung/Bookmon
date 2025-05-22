import express from 'express';
import { getBichinho, updateBichinho } from '../controllers/bichinho.js';

const router = express.Router();

router.get('/:id', getBichinho);         
router.put('/:id', updateBichinho);      

export default router;