import express from 'express';

const router = express.Router();

router.post('/check-userid/:userid', checkUserid)

import {
    getUserDetails,
    getAllUsers,
    searchById,
    getProfileDetails,
    updateCoverPhoto,
    updateProfilePic,
    checkUserid,
    createPost,
    getNotifications,
    getActivities

} from '../controllers/user.js';

router.get('/user-profile-details/:userid/:myid', getUserDetails);

router.get('/users/:userid', getAllUsers);

router.get('/search-user-by-userid/:id', searchById);

router.get('/profile/:userid', getProfileDetails);

router.post('/update-cover-photo/:userid', updateCoverPhoto);
router.post('/update-profile-pic/:userid', updateProfilePic);

router.get('/check-userid/:userid', checkUserid)

router.post('/create-post/:userid', createPost);

router.get('/get-notifications/:userid', getNotifications);
router.get('/get-activities/:userid', getActivities);



export default router;