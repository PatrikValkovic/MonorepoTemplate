import { NextFunction, Request, Response } from 'express';
import { DIKeys } from '@agora/be-business-logic';
import { cookieOptions } from '@agora/helpers';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const access = req.cookies.at;
    const refresh = req.cookies.rt;
    if (!access || !refresh)
        return next();

    const authModule: DITypes.auth = await res.locals.di.getAsync(DIKeys.auth);
    try {
        const [newTokens, tokenData] = await authModule.validateTokens({ refresh, access });
        if (newTokens) {
            res.cookie('at', newTokens.access, cookieOptions);
            res.cookie('rt', newTokens.refresh, cookieOptions);
        }
        // eslint-disable-next-line require-atomic-updates
        res.locals.userId = tokenData.userId;
        return next();
    } catch (err) {
        console.log(err);
        return next(new Error(`Token error: ${err}`));
    }
};
