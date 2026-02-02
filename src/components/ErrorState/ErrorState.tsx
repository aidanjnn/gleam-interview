'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <AlertCircle size={48} className={styles.icon} />
                <h2 className={styles.title}>Unable to Load Weather</h2>
                <p className={styles.message}>{message}</p>
                {onRetry && (
                    <button className={styles.retryButton} onClick={onRetry}>
                        <RefreshCw size={18} />
                        <span>Try Again</span>
                    </button>
                )}
                <p className={styles.hint}>
                    Make sure your API key is configured in <code>.env.local</code>
                </p>
            </div>
        </div>
    );
}
