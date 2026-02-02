'use client';

import { DailyForecast } from '@/types/weather';
import DayCard from '@/components/DayCard/DayCard';
import styles from './WeeklyForecast.module.css';

interface WeeklyForecastProps {
    dailyData: DailyForecast[];
}

export default function WeeklyForecast({ dailyData }: WeeklyForecastProps) {
    // Find min and max temperatures for the week for consistent bar scaling
    const allTemps = dailyData.flatMap((d) => [d.high, d.low]);
    const minTemp = Math.min(...allTemps);
    const maxTemp = Math.max(...allTemps);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>7-Day Forecast</span>
            </div>
            <div className={styles.list}>
                {dailyData.map((day, index) => (
                    <DayCard
                        key={index}
                        forecast={day}
                        minTemp={minTemp}
                        maxTemp={maxTemp}
                    />
                ))}
            </div>
        </div>
    );
}
