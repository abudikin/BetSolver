import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistic } from 'entities/statistic.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistic)
    private statisticsRepository: Repository<Statistic>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getUserStatistics(userId: number): Promise<Statistic> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['statistic'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!user.statistic) {
      throw new NotFoundException(`Statistics for user with ID ${userId} not found`);
    }

    return user.statistic;
  }
  async updateStatistics(userId: number): Promise<Statistic> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['statistic'],
    });

    // Calculate statistics based on user's disputes
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!user.statistic) {
      throw new NotFoundException(`Statistics for user with ID ${userId} not found`);
    }
    const statistic = user.statistic;
    // Update statistic fields as needed
    await this.statisticsRepository.save(statistic);

    return statistic;
  }
}