import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['createdDisputes', 'disputes', 'notifications'] // Опционально, если нужны связанные сущности
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }
  
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { email },
      relations: ['createdDisputes', 'disputes', 'notifications'] // Опционально
    });
    
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    
    return user;
  }
  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateResult = await this.usersRepository.update(id, updateUserDto);
    
    if (updateResult.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    const updatedUser = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['createdDisputes', 'disputes', 'notifications'] // Опционально
    });
    
    if (!updatedUser) {
      throw new InternalServerErrorException('User was updated but cannot be retrieved');
    }
    
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}