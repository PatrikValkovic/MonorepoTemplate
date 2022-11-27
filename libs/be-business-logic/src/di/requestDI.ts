import { Container, ContainerModule } from 'inversify';
import { AuthModule, UserModule } from '../modules';
import { DIKeys } from './diKeys';
import { RepositoryContainer } from '@agora/be-data';

export const createRequestModule = () => new ContainerModule(bind => {
    bind<DITypes.repositories>(DIKeys.repositories).toDynamicValue(
        async context => new RepositoryContainer(
            await context.container.getAsync<DITypes.dataSource>(DIKeys.dataSource),
        ),
    );
    bind<DITypes.auth>(DIKeys.auth).to(AuthModule);
    bind<DITypes.user>(DIKeys.user).to(UserModule);
});

export const createRequestDI = (globalContainer: Container, requestModule: ContainerModule) => {
    const container = globalContainer.createChild({ defaultScope: 'Singleton' });
    container.load(requestModule);
    return container;
};
