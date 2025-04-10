import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispute } from 'entities/dispute.entity';
import { DisputeParticipant } from 'entities/disputeparticipant.entity';
import { Evidence } from 'entities/evidence.entity';
import { DisputesService } from './disputes.service';
import { DisputesController } from './disputes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dispute, DisputeParticipant, Evidence]),
    UsersModule,
  ],
  providers: [DisputesService],
  controllers: [DisputesController],
})
export class DisputesModule {}