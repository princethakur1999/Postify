import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
    {

        posterid: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    },

    {
        timestamps: true
    }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;