import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Token, User } from './entities';
import { migrations } from './migration';

type DataSourceConfig = {
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
}

export const createDataSource = (config: DataSourceConfig) => new DataSource({
    ...config,
    type: 'postgres',
    synchronize: false,
    logging: false,
    migrations,
    subscribers: [],
    entities: [
        User,
        Token,
    ],
    migrationsTableName: '_migrations',
    migrationsTransactionMode: 'all',
});
