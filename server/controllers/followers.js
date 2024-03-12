import User from '../models/user.js';

export async function getFollowingsPosts(req, res) {
    try {
        const { userid } = req.params;

        const user = await User.findOne({ userid: userid });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!"
            });
        }

        let posts = [];

        for (let i = 0; i < user.following.length; i++) {

            let followingUser = await User.findById(user.following[i])

                .select('-password')
                .populate([
                    { path: 'profile' },
                    { path: 'posts', populate: { path: 'comments', populate: { path: 'user', select: '-password', populate: { path: 'profile' } } } }
                ]);

            for (let j = 0; j < followingUser.posts.length; j++) {

                let post = followingUser.posts[j].toObject();

                post.userid = followingUser.userid;

                post.profilePic = followingUser.profile.profilePic;

                posts.push(post);
            }
        }

        // Sort the posts array based on the date property
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        console.log(posts);

        return res.status(200).json({
            success: true,
            posts: posts,
            message: "Got all followings' posts."
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            success: false,
            message: "Server error!"
        });
    }
}
