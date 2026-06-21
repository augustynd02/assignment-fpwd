'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ExchangeTimer.module.css';

export default function ExchangeTimer({ initialSeconds = 60 }) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const router = useRouter();

    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (seconds <= 0) {
            router.refresh();
            return;
        }

        const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(timer);
    }, [seconds, router]);

    return <p className={styles.timer}>refreshes in <span>{seconds}s</span></p>;
}