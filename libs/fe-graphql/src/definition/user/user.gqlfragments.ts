import { gql } from '@apollo/client';

gql`
    fragment User on User {
        id
        email
        username
    }
`;
