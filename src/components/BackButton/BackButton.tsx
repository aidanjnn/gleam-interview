'use client';

import { ArrowLeft } from 'lucide-react';
import styles from './BackButton.module.css';

interface BackButtonProps {
    onClick: () => void;
    label?: string;
}

export default function BackButton({ onClick, label = 'All Cities' }: BackButtonProps) {
    return (
        <button className={styles.button} onClick={onClick}>
            <ArrowLeft size={20} className={styles.icon} />
            <span className={styles.label}>{label}</span>
        </button>
    );
}
