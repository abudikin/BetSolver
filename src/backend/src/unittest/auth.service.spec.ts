import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'auth/auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { RegisterDto } from 'auth/dto/register.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
    username: 'Test User',
    reputation: 0,
    wins: 0,
    losses: 0,
    createdDisputes: [],
    disputes: [],
    notifications: [],
    statistic: undefined
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    // Mock bcrypt
    (bcrypt.compare as jest.Mock) = jest.fn();
    (bcrypt.hash as jest.Mock) = jest.fn().mockResolvedValue('hashedpassword');
  });

  describe('validateUser', () => {
    it('should return user without password when validation succeeds', async () => {
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser('test@example.com', 'password');

      expect(usersService.findOneByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
      
      // Убедимся, что password исключен из результата
      const { password, ...expectedResult } = mockUser;
      expect(result).toEqual(expectedResult);
    });

    // ... остальные тесты validateUser без изменений
  });

  describe('register', () => {
    it('should hash password and create user', async () => {
      const registerDto: RegisterDto = {
        email: 'new@example.com',
        password: 'password',
        username: 'New User'
      };

      const createdUser = {
        ...registerDto,
        id: 2,
        password: 'hashedpassword',
        reputation: 0,
        wins: 0,
        losses: 0,
        createdDisputes: [],
        disputes: [],
        notifications: [],
        statistic: undefined
      };

      (usersService.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await authService.register(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(usersService.create).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'hashedpassword',
        username: 'New User' // Исправлено с name на username
      });
      expect(result).toEqual(createdUser);
    });
  });

  // ... остальные тесты без изменений
});