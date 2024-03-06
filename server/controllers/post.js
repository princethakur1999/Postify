import User from '../models/user.js';
import Post from '../models/post.js'

export async function addLike(req, res) {

    try {

        const { id, userid } = req.params;

        if (!id || !userid) {

            return res.status(400).json({

                success: false,
                message: 'Missing fields'
            });
        }

        const user = await User.findOne({ userid: userid });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"
            });

        }

        const likedPost = await Post.findById(id);


        if (likedPost.likes.includes(user._id)) {

            likedPost.likes.pull(user._id);

            await likedPost.save();


            return res.status(200).json({

                success: true,
                message: "Unliked"

            })
        }

        likedPost.likes.push(user._id);

        await likedPost.save();

        return res.status(200).json({

            success: true,
            message: "Liked"

        });



    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: e.message
        });


    }
}