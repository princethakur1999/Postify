import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(

    {
        firstname: {
            type: String,
            trim: true,
            required: true,
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        userid: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
        },
        token: {
            type: String,
            trim: true,
            unique: true
        },
        isVerifiedUser: {
            type: String,
            default: "yes"
        },
        isPublicAccount: {
            type: String,
            default: "yes"
        },
        reportCount: {
            type: Number,
            default: 0
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        sentRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        receivedRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        profileViewers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        notifications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification"
        }],
        activities: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity"
        }],
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }]

    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
