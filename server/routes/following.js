import express from 'express';

const router = express.Router();

import { getFollowingsPosts } from '../controllers/following.js';

router.get('/followers-posts/:userid', getFollowingsPosts);

export default router;