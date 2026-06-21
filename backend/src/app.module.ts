import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExchangeModule } from './exchange/exchange.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ExchangeModule,
    TransactionModule,
  ],
})
export class AppModule {}