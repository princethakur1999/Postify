import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
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

const Post = mongoose.model("Post", postSchema);

export default Post;