import { gql, DocumentNode } from "@apollo/client";

export const login: DocumentNode = gql`
query($email: String, $password: String) {
	users {
        login(email: $email, password: $password) {
            token
        }
    }
}`;
