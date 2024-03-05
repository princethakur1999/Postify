import User from '../models/user.js';
import Profile from '../models/profile.js';

import { v2 as cloudinary } from 'cloudinary';

export async function getAllUsers(req, res) {

    try {

        const users = await User.find().sort({ createdAt: -1 }).populate("profile").exec();

        console.log(users);

        if (!users) {

            return res.status(404).json({

                success: false,
                message: "No user found"
            });
        }

        res.status(200).json({

            success: true,
            message: "User list retrieved successfully",
            users
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

            folder: "Micropost"
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

            folder: "Micropost"
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




export async function getProfileDetails(req, res) {

    try {

        const { userid } = req.params;


        if (!userid) {

            return res.status(400).json({
                success: false,
                message: "User ID is required!"
            });
        }


        const user = await User.findOne({ userid: userid }).select("-password").populate("profile").exec();

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





