import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
export enum Role {
  user = 'user',
  admin = 'admin',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

  @Index()
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;
}
