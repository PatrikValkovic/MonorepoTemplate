import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { DIKeys } from '../di';

export type Token = {
    access: string;
    refresh: string;
}

export type TokenData = {
    userId: number;
}

export type AccessTokenContent = TokenData & {
    iat: number;
    exp: number;
}

export type RefreshTokenContent = {
    userId: number;
    token: string;
    iat: number;
    exp: number;
}

@injectable()
export class AuthModule {
    constructor(
        @inject(DIKeys.jwtSecret) private readonly jwtSecret: DITypes.jwtSecret,
        @inject(DIKeys.accessTokenValidity) private readonly accessTokenValidity: DITypes.accessTokenValidity,
        @inject(DIKeys.accessTokenRefresh) private readonly accessTokenRefresh: DITypes.accessTokenRefresh,
        @inject(DIKeys.refreshTokenValidity) private readonly refreshTokenValidity: DITypes.refreshTokenValidity,
        @inject(DIKeys.refreshTokenRefresh) private readonly refreshTokenRefresh: DITypes.refreshTokenRefresh,
        @inject(DIKeys.repositories) private readonly repositories: DITypes.repositories,
    ) {}

    public async validateTokens(current: Token): Promise<[Token | null, TokenData]> {
        const now = dayjs().unix();
        try {
            const encodedAt = jwt.verify(current.access, this.jwtSecret, {
                clockTimestamp: now,
                ignoreExpiration: true,
            }) as AccessTokenContent;
            const encodedRt = jwt.verify(current.refresh, this.jwtSecret, {
                clockTimestamp: now,
                ignoreExpiration: false,
            }) as RefreshTokenContent;

            const refreshRefreshAt = encodedRt.iat + (encodedRt.exp - encodedRt.iat) * this.refreshTokenRefresh;
            if (now > refreshRefreshAt) {
                const refresh = await this.generateNewRefreshToken(encodedRt.userId, encodedRt.token);
                return [{
                    access: this.generateNewAccessToken(encodedRt.userId),
                    refresh,
                }, encodedRt];
            }

            const refreshAccessAt = encodedAt.iat + (encodedAt.exp - encodedAt.iat) * this.accessTokenRefresh;
            if (now > refreshAccessAt) {
                return [{
                    access: this.generateNewAccessToken(encodedRt.userId),
                    refresh: current.refresh,
                }, encodedRt];
            }
            return [null, encodedAt];
        } catch (err) {
            console.error(err); // TODO log
            throw new Error('Token error');
        }
    }

    public async generateTokens(userId: number): Promise<Token> {
        const [access, refresh] = await Promise.all([
            this.generateNewAccessToken(userId),
            this.generateNewRefreshToken(userId),
        ]);
        return { access, refresh };
    }

    private generateNewAccessToken(userId: number) {
        const payload: Omit<AccessTokenContent, 'exp'> = {
            userId,
            iat: dayjs().unix(),
        };
        return jwt.sign(payload, this.jwtSecret, {
            expiresIn: this.accessTokenValidity,
        });
    }

    private async generateNewRefreshToken(userId: number, previousToken?: string) {
        const tokenRecord = await this.obtainNewRefreshToken(userId, previousToken);
        const payload: Omit<RefreshTokenContent, 'exp'> = {
            userId,
            token: tokenRecord.token,
            iat: dayjs().unix(),
        };
        return jwt.sign(payload, this.jwtSecret, {
            expiresIn: this.refreshTokenValidity,
        });
    }

    private async obtainNewRefreshToken(userId: number, previousToken?: string) {
        return this.repositories.token.createRefreshToken({
            userId,
            previousToken,
            expirationInS: this.refreshTokenValidity as number,
        });
    }
}
