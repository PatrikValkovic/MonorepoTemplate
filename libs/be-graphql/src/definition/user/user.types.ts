import { objectType } from 'nexus';

export const User = objectType({
    name: 'User',
    sourceType: {
        module: '@agora/be-data',
        export: 'User',
    },
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('email');
        t.nonNull.string('username');
    },
});
