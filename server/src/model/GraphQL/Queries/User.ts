import { GraphQLObjectType, GraphQLString } from "graphql";
import bcrypt from 'bcrypt';
import { v4 as uidGen } from 'uuid';
import jwt from 'jsonwebtoken';

import { User } from '../../User';
import { ErrorType } from "../Errors";

const TUser: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

const TToken: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name:'Token',
    fields: () => ({
        token: { type: GraphQLString }
    })
});

export const UserQuery: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: 'UserQuery',
    fields: {
        login: {
            type: TToken,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (root, { email, password }) => {
                const dbUser = await User.findOne({ email });

                if (!dbUser) throw new Error(ErrorType.LOGIN_FAILED.name);

                const { _id: id, password: passwordHash, salt, userName } = dbUser;

                const pepper = process.env.PEPPER_STRING;
                const isTokenValid = await bcrypt.compare(salt + password + pepper, passwordHash);

                if (isTokenValid) {
                    try {
                        const signedToken = jwt.sign({ id, email, userName }, String(process.env.JWT_SECRET), { expiresIn: '2d' });
                        
                        return { token: signedToken };
                    } catch (err) {
                        throw new Error(ErrorType.SERVER_ERROR.name);
                    }
                } else {
                    throw new Error(ErrorType.LOGIN_FAILED.name);
                }
            }
        }
    }
});

export const UserMutation: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: 'UserMutation',
    fields: {
        signUp: {
            type: TToken,
            args: {
                userName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (root, { userName, email, password }) => {
                if (userName && email && password) {
                    const dbUser = await User.findOne({$or:[{ email: email }, { userName: userName }]});

                    if (dbUser) throw new Error(ErrorType.USER_EXISTS.name);

                    const salt = uidGen();
                    const pepper = process.env.PEPPER_STRING;
                    const passwordHash = await bcrypt.hash(salt + password + pepper, 10);

                    try {
                        const newUser = await new User({
                            userName,
                            email,
                            password: passwordHash,
                            salt
                        }).save();

                        
                        const signedToken = jwt.sign({
                            id: newUser._id,
                            email: newUser.email,
                            userName: newUser.userName
                        }, 
                        String(process.env.JWT_SECRET),
                        {
                            expiresIn: '2d'
                        });
                        
                        return { token: signedToken };
                    } catch (error) {
                        throw new Error(ErrorType.DB_INSERT.name);
                    }
                }
            }
        }
    }
});