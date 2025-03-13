import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id!: number 

  @Column({ default: 0 })
  totalDisputes!: number

  @Column({ default: 0 })
  wins!: number 

  @Column({ default: 0 })
  losses!: number 

  @OneToOne(() => User, (user) => user.statistic)
  user!: User 
}