import { gql } from '@apollo/client';

gql`
    mutation Login($data: LoginInput!){
        login(data: $data) {
            ...User
        }
    }
`;

gql`
    mutation Register($data: RegisterInput!){
        register(data: $data) {
            ...User
        }
    }
`;

gql`
    mutation Logout {
        logout
    }
`;
