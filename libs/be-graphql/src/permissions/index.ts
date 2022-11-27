import { shield } from 'graphql-shield';
import { Query } from './Query';
import { Mutation } from './Mutation';

export const permissions = shield({
    Query,
    Mutation,
}, {
    debug: true,
    allowExternalErrors: true,
});
