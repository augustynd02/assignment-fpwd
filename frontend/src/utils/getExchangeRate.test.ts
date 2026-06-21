import getExchangeRate from './getExchangeRate';

describe('getExchangeRate', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.test';
    global.fetch = jest.fn();
  });

  it('returns the parsed exchange rate on a successful response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ fromCache: true, data: { rate: 4.5, secondsLeft: 30 } }),
    });

    const result = await getExchangeRate();

    expect(result.data.rate).toBe(4.5);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test/exchange',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('throws when the backend responds with a non-OK status', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(getExchangeRate()).rejects.toThrow('Failed to get exchange rate');
  });

  it('throws when NEXT_PUBLIC_API_URL is not defined', async () => {
    delete process.env.NEXT_PUBLIC_API_URL;

    await expect(getExchangeRate()).rejects.toThrow('API URL is not defined');
  });
});