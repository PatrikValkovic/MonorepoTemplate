import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { LandingPage, LoginPage } from './pages';
import { RegisterPage } from './pages/RegisterPage';

export const routing = {
    login: '/login',
    register: '/register',
    homepage: '/',
};

export function Routes() {
    return (
        <ReactRoutes>
            <Route
                path={routing.homepage}
                element={<LandingPage />}
            />
            <Route
                path={routing.login}
                element={<LoginPage />}
            />
            <Route
                path={routing.register}
                element={<RegisterPage />}
            />
        </ReactRoutes>
    );
}
