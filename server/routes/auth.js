import express from 'express';

const router = express.Router();

import { otpHandler, signupHandler, loginHandler } from '../controllers/auth.js';

router.post('/otp/:email', otpHandler);
router.post('/signup', signupHandler);
router.post('/login', loginHandler);


export default router;