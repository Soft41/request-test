import { Global, Logger, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: RedisService,
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('RedisService');
        const redisUrl: string =
          configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
        const client = new Redis(redisUrl);

        client.on('connect', () => logger.log('Redis connected'));
        client.on('error', (err) => logger.error('Redis error', err));

        return new RedisService(client);
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
