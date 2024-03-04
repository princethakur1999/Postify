import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

export default async function connectToDatabase() {

    try {

        await mongoose.connect(process.env.DB_URL);

        console.log("MongoDB connected successfully.");

    } catch (e) {

        console.error("Error connecting to MongoDB: ", e.message);

        process.exit(1);
    }
}