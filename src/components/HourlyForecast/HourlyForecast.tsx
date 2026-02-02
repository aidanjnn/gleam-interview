'use client';

import { HourlyForecast as HourlyForecastType } from '@/types/weather';
import { getWeatherIcon, formatTemperature } from '@/utils/weatherUtils';
import styles from './HourlyForecast.module.css';

interface HourlyForecastProps {
    hourlyData: HourlyForecastType[];
}

export default function HourlyForecast({ hourlyData }: HourlyForecastProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>Hourly Forecast</span>
            </div>
            <div className={styles.scrollWrapper}>
                {hourlyData.map((hour, index) => {
                    const Icon = getWeatherIcon(hour.condition);
                    return (
                        <div key={index} className={styles.hourCard}>
                            <span className={styles.time}>{hour.time}</span>
                            <Icon className={styles.icon} size={28} strokeWidth={1.0} />
                            <span className={styles.temp}>{formatTemperature(hour.temperature)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
