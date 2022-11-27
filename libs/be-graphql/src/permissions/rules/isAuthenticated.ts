import { rule } from 'graphql-shield';
import { GqlContext } from '../../context';

export const isAuthenticated = rule('isAuthenticated')(
    (_, __, ctx: GqlContext) => !!ctx.userId,
);
