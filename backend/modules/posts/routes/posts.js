import express from 'express';
import {getPosts, createPosts, updatePosts, deletePosts, likePosts, getPost} from '../controllers/posts.js';

const router = express.Router();
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPosts);
router.patch('/:id', updatePosts);
router.delete('/:id', deletePosts);
router.patch('/:id/likePost', likePosts);

export default router;
