import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { NotificationsService } from './notifications.service';
import { User } from '@app/entities/user.entity';
import { Notification } from '@app/entities/notification.entity';
/*
import { Notification } from '@app/entities/notification.entity';
import { User } from '@app/entities/user.entity';
import { NotificationsService } from './notifications.service';

*/

describe('NotificationService', () => {
  let service: NotificationsService;
  let notificationRepository: Repository<Notification>;

  const mockNotification: Partial<Notification> = {
    id: 1,
    message: 'Test notification',
    isRead: false,
    user: { id: 1 } as User,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: {
            create: jest.fn().mockImplementation(dto => ({ 
              ...dto, 
              id: mockNotification.id,
              isRead: false 
            })),
            save: jest.fn().mockImplementation(notification => 
              Promise.resolve({ ...notification, id: mockNotification.id })
            ),
            findOne: jest.fn().mockImplementation(options => 
              Promise.resolve(
                options.where.id === mockNotification.id 
                  ? mockNotification 
                  : null
              )
            ),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    notificationRepository = module.get<Repository<Notification>>(
      getRepositoryToken(Notification)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a notification', async () => {
      const createDto = { message: 'Test notification' };
      const userId = 1;

      const result = await service.create(createDto, userId);

      expect(notificationRepository.create).toHaveBeenCalledWith({
        ...createDto,
        user: { id: userId },
      });
      expect(notificationRepository.save).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: expect.any(Number),
        message: 'Test notification',
        isRead: false,
      });
    });
  });
/*
  describe('findAllForUser', () => {
    const userId = 1;
    const mockNotifications = [
      { id: 1, message: 'Test 1', isRead: false, user: { id: userId } },
      { id: 2, message: 'Test 2', isRead: true, user: { id: userId } }
    ] as Notification[];
  
    beforeEach(() => {
      jest.spyOn(notificationRepository, 'find').mockResolvedValue(mockNotifications);
    });
  
    it('should return notifications for user with isRead filter', async () => {
      // Тестируем с фильтром isRead: true
      const result = await service.findAllForUser(userId);
      
      expect(notificationRepository.find).toHaveBeenCalledWith({
        where: { 
          user: { id: userId },
          isRead: true 
        }
      });
      expect(result).toEqual(mockNotifications.filter(n => n.isRead));
    });
  
    it('should return notifications for user with isRead false filter', async () => {
      // Тестируем с фильтром isRead: false
      const result = await service.findAllForUser(userId);
      
      expect(notificationRepository.find).toHaveBeenCalledWith({
        where: { 
          user: { id: userId },
          isRead: false 
        }
      });
      expect(result).toEqual(mockNotifications.filter(n => !n.isRead));
    });

  });*/
});