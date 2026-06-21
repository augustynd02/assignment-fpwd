import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from '../exchange/exchange.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const exchangeService = {
      getExchangeRate: jest.fn().mockResolvedValue({
        fromCache: true,
        data: { rate: 4.5, secondsLeft: 30 },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: ExchangeService, useValue: exchangeService },
      ],
    }).compile();

    service = module.get(TransactionService);
  });

  it('calculates the PLN amount using the current exchange rate', async () => {
    const transaction = await service.create({ amount: 100 });

    expect(transaction.amountEUR).toBe(100);
    expect(transaction.amountPLN).toBe(450);
    expect(transaction.exchangeRate).toBe(4.5);
    expect(transaction.timestamp).toBeInstanceOf(Date);
  });
});