import { createContext, ReactNode } from 'react';
import { GqlUser, useCurrentUserQuery } from '@agora/fe-graphql';

export type CurrentUserContextType = {
    currentUser: null | GqlUser;
}

const defaultContext: CurrentUserContextType = {
    currentUser: null,
};

export const CurrentUserContext = createContext(defaultContext);


export type CurrentUserProviderProps = {
    children: ReactNode;
};

export const CurrentUserProvider = (props: CurrentUserProviderProps) => {
    const { data } = useCurrentUserQuery();

    const context: CurrentUserContextType = {
        ...defaultContext,
        ...(data?.currentUser ? { currentUser: data.currentUser } : {}),
    };

    return (
        <CurrentUserContext.Provider value={context}>
            {props.children}
        </CurrentUserContext.Provider>
    );
};

export const ApolloContextConsumer = CurrentUserContext.Consumer;
