import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type ExchangeRateResponse = {
  data: {
    rate: number;
    secondsLeft: number;
  };
};

@Injectable()
export class ExchangeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getExchangeRate(): Promise<ExchangeRateResponse> {
    const apiUrl = this.configService.getOrThrow<string>('API_URL');
    const apiKey = this.configService.getOrThrow<string>('API_KEY');

    let rate: number;
    try {
      const response = await firstValueFrom(
        this.httpService.get(apiUrl, {
          headers: { 'x-api-key': apiKey },
        }),
      );
      rate = response.data.exchange_rate;
    } catch (error) {
      throw new ServiceUnavailableException(
        'Could not retrieve exchange rate. Please try again later.',
      );
    }

    return {
      data: {
        rate,
        secondsLeft: 60,
      },
    };
  }
}