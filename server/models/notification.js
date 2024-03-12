import mongoose from 'mongoose';


const notificationSchema = new mongoose.Schema(
    {

        userid: {
            type: String,
            required: true
        },

        profilePic: {
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

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;