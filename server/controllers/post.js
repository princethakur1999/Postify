import Comment from '../models/comment.js';
import User from '../models/user.js';
import Post from '../models/post.js';
import Notification from '../models/notification.js';
import Activity from '../models/activity.js';
import Profile from '../models/profile.js';

export async function addLike(req, res) {

    try {

        const { id, userid } = req.params;

        if (!id || !userid) {

            return res.status(400).json({

                success: false,
                message: 'Missing fields in the request parameters!'
            });
        }

        const user = await User.findOne({ userid: userid }).exec();

        if (!user) {

            return res.status(404).json({

                success: false,
                message: 'User not found.'
            });
        }

        const profile = await Profile.findById(user.profile);


        const likedPost = await Post.findById(id).exec();

        if (!likedPost) {

            return res.status(404).json({

                success: false,
                message: 'Post not found.'
            });
        }

        const poster = await User.findOne({ userid: likedPost.poster });

        if (likedPost.likes.includes(user._id)) {

            likedPost.likes.pull(user._id);

            await likedPost.save();

            const notification = new Notification({

                userid: userid,
                profilePic: profile.profilePic,
                text: `${poster.firstname == user.firstname ? 'You' : user.firstname} unliked your post.`,
                post: likedPost,
            });

            await notification.save();
            poster.notifications.push(notification._id);
            await poster.save();

            const activity = new Activity({
                posterid: poster.userid,
                text: 'You unliked this post.',
                post: likedPost,
            });
            await activity.save();
            user.activities.push(activity._id);
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'Unliked'
            });
        }

        likedPost.likes.push(user._id);
        await likedPost.save();

        const notification = new Notification({
            userid: userid,
            profilePic: profile.profilePic,
            text: `${poster.firstname == user.firstname ? 'You' : user.firstname} liked your post.`,
            post: likedPost,
        });
        await notification.save();
        poster.notifications.push(notification._id);
        await poster.save();

        const activity = new Activity({
            posterid: poster.userid,
            text: 'You liked this post.',
            post: likedPost,
        });
        await activity.save();
        user.activities.push(activity._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Liked'
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: 'Internal server error.'
        });
    }
}


export async function addComment(req, res) {

    try {

        const { id, comment, userid } = req.params;

        if (!id || !userid || !comment) {

            return res.status(400).json({

                success: false,
                message: 'Missing fields'
            });
        }

        const user = await User.findOne({ userid: userid });

        if (!user) {

            return res.status(401).json({

                success: false,
                message: "User not found"
            });
        }


        const post = await Post.findById(id);

        if (!post) {

            return res.status(401).json({

                success: false,
                message: "Post not found"
            });
        }


        const myComment = new Comment({

            post: id,
            user: user._id,
            comment: comment
        });

        const savedComment = await myComment.save();

        post.comments.push(savedComment._id);

        await post.save();

        const poster = await User.findOne({ userid: post.poster }).populate("notifications");
        const profile = await Profile.findOne({ _id: poster.profile }).exec();

        const notification = new Notification({

            userid: userid,
            profilePic: profile.profilePic,
            text: `${poster.firstname == user.firstname ? "You" : user.firstname} commented ${comment} on your post.`,
            post: post,
        });

        await notification.save();

        poster.notifications.unshift(notification._id);

        await poster.save();


        const activity = new Activity({

            posterid: poster.userid,
            text: `You commented ${comment} on this post.`,
            post: post,
        });

        await activity.save();
        user.activities.push(activity._id);
        await user.save();


        return res.status(200).json({

            success: true,
            message: 'Comment added.'

        });


    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: 'Server error'
        });
    }
}


