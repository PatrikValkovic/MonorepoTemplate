import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from '../../entities';

/** @this Repository<User> **/
export async function login(this: Repository<User>, email: string, password: string) {
    const user = await this.findOneBy({ email });
    if (!user)
        throw new Error('Invalid credentials');

    const match = await argon2.verify(user.password, password);
    if (!match)
        throw new Error('Invalid credentials');

    if (argon2.needsRehash(user.password)) {
        await this.update(user.id, {
            password: await argon2.hash(password),
        });
    }

    return user;
}
