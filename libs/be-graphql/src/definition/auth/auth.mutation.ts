import { mutationField, nonNull } from 'nexus';
import { DIKeys } from '@agora/be-business-logic';
import { cookieOptions } from '@agora/helpers';

export const login = mutationField('login', {
    type: nonNull('User'),
    args: {
        data: nonNull('LoginInput'),
    },
    resolve: async (_, { data }, ctx) => {
        const userModel = await ctx.di.getAsync<DITypes.user>(DIKeys.user);
        const user = await userModel.login(data.email, data.password);
        const authModel = await ctx.di.getAsync<DITypes.auth>(DIKeys.auth);
        const tokens = await authModel.generateTokens(user.id);
        ctx.res.cookie('at', tokens.access, cookieOptions);
        ctx.res.cookie('rt', tokens.refresh, cookieOptions);
        return user;
    },
});

export const logout = mutationField('logout', {
    type: nonNull('Boolean'),
    resolve: (_, __, ctx) => {
        ctx.res.clearCookie('at');
        ctx.res.clearCookie('rt');
        return true;
    },
});

export const register = mutationField('register', {
    type: nonNull('User'),
    args: {
        data: nonNull('RegisterInput'),
    },
    resolve: async (_, { data }, ctx) => {
        const userModel = await ctx.di.getAsync<DITypes.user>(DIKeys.user);
        const user = await userModel.register(data);
        const authModel = await ctx.di.getAsync<DITypes.auth>(DIKeys.auth);
        const tokens = await authModel.generateTokens(user.id);
        ctx.res.cookie('at', tokens.access, cookieOptions);
        ctx.res.cookie('rt', tokens.refresh, cookieOptions);
        return user;
    },
});
