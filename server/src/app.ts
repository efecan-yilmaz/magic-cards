require('dotenv').config();
import mongoose from 'mongoose';

import { UserModel } from './model/User';

// initialize database connection
mongoose.connect(String(process.env.MONGO_URL));
