import express from 'express';

import connectToDatabase from './config/database.js';
import connectToCloudinary from './config/cloudinary.js';


const app = express();


connectToDatabase();
connectToCloudinary();