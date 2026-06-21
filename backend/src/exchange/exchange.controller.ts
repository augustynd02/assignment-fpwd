import { Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  async fetchExchangeRate() {
    return this.exchangeService.getExchangeRate();
  }
}