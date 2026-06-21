'use client'

import React, { useState } from 'react';
import { useSubmitTransaction } from '@/hooks/useSubmitTransaction';

import styles from './ExchangeForm.module.css';

export default function ExchangeForm() {
    const [amount, setAmount] = useState('');
    const mutation = useSubmitTransaction();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amountEUR = parseFloat(amount);
        if (!isNaN(amountEUR)) {
            mutation.mutate(amountEUR);
        }
    };

    const result = mutation.data?.amountPLN ?? null;

    return (
        <form onSubmit={handleSubmit} className={styles.exchangeForm}>
            <div className={styles.formGroup}>
                <label htmlFor="amount" className={styles.label}>Amount in EUR</label>
                <div className={styles.amountContainer}>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Type amount..."
                    />
                </div>
            </div>

            <div className={styles.actionsContainer}>
                {mutation.isError && <p className={styles.error}>Error: {mutation.error.message}</p>}
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Converting..." : "Submit"}
                </button>
            </div>

            <div className={styles.resultContainer}>
                <p className={styles.resultLabel}>Amount in PLN</p>
                {result !== null
                    ? <p className={styles.result}>{result.toFixed(2)}</p>
                    : <p className={styles.resultPlaceholder}>Awaiting submission...</p>
                }
            </div>
        </form>
    )
}