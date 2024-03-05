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
        },
        token: {
            type: String,
            trim: true,
            unique: true
        },
        isVerifiedUser: {
            type: Boolean,
            default: false
        },
        isPublicAccount: {
            type: Boolean,
            default: false
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
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }]

    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
