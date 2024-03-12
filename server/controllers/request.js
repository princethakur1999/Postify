import User from '../models/user.js';

export async function sendRequest(req, res) {

    try {

        const { id, userid } = req.params;

        console.log(id, userid);

        if (!id || !userid) {

            return res.status(400).json({
                success: false,
                message: "Missing parameters!"
            });
        }


        if (id == userid) {

            return res.status(400).json({

                success: false,
                message: "You can't add yourself as friend."
            });
        }

        const sender = await User.findOne({ userid: userid });


        if (id == sender._id) {

            return res.status(400).json({

                success: false,
                message: "You can't add yourself as friend."
            });
        }


        if (!sender) {

            return res.status(404).json({

                success: false,
                message: "Sender not found!"
            });
        }

        if (sender.following.includes(id)) {

            return res.status(409).json({

                success: false,
                message: "Already following this user!"
            });
        }


        if (sender.sentRequests.includes(id)) {

            return res.status(409).json({

                success: false,
                message: "Already sent!"
            });
        }

        const recipient = await User.findByIdAndUpdate(sender._id, { $push: { sentRequests: id } }, { new: true }).exec();

        if (!recipient) {

            return res.status(400).json({

                success: false,
                message: "Sender hasn't sent any requests yet."
            });
        }

        const updatedRecipient = await User.findByIdAndUpdate(id, { $push: { receivedRequests: sender._id } }, { new: true }).exec();

        if (!updatedRecipient) {

            return res.status(404).json({

                success: false,
                message: 'Recipient not found!'
            });
        }

        return res.status(200).json({

            success: true,
            message: 'Request sent successfully.',
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal server error!",
            error: error.message
        });
    }
}

export async function cancelSentRequest(req, res) {

    try {

        const { id, userid } = req.params;

        console.log(id, userid);


        const sender = await User.findOne({ userid: userid });

        const receiver = await User.findOne({ _id: id });


        console.log(sender, receiver);


        if (!sender || !receiver) {

            return res.status(400).json({
                success: false,
                message: 'User not found.'
            });
        }

        sender.sentRequests.pull(receiver._id);

        receiver.receivedRequests.pull(sender._id);

        await sender.save();
        await receiver.save();


        return res.status(201).json({

            success: true,
            message: 'Request canceled successfully!'
        });

    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: "Server error!"
        })

    }
}

export async function viewSentRequests(req, res) {

    try {


        const { userid } = req.params;

        if (!userid) {

            return res.status(400).json({

                success: false,
                message: "Invalid request!"
            });
        }


        const user = await User.findOne({ userid: userid }).select('-password -token -posts -messages -reportCount -sentRequests -receivedRequests').populate({ path: 'sentRequests', select: '-password -token -posts -messages -reportCount -sentRequests -receivedRequests', populate: { path: 'profile', select: '-_id -createdAt -updatedAt -__v', }, });


        if (!user) {

            return res.status(400).json({

                success: false,
                message: "User not found!"
            })
        }

        console.log(user.sentRequests);

        if (user.sentRequests.length == 0) {

            return res.status(400).json({

                success: false,
                message: 'No sent requests!'
            });
        }

        return res.status(200).json({

            success: true,
            message: 'Sent requests.',
            data: user.sentRequests
        });


    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: "Error fetching requests!"
        });
    }
}


export async function viewReceivedRequests(req, res) {

    try {


        const { userid } = req.params;

        if (!userid) {

            return res.status(400).json({

                success: false,
                message: "Invalid request!"
            });
        }


        const user = await User.findOne({ userid: userid }).select('-password -token -posts -messages -reportCount -sentRequests -receivedRequests').populate({ path: 'receivedRequests', select: '-password -token -posts -messages -reportCount -sentRequests -receivedRequests', populate: { path: 'profile', select: '-_id -createdAt -updatedAt -__v', }, });


        if (!user) {

            return res.status(400).json({

                success: false,
                message: "User not found!"
            })
        }

        console.log(user.receivedRequests);

        if (user.receivedRequests.length == 0) {

            return res.status(400).json({

                success: false,
                message: 'No requests received yet!'
            });
        }

        return res.status(200).json({

            success: true,
            message: "Received requests.",
            data: user.receivedRequests
        });


    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: "Error fetching requests!"
        });
    }
}


export async function confirmRequest(req, res) {

    try {

        const { senderid, receiveruserid } = req.params;

        console.log(senderid, receiveruserid);


        if (!senderid || !receiveruserid) {

            return res.status(400).json({

                success: false,
                message: "Invalid request parameters."
            });
        }


        const sender = await User.findOne({ _id: senderid });

        const receiver = await User.findOne({ userid: receiveruserid });

        if (!sender || !receiver) {

            return res.status(404).json({

                success: false,
                message: "User not found!"
            });
        }

        sender.sentRequests.pull(receiver._id);
        sender.following.push(receiver._id);

        receiver.receivedRequests.pull(sender._id);
        receiver.followers.push(sender._id);

        const response1 = await sender.save();

        const response2 = await receiver.save();

        if (!response1 || !response2) {

            return res.status(500).json({

                success: false,
                message: "Error while processing the request!"
            })
        }



        return res.status(200).json({

            success: true,
            message: "Confirmed."
        });


    } catch (e) {

        console.log(e);

        return res.status(400).json({

            success: false,
            message: "Invalid request parameters."
        });

    }
}


export async function cancelReceivedRequest(req, res) {

    try {

        const { senderid, receiveruserid } = req.params;

        console.log(senderid, receiveruserid);


        if (!senderid || !receiveruserid) {

            return res.status(400).json({

                success: false,
                message: "Invalid request parameters."
            });
        }


        const sender = await User.findOne({ _id: senderid });

        const receiver = await User.findOne({ userid: receiveruserid });

        if (!sender || !receiver) {

            return res.status(404).json({

                success: false,
                message: "User not found!"
            });
        }

        sender.sentRequests.pull(receiver._id);

        receiver.receivedRequests.pull(sender._id);

        const response1 = await sender.save();

        const response2 = await receiver.save();

        if (!response1 || !response2) {

            return res.status(400).json({

                success: false,
                message: "Error while processing the request!"
            })
        }



        return res.status(200).json({

            success: true,
            message: "Cancled!",
        });


    } catch (e) {

        console.log(e);

        return res.status(400).json({

            success: false,
            message: "Invalid request parameters."
        });

    }
}