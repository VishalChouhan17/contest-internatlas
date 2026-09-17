import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ContestsModule } from './contests/contests.module.js';

@Module({
  imports: [ContestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}