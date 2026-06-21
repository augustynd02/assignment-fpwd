'use client'

import { useMutation } from '@tanstack/react-query';

type TransactionResponse = {
    amountEUR: number;
    amountPLN: number;
    exchangeRate: number;
    timestamp: Date;
};

const submitTransaction = async (amount: number): Promise<TransactionResponse> => {
    const urlBase = process.env.NEXT_PUBLIC_API_URL;
    if (!urlBase) throw new Error('API URL is not defined');

    const response = await fetch(`${urlBase}/transaction`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
        throw new Error('Failed to submit transaction');
    }

    return response.json();
};

export function useSubmitTransaction() {
    return useMutation({
        mutationFn: submitTransaction,
    });
}