import { DataSource } from 'typeorm';
import { Token, User } from '../entities';
import { default as userExt } from './user';
import { default as tokenExt } from './token';

export class RepositoryContainer {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    get user() {
        return this.dataSource.getRepository(User).extend(userExt);
    }

    get token() {
        return this.dataSource.getRepository(Token).extend(tokenExt);
    }
}
