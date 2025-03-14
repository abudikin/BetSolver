import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  message!: string 

  @Column({ default: false })
  isRead!: boolean 

  @ManyToOne(() => User, (user) => user.notifications)
  user!: User 
}