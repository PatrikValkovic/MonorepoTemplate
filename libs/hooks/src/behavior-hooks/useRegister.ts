import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import { useRegisterMutation } from '@agora/fe-graphql';

export const useRegister = (navigationTarget: string) => {
    const navigate = useNavigate();
    const apollo = useApolloClient();

    const [registerMutation, data] = useRegisterMutation();
    const callback = useCallback(async (username: string, email: string, password: string) => {
        const { errors } = await registerMutation({
            variables: {
                data: {
                    username,
                    email,
                    password,
                },
            },
        });
        if (!errors) {
            await apollo.resetStore();
            navigate(navigationTarget);
        }
    }, [navigationTarget, apollo, navigate, registerMutation]);

    return [callback, data] as const;
};
