'use client';

import { CityWeather } from '@/types/weather';
import { getWeatherIcon, formatTemperature, getWeatherGradient } from '@/utils/weatherUtils';
import styles from './CityCard.module.css';

interface CityCardProps {
    cityWeather: CityWeather;
    onClick: () => void;
}

export default function CityCard({ cityWeather, onClick }: CityCardProps) {
    const { city, current, hourly } = cityWeather;
    const condition = hourly[0]?.condition || 'sunny';
    const Icon = getWeatherIcon(condition);
    const gradient = getWeatherGradient(condition);

    return (
        <button
            className={styles.card}
            onClick={onClick}
            style={{ background: gradient }}
        >
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2 className={styles.cityName}>{city.name}</h2>
                    <span className={styles.currentTime}>Now</span>
                </div>

                <p className={styles.condition}>{current.condition}</p>

                <div className={styles.footer}>
                    <span className={styles.temperature}>
                        {formatTemperature(current.temperature)}
                    </span>
                    <div className={styles.highLow}>
                        <span>H:{formatTemperature(current.high)}</span>
                        <span>L:{formatTemperature(current.low)}</span>
                    </div>
                </div>
            </div>

            <div className={styles.iconWrapper}>
                <Icon size={56} strokeWidth={1.0} className={styles.icon} />
            </div>
        </button>
    );
}
