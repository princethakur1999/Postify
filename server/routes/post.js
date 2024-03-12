import express from 'express';

const router = express.Router();


import { addLike, addComment } from '../controllers/post.js';

router.post('/like/:id/:userid', addLike);
router.post('/comment/:id/:comment/:userid', addComment);

export default router;