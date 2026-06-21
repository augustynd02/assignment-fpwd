import { Module } from '@nestjs/common';
import { ExchangeModule } from '../exchange/exchange.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [ExchangeModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}