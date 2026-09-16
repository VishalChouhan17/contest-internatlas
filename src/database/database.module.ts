import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const DRIZZLE = 'DRIZZLE_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const sql = neon(configService.getOrThrow<string>('DATABASE_URL'));
        return drizzle(sql);
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}