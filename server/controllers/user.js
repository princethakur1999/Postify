import User from '../models/user.js';
import Profile from '../models/profile.js';
import Post from '../models/post.js';

import { v2 as cloudinary } from 'cloudinary';


export async function getUserDetails(req, res) {

    try {

        const { userid, myid } = req.params;

        if (!userid) {

            return res.status(400).json({

                success: false,
                message: "No user id provided"
            });
        }

        const me = await User.findOne({ userid: myid });

        const user = await User.findOne({ userid: userid })
            .select("-password -isVerifiedUser -reportCount -sentRequests -receivedRequests -profileViewers -notifications -activities -messages")
            .populate({
                path: 'profile',
                select: 'profilePic coverPhoto'
            })
            .populate({
                path: 'posts',
                populate: {
                    path: 'comments',
                    populate: {
                        path: 'user',
                        populate: {
                            path: 'profile'
                        }
                    }
                }
            })
            .exec();


        console.log(user);


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "You are not logged in!"
            });
        }


        if (user.isPublicAccount === 'yes' || me.followers.includes(user._id)) {

            return res.status(200).json({

                success: true,
                message: "Data fetched successfully!",
                userDetails: user
            });

        } else {

            user.posts = null;

            console.log(user);

            return res.status(200).json({

                success: true,
                message: "Private account!",
                userDetails: user
            });
        }



    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: "Internal server error"
        });
    }
}

export async function getAllUsers(req, res) {

    try {


        const { userid } = req.params;

        const users = await User.find().select("-password").sort({ createdAt: -1 }).populate('profile').exec();

        console.log(users);

        if (!users) {

            return res.status(404).json({

                success: false,
                message: "No user found"
            });
        }

        const filteredUsers = users.filter((user) => user.userid !== userid);


        function shuffleArray(array) {

            for (let i = array.length - 1; i > 0; i--) {

                const j = Math.floor(Math.random() * (i + 1));

                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }


        shuffleArray(filteredUsers);

        console.log(filteredUsers);

        res.status(200).json({

            success: true,
            message: "User list retrieved successfully",
            users: filteredUsers
        });

    } catch (e) {

        console.log('Error: ', e);

        return res.status(500).json({

            success: false,
            message: "Server error"
        });
    }
}

export async function searchById(req, res) {

    try {

        const { id } = req.params;

        console.log(id);

        if (!id) {

            return res.status(400).json({
                success: false,
                message: "Missing parameter: id"
            });
        }

        let user = await User.findOne({ userid: id }).select('-password').populate('profile').exec();

        console.log(user);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: `Not found!`
            });
        }
        return res.status(200).json({

            success: true,
            user
        });

    } catch (e) {

        console.log('Error in searching user by id: ', e);


        return res.status(500).json({

            success: false,
            message: 'Internal server error'
        });
    }
}

export async function getProfileDetails(req, res) {

    try {

        const { userid } = req.params;


        if (!userid) {

            return res.status(400).json({
                success: false,
                message: "User ID is required!"
            });
        }


        const user = await User.findOne({ userid: userid }).select("-password").populate("profile").populate({ path: "posts", populate: { path: "comments", populate: { path: "user", model: "User", select: "userid", populate: { path: "profile", model: "Profile" } } } }).exec();


        user.posts.sort((a, b) => b.createdAt - a.createdAt);


        console.log(user);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "No such user found."
            })
        }

        return res.status(200).json({

            success: true,
            message: "Successfully fetched the profile details.",
            user: user
        });


    } catch (e) {

        console.error('Error getting profile details: ', e);

        return res.status(500).json({

            success: false,
            message: 'Server error'
        });
    }

}

export async function updateCoverPhoto(req, res) {

    try {

        const { userid } = req.params;

        const { coverPhoto } = req.files;


        console.log(coverPhoto);


        if (!coverPhoto) {

            return res.status(400).json({

                success: false,
                message: "No file provided!"
            });
        }

        const user = await User.findOne({ userid: userid });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"
            });
        }

        const option = {

            folder: "Postify"
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(coverPhoto.tempFilePath, option);

        const url = cloudinaryResponse.secure_url;

        console.log(url);

        const result = await Profile.findByIdAndUpdate(user.profile, { $set: { coverPhoto: url } }).exec();

        console.log(result);

        return res.status(200).json({

            success: true,
            message: 'Cover photo uploaded!'
        });



    } catch (e) {

        console.error("Error in updating cover photo: ", e);

        return res.status(500).json({

            success: false,
            message: "Server Error"
        });
    }
}

export async function updateProfilePic(req, res) {

    try {

        const { userid } = req.params;

        const { profilePic } = req.files;


        console.log(profilePic);


        if (!profilePic) {

            return res.status(400).json({

                success: false,
                message: "No file provided!"
            });
        }

        const user = await User.findOne({ userid: userid });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"
            });
        }

        const option = {

            folder: "Postify"
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(profilePic.tempFilePath, option);

        const url = cloudinaryResponse.secure_url;

        console.log(url);

        const result = await Profile.findByIdAndUpdate(user.profile, { $set: { profilePic: url } }).exec();

        console.log(result);

        return res.status(200).json({

            success: true,
            message: 'Profile picture updated!',
        });



    } catch (e) {

        console.error("Error in updating cocer photo: ", e);

        return res.status(500).json({

            success: false,
            message: "Server Error"
        });
    }
}


export async function checkUserid(req, res) {

    try {

        const { userid } = req.params;

        console.log(userid);

        if (!userid) {

            return res.status(400), json({

                success: false,
                message: "No User ID provided!"
            });
        }

        const user = await User.findOne({ userid: userid });

        if (user) {

            return res.status(400).json({

                success: false,
                message: 'Unavaiable UserID.'
            })
        }

        return res.status(201).json({

            success: true,
            message: 'Avaliable UserID.',
        })


    } catch (e) {

        console.log(e);

        return res.status(501).json({

            success: false,
            message: "Server error!"
        })
    }
}


export async function createPost(req, res) {

    try {

        const { post } = req.files;

        const { userid } = req.params;

        console.log(post);

        if (!post || !userid) {

            return res.status(400).json({

                success: false,
                message: "Missing fields!"
            });
        }

        const user = await User.findOne({ userid: userid });

        if (!user) {

            return res.status(400).json({

                success: false,
                message: "User not found."
            });
        }

        const option = {

            folder: "Postify"
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(post.tempFilePath, option);


        const newPost = new Post({

            poster: userid,
            image: cloudinaryResponse.secure_url
        });

        const savedPost = await newPost.save();



        console.log(savedPost);


        if (!savedPost) {

            return res.status(400).json({

                success: false,
                message: "Image upload failed."
            })
        }

        const postIdSaved = await User.findByIdAndUpdate(user._id, { $push: { posts: savedPost._id } }, { new: true });

        console.log(postIdSaved);

        if (!postIdSaved) {

            return res.status(400).json({
                success: false,
                message: "User not found."
            })
        }

        return res.status(200).json({

            success: true,
            message: 'Uploaded!',
        });

    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: "Server error!"
        })

    }
}



export async function getNotifications(req, res) {

    try {

        const { userid } = req.params;

        if (!userid) {

            return res.status(400).json({

                success: false,
                message: 'User ID is required!'
            });
        }

        const user = await User.findOne({ userid: userid }).populate({ path: "notifications", populate: { path: "post" } }).exec();

        console.log(user.notifications);


        return res.status(200).json({

            success: true,
            message: "Get notifications successfully!",
            notifications: user.notifications
        });


    } catch (e) {

        console.log(e);

        return res.status(500).json({
            success: false,
            message: "Server error!"
        })
    }
}


export async function getActivities(req, res) {

    try {

        const { userid } = req.params;


        if (!userid) {

            return res.status(400).json({

                success: false,
                message: "User id is required!"
            });
        }

        const user = await User.findOne({ userid: userid }).select("-password").populate({ path: "activities", populate: { path: "post" } }).exec();


        console.log(user);


        return res.status(200).json({

            success: true,
            message: "Successfully fetched activities!",
            activities: user.activities
        });



    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: "Server error!"
        })

    }
}