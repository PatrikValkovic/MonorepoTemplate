import * as process from 'process';
import { createDataSource } from '../dataSource';

export const dataSource = createDataSource({
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT || '', 10),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
});
