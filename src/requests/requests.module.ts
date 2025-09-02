import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestsRepository } from './requests.repository';
import { RequestEntity } from './entities/request.entity';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RequestsConsumer } from './requests.consumer';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity]), RabbitMQModule],
  controllers: [RequestsController],
  providers: [RequestsService, RequestsRepository, RequestsConsumer],
})
export class RequestsModule {}
