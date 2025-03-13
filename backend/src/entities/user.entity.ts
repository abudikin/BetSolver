import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dispute } from './dispute.entity';
import { DisputeParticipant } from './disputeparticipant.entity';
import { Notification } from './notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number  

  @Column({ unique: true })
  email!: string  

  @Column()
  password!: string  

  @Column()
  username!: string  

  @Column({ default: 0 })
  reputation!: number  

  @Column({ default: 0 })
  wins!: number  

  @Column({ default: 0 })
  losses!: number  

  @OneToMany(() => Dispute, (dispute) => dispute.creator)
  createdDisputes!: Dispute[]  

  @OneToMany(() => DisputeParticipant, (participant) => participant.user)
  disputes!: DisputeParticipant[]  

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[]  
    statistic: any;
}