import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'entities/notification.entity';
import { User } from 'entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  findAllForUser(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
    userId: number
  ): Promise<Notification> {
    // 1. Находим пользователя с проверкой
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    // 2. Создаем уведомление через new
    const notification = new Notification();
    notification.message = createNotificationDto.message ?? "Уведомление";
    notification.user = user;
    notification.isRead = createNotificationDto.isRead ?? false;
    
    // 3. Сохраняем и возвращаем
    return this.notificationsRepository.save(notification);
  }
  

  async markAsRead(id: number): Promise<Notification> {
    // 1. Обновляем статус уведомления
    const updateResult = await this.notificationsRepository.update(id, { isRead: true });
    
    // 2. Проверяем, было ли обновлено уведомление
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
  
    // 3. Получаем обновленное уведомление
    const updatedNotification = await this.notificationsRepository.findOne({
      where: { id },
      relations: ['user'] // Опционально, если нужно загрузить связанные данные
    });
  
    // 4. Дополнительная проверка (на случай редких коллизий)
    if (!updatedNotification) {
      throw new InternalServerErrorException('Notification was marked as read but cannot be retrieved');
    }
  
    return updatedNotification;
  }

  async remove(id: number): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}