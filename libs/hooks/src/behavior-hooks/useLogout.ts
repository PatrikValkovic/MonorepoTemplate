import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import { useLogoutMutation } from '@agora/fe-graphql';

export const useLogout = (navigationTarget: string) => {
    const navigate = useNavigate();
    const apollo = useApolloClient();

    const [logoutMutation, data] = useLogoutMutation();
    const callback = useCallback(async () => {
        const { errors } = await logoutMutation({
            variables: {},
        });
        if (!errors) {
            await apollo.resetStore();
            navigate(navigationTarget);
        }
    }, [navigationTarget, apollo, navigate, logoutMutation]);

    return [callback, data] as const;
};
