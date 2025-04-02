import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto, @Req() req) {
    return this.notificationsService.create(createNotificationDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllForUser(@Req() req) {
    return this.notificationsService.findAllForUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}