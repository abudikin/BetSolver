import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispute } from 'src/entities/dispute.entity';
import { DisputeParticipant } from 'src/entities/disputeparticipant.entity';
import { Evidence } from 'src/entities/evidence.entity';
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