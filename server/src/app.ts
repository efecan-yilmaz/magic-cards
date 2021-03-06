import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLError } from 'graphql';

import RootSchema from './model/GraphQL/Schema';
import { findError, IError, ErrorType } from './model/GraphQL/Errors';

dotenv.config();
const app: express.Express = express();

app.use(cors());

app.listen(8080);

app.use('/graphql', graphqlHTTP({
    schema: RootSchema,
    rootValue: {},
    graphiql: true,
    customFormatErrorFn: (err: GraphQLError): any => {
        const error: IError | undefined = findError(err.message);
        if (error && err.message !== ErrorType.SERVER_ERROR.name) {
            return ({ message: error.message, statusCode: error.status });
        } else {
            return ({ message: err.message, statusCode: 501 });
        }
    }
}));

// initialize database connection
mongoose.connect(String(process.env.MONGO_URL));
