import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum TokenType {
    RefreshToken = 'RefreshToken'
}

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    public token!: string;

    @Column({ type: 'enum', enum: TokenType })
    public type!: TokenType;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @Column()
    public expiresAt!: Date;

    @ManyToOne(() => User, user => user.tokens, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    public user!: Promise<User>;

    @Column()
    @RelationId((token: Token) => token.user)
    public userId?: number;
}
