import { Container } from 'inversify';

export type ResponseLocal = {
    di: Container;
    userId?: number | null;
}
