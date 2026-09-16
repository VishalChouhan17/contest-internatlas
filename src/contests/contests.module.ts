import { Module } from '@nestjs/common';
import { ContestsController } from './contests.controller.js';
import { ContestsService } from './contests.service.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ContestsController],
  providers: [ContestsService],
  exports: [ContestsService],
})
export class ContestsModule {}