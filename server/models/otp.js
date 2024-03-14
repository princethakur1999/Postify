import mongoose from 'mongoose';

import sendEmail from './../utils/email.js';

import generateOTPEmailTemplate from './../templates/otp.js';


const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true
        },
        otp: {
            type: Number,
            trim: true,
            required: true,
        },
        expireAt: {
            type: Date,
            default: Date.now,
            expires: 5 * 60
        }
    }

);

async function sender(email, otp) {

    try {

        const body = generateOTPEmailTemplate(otp);

        await sendEmail(email, "Postify", body);

    } catch (e) {

        console.log('Error in sending Email', e);
    }
}



otpSchema.pre('save', function (next) {

    if (this.isNew) {

        sender(this.email, this.otp);
    }

    next();
});



const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
