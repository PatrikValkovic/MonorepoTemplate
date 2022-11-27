import { gql } from '@apollo/client';

gql`
    query CurrentUser {
        currentUser {
            ...User
        }
    }
`;
