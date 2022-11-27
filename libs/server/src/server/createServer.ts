import { Container } from 'inversify';
import { createHttpServer } from '../http';
import { createExpress } from '../express';
import { createApolloServer } from '../apollo';

export const createServer = async (globalDi: Container) => {
    const express = await createExpress(globalDi);
    const http = await createHttpServer(express);
    const { server: apollo, middleware } = await createApolloServer(http);

    express.use('/graphql', middleware);

    return { express, http, apollo };
};
