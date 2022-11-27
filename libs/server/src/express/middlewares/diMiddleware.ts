import { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';

export const diMiddleware = (
    globalContainer: Container,
    createRequestContainer: (container: Container) => Container,
) => (_: Request, res: Response, next: NextFunction) => {
    res.locals.di = createRequestContainer(globalContainer);
    return next();
};
