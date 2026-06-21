type ExchangeRateResponse = {
    fromCache: boolean,
    data: {
        rate: number,
        secondsLeft: number
    }
}

const getExchangeRate = async (): Promise<ExchangeRateResponse> => {
    const urlBase = process.env.NEXT_PUBLIC_API_URL;
    if (!urlBase) throw new Error("API URL is not defined");
    const response = await fetch(`${urlBase}/exchange`, {
        method: "GET",
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error('Failed to get exchange rate');
    }

    const data = await response.json();

    return data;
}

export default getExchangeRate;
