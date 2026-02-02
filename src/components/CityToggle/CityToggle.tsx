'use client';

import { City } from '@/types/weather';
import styles from './CityToggle.module.css';

interface CityToggleProps {
    cities: City[];
    selectedCityId: string;
    onCitySelect: (cityId: string) => void;
}

export default function CityToggle({ cities, selectedCityId, onCitySelect }: CityToggleProps) {
    return (
        <div className={styles.container}>
            <div className={styles.scrollWrapper}>
                {cities.map((city) => (
                    <button
                        key={city.id}
                        className={`${styles.pill} ${selectedCityId === city.id ? styles.active : ''}`}
                        onClick={() => onCitySelect(city.id)}
                    >
                        <span className={styles.cityName}>{city.name}</span>
                        <span className={styles.country}>{city.country}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
