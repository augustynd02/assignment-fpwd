import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [HttpModule, CacheModule.register({})],
  controllers: [ExchangeController],
  providers: [ExchangeService],
  exports: [ExchangeService],
})
export class ExchangeModule {}