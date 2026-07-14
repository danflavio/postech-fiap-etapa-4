import express from 'express';
import postsController from '../controllers/postsController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', postsController.getAllPosts);
router.get('/search', postsController.searchPosts);
router.get('/:id', postsController.getPostById);
router.post('/', verificarToken, postsController.createPost);
router.put('/:id', verificarToken, postsController.updatePost);
router.delete('/:id', verificarToken, postsController.deletePost);

export default router;
