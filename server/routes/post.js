import express from 'express';

const router = express.Router();


import { addLike } from '../controllers/post.js';

router.post('/like/:id/:userid', addLike);

export default router;