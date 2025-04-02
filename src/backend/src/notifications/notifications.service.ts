import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'src/entities/notification.entity';
import { User } from 'src/entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, userId: number): Promise<Notification> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const notification = this.notificationsRepository.create({
      ...createNotificationDto,
      user,
    });
    return this.notificationsRepository.save(notification);
  }

  async findAllForUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    await this.notificationsRepository.update(id, { isRead: true });
    return this.notificationsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}