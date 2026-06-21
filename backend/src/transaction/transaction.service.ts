import { Injectable, Logger } from '@nestjs/common';
import { ExchangeService } from '../exchange/exchange.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private readonly exchangeService: ExchangeService) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const { data } = await this.exchangeService.getExchangeRate();

    const transaction: Transaction = {
      amountEUR: dto.amount,
      amountPLN: dto.amount * data.rate,
      exchangeRate: data.rate,
      timestamp: new Date(),
    };

    this.logger.log(
      `Transaction created: ${dto.amount} EUR to ${transaction.amountPLN.toFixed(2)} PLN`,
    );

    return transaction;
  }
}