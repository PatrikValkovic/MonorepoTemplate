import { Container } from 'inversify';
import { Request, Response } from 'express';

export type GqlContext = {
    di: Container;
    userId: number | null;
    req: Request;
    res: Response;
}
