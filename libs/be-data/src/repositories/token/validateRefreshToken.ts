import { Repository } from 'typeorm';
import { Token } from '../../entities';

/** @this Repository<Token> **/
export async function validateRefreshToken(this: Repository<Token>, token: string) {
    const record = await this.findOneBy({
        token,
    });
    if (!record)
        return false;
    return record.expiresAt > new Date();
}
