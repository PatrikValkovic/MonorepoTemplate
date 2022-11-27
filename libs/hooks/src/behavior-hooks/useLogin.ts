import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import { useLoginMutation } from '@agora/fe-graphql';

export const useLogin = (navigationTarget: string) => {
    const navigate = useNavigate();
    const apollo = useApolloClient();

    const [loginMutation, data] = useLoginMutation();
    const callback = useCallback(async (email: string, password: string) => {
        const { errors } = await loginMutation({
            variables: {
                data: {
                    email,
                    password,
                },
            },
        });
        if (!errors) {
            await apollo.resetStore();
            navigate(navigationTarget);
        }
    }, [navigationTarget, apollo, navigate, loginMutation]);

    return [callback, data] as const;
};
