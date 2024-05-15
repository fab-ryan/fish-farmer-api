/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  //   OneToOne,
  //   JoinColumn,
  //   OneToMany,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  OPERATOR = 'operator',
  INDUSTRY = 'industry',
}

@Entity('users')
@Unique(['email', 'phone'])
export class User {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'varchar', length: 100 })
  phone!: string;

  @Column({ type: 'varchar', length: 100 })
  username!: string;

  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @Column({ type: 'varchar', length: 100 })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;
}
