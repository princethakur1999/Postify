import express from 'express';

const router = express.Router();


import { deleteAccount } from './../controllers/setting.js';


router.delete('/delete-account/:userid', deleteAccount);


export default router;