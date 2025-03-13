import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Dispute } from './dispute.entity';

@Entity()
export class DisputeParticipant {
  @PrimaryGeneratedColumn()
  id!: NumberConstructor

  @Column()
  role!: 'participant' | 'arbitrator'// Роль пользователя в споре

  @ManyToOne(() => User, (user) => user.disputes)
  user!: User 

  @ManyToOne(() => Dispute, (dispute) => dispute.participants)
  dispute!: Dispute
}