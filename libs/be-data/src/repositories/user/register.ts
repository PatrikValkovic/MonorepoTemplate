import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import slug from 'slug';
import { User } from '../../entities';

export type RegisterUserArgs = {
    username: string;
    email: string;
    password: string;
}

/** @this Repository<User> **/
export async function register(this: Repository<User>, args: RegisterUserArgs) {
    const passwordHash = await argon2.hash(args.password);
    const user = this.create({
        ...args,
        password: passwordHash,
        slug: slug(args.username),
    });
    return this.save(user);
}
