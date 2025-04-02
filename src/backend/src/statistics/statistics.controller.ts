import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserStatistics(@Req() req) {
    return this.statisticsService.getUserStatistics(req.user.id);
  }
}