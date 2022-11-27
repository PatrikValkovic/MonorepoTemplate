import * as http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RequestHandler } from 'express';
import { GqlContext, schema } from '@agora/be-graphql';

type ReturnType = {
    server: ApolloServer<GqlContext>;
    middleware: RequestHandler;
}

export const createApolloServer = async (httpServer: http.Server): Promise<ReturnType> => {
    const server = new ApolloServer<GqlContext>({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault(),
        ],
    });
    await server.start();

    const middleware = expressMiddleware<GqlContext>(server, {
        context: async ({ req, res }) => {
            const { di } = res.locals;
            const userId = res.locals.userId || null;
            const context: GqlContext = {
                res,
                req,
                userId,
                di,
            };
            return Promise.resolve(context);
        },
    });

    return { server, middleware };
};
