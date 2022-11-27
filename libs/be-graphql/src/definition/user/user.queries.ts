import { nullable, queryField } from 'nexus';
import { DIKeys } from '@agora/be-business-logic';

export const currentUser = queryField('currentUser', {
    type: nullable('User'),
    resolve: async (_, __, ctx) => {
        if (!ctx.userId)
            return null;
        const userModule = await ctx.di.getAsync<DITypes.user>(DIKeys.user);
        return userModule.getById(ctx.userId);
    },
});
