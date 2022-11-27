import * as express from 'express';
import { Container } from 'inversify';
import cookieParse from 'cookie-parser';
import cors from 'cors';
import { authMiddleware } from './middlewares';
import { diMiddleware } from './middlewares/diMiddleware';
import { createRequestDI, createRequestModule } from '@agora/be-business-logic';

export const createExpress = (globalDi: Container) => {
    const app = express.default();

    app.use(express.json());
    app.use(cookieParse());
    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
    }));

    const perRequestModule = createRequestModule();
    app.use(diMiddleware(
        globalDi,
        global => createRequestDI(global, perRequestModule),
    ));
    app.use(authMiddleware);


    return Promise.resolve(app);
};
