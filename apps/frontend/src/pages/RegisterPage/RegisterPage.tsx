import { useHref, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { routing } from '../../routes';
import { CenteredLayout, RegistrationForm } from '@agora/components';
import { useRegister } from '@agora/hooks';

export const RegisterPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [registerCallback, { error }] = useRegister(routing.homepage);

    return (
        <CenteredLayout backgroundColor={theme.primaryColor}>
            <RegistrationForm
                backTarget={{
                    link: useHref(routing.login),
                    onClick(e: React.MouseEvent<HTMLAnchorElement>) {
                        e.preventDefault();
                        navigate(-1);
                    },
                }}
                onRegister={registerCallback}
                formErrors={error?.message ? [error.message] : []}
            />
        </CenteredLayout>
    );
};
