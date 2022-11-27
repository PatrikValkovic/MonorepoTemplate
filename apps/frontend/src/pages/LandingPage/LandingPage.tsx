import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context';
import { routing } from '../../routes';
import { useLogout } from '@agora/hooks';

export const LandingPage = () => {
    const userContext = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [logout] = useLogout(routing.homepage);
    const isLogIn = !!userContext.currentUser?.username;

    return (
        <Fragment>
            <p>Current user is {userContext.currentUser?.username ?? 'not log in'}</p>
            <a href="#" onClick={e => {
                e.preventDefault();
                isLogIn ? logout() : navigate(routing.login);
            }}>{isLogIn ? 'Logout' : 'Login'}</a>
        </Fragment>
    );
};
