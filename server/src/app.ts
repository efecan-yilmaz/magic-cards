require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';

import { UserModel } from './model/User';

const app: express.Express = express();

app.listen(3001);

app.use('/graphql', graphqlHTTP({
    schema: null,
    rootValue: {},
    graphiql: true
}));

// initialize database connection
mongoose.connect(String(process.env.MONGO_URL));
