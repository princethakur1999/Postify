import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export default async function sendEmail(email, title, body) {

    try {


        const transporter = nodemailer.createTransport({

            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = { from: 'Micropost', to: email, subject: title, html: body };

        await transporter.sendMail(mailOptions);

    } catch (error) {

        console.error('Error sending email:', error);
    }
}
