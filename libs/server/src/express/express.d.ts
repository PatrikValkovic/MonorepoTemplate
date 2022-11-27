import 'express';
import { ResponseLocal } from './types';

declare module 'express' {
    export interface Response {
        locals: ResponseLocal;
    }
}
