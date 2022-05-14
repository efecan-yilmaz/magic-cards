import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { UserQuery, UserMutation } from "./Queries/User";


const rootQuery: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: UserQuery,
            resolve: () => ({})
        }
    }
});

const rootMutation: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        users: {
            type: UserMutation,
            resolve: () => ({})
        }
    }
}); 

const RootSchema: GraphQLSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});

export default RootSchema; 