import { Container, ContainerModule } from 'inversify';
import { z } from 'zod';
import { DIKeys } from './diKeys';
import { numberInStringRefinement } from '@agora/helpers';
import { createDataSource } from '@agora/be-data';

export const createGlobalModule = () => new ContainerModule(bind => {
    bind<DITypes.databaseHost>(DIKeys.databaseHost).toDynamicValue(
        () => z.string({ required_error: 'DB_HOST env variable is missing' })
            .parse(process.env.DB_HOST),
    );
    bind<DITypes.databasePort>(DIKeys.databasePort).toDynamicValue(
        () => z.string({ required_error: 'DB_PORT env variable is missing' })
            .refine(numberInStringRefinement, { message: 'DB_PORT env variable is not number' })
            .transform(value => Number(value))
            .parse(process.env.DB_PORT),
    );
    bind<DITypes.databaseUsername>(DIKeys.databaseUsername).toDynamicValue(
        () => z.string({ required_error: 'DB_USERNAME env variable is missing' })
            .parse(process.env.DB_USERNAME),
    );
    bind<DITypes.databasePassword>(DIKeys.databasePassword).toDynamicValue(
        () => z.string({ required_error: 'DB_PASSWORD env variable is missing' })
            .parse(process.env.DB_PASSWORD),
    );
    bind<DITypes.databaseName>(DIKeys.databaseName).toDynamicValue(
        () => z.string({ required_error: 'DB_DATABASE env variable is missing' })
            .parse(process.env.DB_DATABASE),
    );
    bind<DITypes.dataSource>(DIKeys.dataSource).toDynamicValue(async context => {
        const dataSource = createDataSource({
            host: context.container.get<DITypes.databaseHost>(DIKeys.databaseHost),
            port: context.container.get<DITypes.databasePort>(DIKeys.databasePort),
            username: context.container.get<DITypes.databaseUsername>(DIKeys.databaseUsername),
            password: context.container.get<DITypes.databasePassword>(DIKeys.databasePassword),
            database: context.container.get<DITypes.databaseName>(DIKeys.databaseName),
        });
        await dataSource.initialize();
        return dataSource;
    },
    );

    bind<DITypes.jwtSecret>(DIKeys.jwtSecret).toDynamicValue(
        () => z.string({ required_error: 'JWT_SECRET env variable is missing' })
            .min(8, { message: 'JWT_SECRET env variable is too short' })
            .parse(process.env.JWT_SECRET),
    );
    bind<DITypes.accessTokenValidity>(DIKeys.accessTokenValidity).toDynamicValue(
        () => z.string({ required_error: 'ACCESS_TOKEN_VALIDITY env variable is missing' })
            .refine(numberInStringRefinement, { message: 'ACCESS_TOKEN_VALIDITY env variable must be number' })
            .transform(value => Number(value))
            .refine(val => val > 0, { message: 'ACCESS_TOKEN_VALIDITY must be greater than 0' })
            .parse(process.env.ACCESS_TOKEN_VALIDITY),
    );
    bind<DITypes.accessTokenRefresh>(DIKeys.accessTokenRefresh).toDynamicValue(
        () => z.string({ required_error: 'ACCESS_TOKEN_REFRESH env variable is missing' })
            .refine(numberInStringRefinement, { message: 'ACCESS_TOKEN_REFRESH env variable must be number' })
            .transform(value => Number(value))
            .refine(val => val > 0, { message: 'ACCESS_TOKEN_REFRESH must be greater than 0' })
            .refine(val => val < 1, { message: 'ACCESS_TOKEN_REFRESH must be lower than 1' })
            .parse(process.env.ACCESS_TOKEN_REFRESH),
    );
    bind<DITypes.refreshTokenValidity>(DIKeys.refreshTokenValidity).toDynamicValue(
        () => z.string({ required_error: 'REFRESH_TOKEN_VALIDITY env variable is missing' })
            .refine(numberInStringRefinement, { message: 'REFRESH_TOKEN_VALIDITY env variable must be number' })
            .transform(value => Number(value))
            .refine(val => val > 0, { message: 'REFRESH_TOKEN_VALIDITY must be greater than 0' })
            .parse(process.env.REFRESH_TOKEN_VALIDITY),
    );
    bind<DITypes.refreshTokenRefresh>(DIKeys.refreshTokenRefresh).toDynamicValue(
        () => z.string({ required_error: 'REFRESH_TOKEN_REFRESH env variable is missing' })
            .refine(numberInStringRefinement, { message: 'REFRESH_TOKEN_REFRESH env variable must be number' })
            .transform(value => Number(value))
            .refine(val => val > 0, { message: 'REFRESH_TOKEN_REFRESH must be greater than 0' })
            .refine(val => val < 1, { message: 'REFRESH_TOKEN_REFRESH must be lower than 1' })
            .parse(process.env.REFRESH_TOKEN_REFRESH),
    );

});

export const createGlobalDI = (module: ContainerModule) => {
    const container = new Container({ defaultScope: 'Singleton' });
    container.load(module);
    return container;
};
