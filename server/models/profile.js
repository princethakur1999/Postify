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
        joinedOn: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"],
            lowercase: true
        },
        describeYourselfInOneWord: {
            type: String,
            trim: true,
            maxlength: 20
        }
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
