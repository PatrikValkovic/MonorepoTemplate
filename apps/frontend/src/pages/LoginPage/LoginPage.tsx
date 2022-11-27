import { useTheme } from 'styled-components';
import { routing } from '../../routes';
import { useLogin, useLinkTarget } from '@agora/hooks';
import { CenteredLayout, LoginForm } from '@agora/components';

export const LoginPage = () => {
    const theme = useTheme();

    const [loginCallback, { error }] = useLogin(routing.homepage);

    return (
        <CenteredLayout backgroundColor={theme.primaryColor}>
            <LoginForm
                registerTarget={useLinkTarget(routing.register)}
                onLogin={loginCallback}
                formErrors={error?.message ? [error?.message] : []}
            />
        </CenteredLayout>
    );
};
