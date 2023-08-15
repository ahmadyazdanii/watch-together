import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { EventsGateway } from './events/events.gateway';
import { EventsService } from './events/events.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [HallsController],
  providers: [HallsService, EventsGateway, EventsService],
})
export class HallsModule {}
