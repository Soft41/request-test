import { Global, Module } from '@nestjs/common';
import { RabbitMQModule as NestRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    NestRabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        exchanges: [{ name: 'requests.exchange', type: 'topic' }],
        uri: configService.get('RABBITMQ_URL'),
        connectionInitOptions: { wait: false },
      }),
    }),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
