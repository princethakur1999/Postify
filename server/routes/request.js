import express from 'express';

const router = express.Router();

import { sendRequest, cancelSentRequest, viewSentRequests, viewReceivedRequests, confirmRequest, cancelReceivedRequest } from '../controllers/request.js';


router.post('/send-follow-request/:id/:userid', sendRequest);
router.delete('/cancel-sent-request/:id/:userid', cancelSentRequest);
router.get('/view-sent-requests/:userid', viewSentRequests);
router.get('/view-received-requests/:userid', viewReceivedRequests);
router.post('/confrim-request/:senderid/:receiveruserid', confirmRequest);
router.delete('/cancel-received-request/:senderid/:receiveruserid', cancelReceivedRequest);

export default router;