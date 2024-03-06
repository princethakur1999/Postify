import express from 'express';

const router = express.Router();

import { getAllUsers, searchById, getProfileDetails, updateCoverPhoto, updateProfilePic, createPost } from '../controllers/user.js';

router.get('/users', getAllUsers);

router.get('/search-user-by-userid/:id', searchById);

router.get('/profile/:userid', getProfileDetails);

router.post('/update-cover-photo/:userid', updateCoverPhoto);
router.post('/update-profile-pic/:userid', updateProfilePic);

router.post('/create-post/:userid', createPost);



export default router;