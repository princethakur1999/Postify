import express from 'express';

const router = express.Router();

import { getFollowingsPosts } from '../controllers/followers.js';

router.get('/followers-posts/:userid', getFollowingsPosts);

export default router;