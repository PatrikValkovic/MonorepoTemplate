import { ShieldFieldType } from './types';
import { allow, isAuthenticated } from './rules';

export const Mutation: ShieldFieldType<'Mutation'> = {
    login: allow,
    register: allow,
    logout: isAuthenticated,
};
