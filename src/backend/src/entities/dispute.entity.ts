import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { DisputeParticipant } from './disputeparticipant.entity';
import { Evidence } from './evidence.entity';

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn()
  id !: number ; 

  @Column()
  title !: string  

  @Column()
  description !: string  

  @Column()
  stake !: string   // Условия спора (например, "Кто проиграет, тот платит обед")

  @Column({ default : 'pending' })
  status !: 'pending' | 'active' | 'completed'   // Статус спора

  @CreateDateColumn()
  createdAt !: Date  

  @UpdateDateColumn()
  updatedAt !: Date  

  @Column({ nullable : true })
  deadline !: Date   // Таймер для спора

  @ManyToOne(() => User, (user) => user.createdDisputes)
  creator !: User  

  @OneToMany(() => DisputeParticipant, (participant) => participant.dispute)
  participants !: DisputeParticipant[]  

  @OneToMany(() => Evidence, (evidence) => evidence.dispute)
  evidence !: Evidence[]  
}