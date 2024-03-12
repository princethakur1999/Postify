import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema(

    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true
    }
);


const Comment = mongoose.model("Comment", commentSchema);

export default Comment; 
