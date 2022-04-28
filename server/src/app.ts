require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';

import { UserModel } from './model/User';

const app: express.Express = express();

app.listen(3001);

// initialize database connection
mongoose.connect(String(process.env.MONGO_URL));
