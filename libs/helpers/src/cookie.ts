import { CookieOptions } from 'express';
import { forceType } from './generics';

export const cookieOptions = forceType<CookieOptions>()({
    httpOnly: true,
});
