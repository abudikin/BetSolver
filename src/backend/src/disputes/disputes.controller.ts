import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { AddEvidenceDto } from './dto/add-evidence.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('disputes')
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDisputeDto: CreateDisputeDto, @Req() req) {
    return this.disputesService.create(createDisputeDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.disputesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disputesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDisputeDto: UpdateDisputeDto) {
    return this.disputesService.update(+id, updateDisputeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disputesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/participants/:userId')
  addParticipant(
    @Param('id') disputeId: string,
    @Param('userId') userId: string,
    @Body('role') role: 'participant' | 'arbitrator',
  ) {
    return this.disputesService.addParticipant(+disputeId, +userId, role);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/evidence')
  addEvidence(@Param('id') id: string, @Body() addEvidenceDto: AddEvidenceDto) {
    return this.disputesService.addEvidence(+id, addEvidenceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/complete')
  completeDispute(@Param('id') id: string, @Body('winnerId') winnerId: number) {
    return this.disputesService.completeDispute(+id, winnerId);
  }
}