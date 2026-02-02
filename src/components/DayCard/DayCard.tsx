'use client';

import { DailyForecast } from '@/types/weather';
import { getWeatherIcon, formatTemperature } from '@/utils/weatherUtils';
import styles from './DayCard.module.css';

interface DayCardProps {
    forecast: DailyForecast;
    minTemp: number;
    maxTemp: number;
}

export default function DayCard({ forecast, minTemp, maxTemp }: DayCardProps) {
    const Icon = getWeatherIcon(forecast.condition);

    // Calculate position for temperature bar
    const range = maxTemp - minTemp;
    const lowPercent = ((forecast.low - minTemp) / range) * 100;
    const highPercent = ((forecast.high - minTemp) / range) * 100;

    return (
        <div className={styles.container}>
            <span className={styles.day}>{forecast.day}</span>
            <div className={styles.iconWrapper}>
                <Icon className={styles.icon} size={24} strokeWidth={1.0} />
            </div>
            <div className={styles.tempRange}>
                <span className={styles.lowTemp}>{formatTemperature(forecast.low)}</span>
                <div className={styles.barContainer}>
                    <div
                        className={styles.bar}
                        style={{
                            left: `${lowPercent}%`,
                            width: `${highPercent - lowPercent}%`,
                        }}
                    />
                </div>
                <span className={styles.highTemp}>{formatTemperature(forecast.high)}</span>
            </div>
        </div>
    );
}
