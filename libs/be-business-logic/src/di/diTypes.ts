import { DataSource } from 'typeorm';
import { AuthModule, UserModule } from '../modules';
import { RepositoryContainer } from '@agora/be-data';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace DITypes {
        export type databaseHost = string;
        export type databasePort = number;
        export type databaseUsername = string;
        export type databasePassword = string;
        export type databaseName = string;
        export type dataSource = DataSource;
        export type repositories = RepositoryContainer;

        export type jwtSecret = string;
        export type accessTokenValidity = number;
        export type accessTokenRefresh = number;
        export type refreshTokenValidity = number;
        export type refreshTokenRefresh = number;

        export type auth = AuthModule;
        export type user = UserModule;
    }
}
