import User from "../models/user.js";
import Post from "../models/post.js";
import Profile from "../models/profile.js";
import Notification from "../models/notification.js";
import Activity from "../models/activity.js";
import Message from "../models/message.js";
import Comment from "../models/comment.js";

export async function deleteAccount(req, res) {

    try {

        const { userid } = req.params;

        if (!userid) {

            return res.status(404).json({

                success: false,
                message: 'No user id provided!'
            });
        }

        // Find the user to be deleted
        const user = await User.findOne({ userid });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: 'User not found!'
            });
        }



        // Delete related data
        await Promise.all([

            Post.deleteMany({ _id: { $in: user.posts } }),
            Profile.deleteOne({ _id: user.profile }),
            Notification.deleteMany({ _id: { $in: user.notifications } }),
            Activity.deleteMany({ _id: { $in: user.activities } }),
            Message.deleteMany({ _id: { $in: user.messages } }),
            Comment.deleteMany({ user: user._id })
        ]);

        // Remove user from other users' followers list and following list
        await Promise.all([
            User.updateMany({ followers: user._id }, { $pull: { followers: user._id } }),
            User.updateMany({ following: user._id }, { $pull: { following: user._id } })
        ]);

        // Remove user from other users' sentRequests and receivedRequests lists
        await Promise.all([
            User.updateMany({ sentRequests: user._id }, { $pull: { sentRequests: user._id } }),
            User.updateMany({ receivedRequests: user._id }, { $pull: { receivedRequests: user._id } })
        ]);


        // Delete the user
        await User.deleteOne({ _id: user._id });

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully!"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: 'Server error!'
        });
    }
}
