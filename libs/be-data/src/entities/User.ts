import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Token } from './Token';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @Column({ type: 'varchar', length: 128, unique: true })
    public username!: string;

    @Column({ type: 'varchar', length: 128, unique: true })
    public slug!: string;

    @Column({ type: 'varchar', length: 256, unique: true })
    public email!: string;

    @Column({ type: 'varchar', length: 120 })
    public password!: string;

    @OneToMany(() => Token, token => token.user)
    public tokens!: Promise<Token[]>;
}
