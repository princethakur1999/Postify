import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';

dotenv.config();

export default async function connectToCloudinary() {

    try {

        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {

            throw new Error('Please set CLOUD_NAME, API_KEY, and API_SECRET.');
        }

        await cloudinary.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.API_KEY, api_secret: process.env.API_SECRET });

        console.log("Cloudinary connected successfully.");

    } catch (e) {

        console.error('Error connecting to Cloudinary', e);
    }
}
