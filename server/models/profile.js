import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(

    {
        profilePic: {
            type: String,
            trim: true
        },
        coverPhoto: {
            type: String,
            trim: true
        },
        phoneNumber: {
            type: Number,
            trim: true
        },
        age: {
            type: Number,
            trim: true
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            lowercase: true
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 20
        },
        country: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
