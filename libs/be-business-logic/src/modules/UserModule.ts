import { inject, injectable } from 'inversify';
import { DIKeys } from '../di';
import { RepositoryContainer } from '@agora/be-data';

type RegisterUserArgs = Parameters<RepositoryContainer['user']['register']>[0];

@injectable()
export class UserModule {
    constructor(
        @inject(DIKeys.repositories) private readonly repositories: DITypes.repositories,
    ) {}

    public login(email: string, password: string) {
        return this.repositories.user.login(email, password);
    }

    public register(args: RegisterUserArgs) {
        return this.repositories.user.register(args);
    }

    public getById(userId: number) {
        return this.repositories.user.findOneBy({ id: userId });
    }
}
