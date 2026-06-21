import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { of, throwError } from 'rxjs';
import { ServiceUnavailableException } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let httpService: { get: jest.Mock };
  let cacheManager: { get: jest.Mock; set: jest.Mock };

  beforeEach(async () => {
    httpService = { get: jest.fn() };
    cacheManager = { get: jest.fn(), set: jest.fn() };
    const configService = {
      getOrThrow: jest.fn((key: string) =>
        key === 'API_URL' ? 'https://fake-api.test' : 'fake-key',
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: HttpService, useValue: httpService },
        { provide: CACHE_MANAGER, useValue: cacheManager },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get(ExchangeService);
  });

  it('returns the cached rate without calling the API when cache is warm', async () => {
    cacheManager.get.mockResolvedValue({ rate: 4.5, timestamp: Date.now() - 10_000 });

    const result = await service.getExchangeRate();

    expect(result.fromCache).toBe(true);
    expect(result.data.rate).toBe(4.5);
    expect(httpService.get).not.toHaveBeenCalled();
  });

  it('fetches and caches a fresh rate when the cache is empty', async () => {
    cacheManager.get.mockResolvedValue(undefined);
    httpService.get.mockReturnValue(of({ data: { exchange_rate: 4.21 } }));

    const result = await service.getExchangeRate();

    expect(result.fromCache).toBe(false);
    expect(result.data.rate).toBe(4.21);
    expect(cacheManager.set).toHaveBeenCalledWith(
      'rate',
      expect.objectContaining({ rate: 4.21 }),
      60 * 1000,
    );
  });

  it('throws a ServiceUnavailableException when the API call fails', async () => {
    cacheManager.get.mockResolvedValue(undefined);
    httpService.get.mockReturnValue(throwError(() => new Error('network error')));

    await expect(service.getExchangeRate()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });
});