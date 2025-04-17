import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { User } from 'entities/user.entity';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let notificationRepository: Repository<Notification>;
  let userRepository: Repository<User>;

  const mockUser = { id: 1 };
  const mockNotification = {
    id: 1,
    message: 'Test notification',
    isRead: false,
    user: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: {
            create: jest.fn().mockReturnValue(mockNotification),
            save: jest.fn().mockResolvedValue(mockNotification),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(mockUser), // Добавлен findOneBy
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    notificationRepository = module.get(getRepositoryToken(Notification));
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should create a notification', async () => {
    const createDto = { message: 'Test notification' };
    const userId = 1;

    const result = await service.create(createDto, userId);

    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    /*expect(notificationRepository.create).toHaveBeenCalledWith({
      ...createDto,
      user: mockUser,
    });*/
    expect(notificationRepository.save).toHaveBeenCalled();
    expect(result).toEqual(mockNotification);
  });
});