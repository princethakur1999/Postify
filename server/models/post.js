import mongoose from 'mongoose';

const post = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        description: {
            type: String,
            trim: true
        },
        image: {
            type: String,
            trim: true,
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", post);

export default Post;