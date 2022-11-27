import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { createClient } from './apollo';
import { CurrentUserProvider } from './context';
import { defaultTheme } from '@agora/components/themes';

export type Props = {
    children: ReactNode;
};

export function Providers(props: Props) {
    return (
        <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
                <ApolloProvider client={createClient()}>
                    <CurrentUserProvider>
                        { props.children }
                    </CurrentUserProvider>
                </ApolloProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}
