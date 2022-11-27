import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import { Token, TokenType } from '../../entities';

type CreateRefreshTokenArgs = {
    previousToken?: string;
    expirationInS: number;
    userId: number;
}

/** @this Repository<Token> **/
export async function createRefreshToken(this: Repository<Token>, args: CreateRefreshTokenArgs) {
    if (args.previousToken) {
        return this.manager.transaction(async newManager => {
            const repo = newManager.getRepository(Token);
            const entity = await repo.findOneBy({
                token: args.previousToken,
                userId: args.userId,
            });
            if (!entity)
                throw new Error('Invalid refresh token');
            entity.expiresAt = dayjs().add(args.expirationInS).toDate();
            return repo.save(entity);
        });
    }
    const newToken = this.create({
        userId: args.userId,
        expiresAt: dayjs().add(args.expirationInS, 's').toDate(),
        type: TokenType.RefreshToken,
    });
    return this.save(newToken);
}
