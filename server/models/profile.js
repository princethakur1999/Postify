import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        photo: {
            type: String,
            trim: true,
            default: "default-profile.jpg"
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
            maxlength: 20,
        },
        country: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
