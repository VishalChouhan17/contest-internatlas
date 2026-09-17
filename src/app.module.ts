import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ContestsModule } from './contests/contests.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
