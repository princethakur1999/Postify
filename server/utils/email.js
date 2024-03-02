import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();


export default async function sendEmail(email, title, body) {

    try {

        const transporter = nodemailer.createTransport({ service: process.env.MAIL_HOST, auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } });

        await transporter.sendMail({ from: "Micropost", to: `${email}`, subject: `${title}`, html: `${body}` });

        console.log("Email sent to: ", email);

    } catch (e) {

        console.log("Caught exception in  sending email", e);
    }
}