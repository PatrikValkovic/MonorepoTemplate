import * as http from 'http';
import { Application } from 'express';

export const createHttpServer = (express: Application) => Promise.resolve(http.createServer(express));
