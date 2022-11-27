import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const createClient = () => {
    const uri = process.env['NX_GRAPHQL_ENDPOINT'] as string;
    const link = createHttpLink({
        uri,
        credentials: 'include',
    });
    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
        defaultOptions: {
            mutate: {
                errorPolicy: 'all',
            },
        },
    });
};
