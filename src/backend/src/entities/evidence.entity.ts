import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Dispute } from './dispute.entity';

@Entity()
export class Evidence {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  type!: 'photo' | 'video' | 'link' // Тип доказательства

  @Column()
  url!: string 

  @ManyToOne(() => Dispute, (dispute) => dispute.evidence)
  dispute!: Dispute 
}