import express from 'express';

const router = express.Router();

import { searchById, getAllUsers, updateCoverPhoto, getProfileDetails, updateProfilePic } from '../controllers/user.js';

router.get('/search-user-by-userid/:id', searchById);

router.get('/users', getAllUsers);

router.post('/update-cover-photo/:userid', updateCoverPhoto);
router.post('/update-profile-pic/:userid', updateProfilePic);


router.get('/profile/:userid', getProfileDetails);

export default router;