import { gql, DocumentNode } from "@apollo/client";

export const signUpMutation: DocumentNode = gql`
mutation($email: String!, $password: String!, $userName: String!) {
	users {
        signUp(email: $email, password: $password, userName: $userName) {
            token
        }
    }
}`;
