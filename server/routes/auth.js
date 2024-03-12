import express from 'express';

const router = express.Router();

import { otpHandler, signupHandler, loginHandler, editProfile } from '../controllers/auth.js';

router.post('/otp/:email', otpHandler);
router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.put('/edit-profile/:id', editProfile);


export default router;