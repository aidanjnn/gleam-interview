'use client';

import { CurrentWeather as CurrentWeatherType } from '@/types/weather';
import styles from './CurrentWeather.module.css';

interface CurrentWeatherProps {
    cityName: string;
    weather: CurrentWeatherType;
}

export default function CurrentWeather({ cityName, weather }: CurrentWeatherProps) {
    return (
        <div className={styles.container}>
            <h1 className={styles.cityName}>{cityName}</h1>
            <div className={styles.temperature}>{weather.temperature}°</div>
            <p className={styles.condition}>{weather.condition}</p>
            <div className={styles.highLow}>
                H:{weather.high}° L:{weather.low}°
            </div>
        </div>
    );
}
