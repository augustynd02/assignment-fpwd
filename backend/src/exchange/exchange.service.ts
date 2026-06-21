import { Injectable, Inject, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

type RateType = {
  rate: number;
  timestamp: number;
};

type ExchangeRateResponse = {
  data: {
    rate: number;
    secondsLeft: number;
  };
};

const CACHE_KEY = 'exchange_rate';
const CACHE_TTL = 60 * 1000;

@Injectable()
export class ExchangeService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async getExchangeRate(): Promise<ExchangeRateResponse> {
    const cachedData = await this.cacheManager.get<RateType>(CACHE_KEY);
    if (cachedData) {
      const dataAge = Date.now() - cachedData.timestamp;
      const secondsLeft = Math.max(0, 60 - Math.floor(dataAge / 1000));

      return {
        data: {
          rate: cachedData.rate,
          secondsLeft,
        },
      };
    }

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

    const timestamp = Date.now();
    await this.cacheManager.set(CACHE_KEY, { rate, timestamp }, CACHE_TTL);

    return {
      data: {
        rate,
        secondsLeft: 60,
      },
    };
  }
}