import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/*import { Dispute } from './entities/dispute.entity';*/
/*import { DisputeParticipant } from './entities/dispute-participant.entity';
/*import { Evidence } from './entities/evidence.entity';*/
/*import { User } from '../shared/entities/user.entity';*/


import { Dispute } from 'src/entities/dispute.entity';
import { DisputeParticipant } from 'src/entities/disputeparticipant.entity';
import { Evidence } from 'src/entities/evidence.entity';
import { User } from 'src/entities/user.entity';

import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { AddEvidenceDto } from './dto/add-evidence.dto';

@Injectable()
export class DisputesService {
  constructor(
    @InjectRepository(Dispute)
    private disputesRepository: Repository<Dispute>,
    @InjectRepository(DisputeParticipant)
    private participantsRepository: Repository<DisputeParticipant>,
    @InjectRepository(Evidence)
    private evidenceRepository: Repository<Evidence>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createDisputeDto: CreateDisputeDto, creatorId: number): Promise<Dispute> {
    const creator = await this.usersRepository.findOneBy({ id: creatorId });
    
    if (!creator) {
      throw new NotFoundException(`User with ID ${creatorId} not found`);
    }

    const newDispute = this.disputesRepository.create({
      ...createDisputeDto,
      creator, // Используем найденного пользователя
    });
    
    return this.disputesRepository.save(newDispute);
  }

  async findAll(): Promise<Dispute[]> {
    return this.disputesRepository.find({ relations: ['creator', 'participants', 'evidence'] });
  }

  async findOne(id: number): Promise<Dispute> {
    return this.disputesRepository.findOne({
      where: { id },
      relations: ['creator', 'participants', 'evidence'],
    });
  }

  async update(id: number, updateDisputeDto: UpdateDisputeDto): Promise<Dispute> {
    await this.disputesRepository.update(id, updateDisputeDto);
    return this.disputesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.disputesRepository.delete(id);
  }

  async addParticipant(disputeId: number, userId: number, role: 'participant' | 'arbitrator'): Promise<DisputeParticipant> {
    const dispute = await this.disputesRepository.findOne({ where: { id: disputeId } });
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    
    const participant = this.participantsRepository.create({
      dispute,
      user,
      role,
    });
    
    return this.participantsRepository.save(participant);
  }

  async addEvidence(disputeId: number, addEvidenceDto: AddEvidenceDto): Promise<Evidence> {
    const dispute = await this.disputesRepository.findOne({ where: { id: disputeId } });
    const evidence = this.evidenceRepository.create({
      ...addEvidenceDto,
      dispute,
    });
    return this.evidenceRepository.save(evidence);
  }

  async completeDispute(disputeId: number, winnerId: number): Promise<Dispute> {
    const dispute = await this.disputesRepository.findOne({
      where: { id: disputeId },
      relations: ['participants'],
    });

    // Update dispute status
    dispute.status = 'completed';
    await this.disputesRepository.save(dispute);

    // Update user statistics
    for (const participant of dispute.participants) {
      const user = await this.usersRepository.findOne({ where: { id: participant.user.id } });
      if (user.id === winnerId) {
        user.wins += 1;
      } else {
        user.losses += 1;
      }
      await this.usersRepository.save(user);
    }

    return dispute;
  }
}