'use client';

import { CityWeather } from '@/types/weather';
import CityCard from '@/components/CityCard/CityCard';
import CitySearch from '@/components/CitySearch/CitySearch';
import styles from './LandingPage.module.css';

interface SearchResult {
    id: string;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
}

interface LandingPageProps {
    cities: CityWeather[];
    onCitySelect: (cityId: string) => void;
    onSearchSelect: (city: SearchResult) => void;
}

export default function LandingPage({ cities, onCitySelect, onSearchSelect }: LandingPageProps) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>weather for gleam :) </h1>
                <p className={styles.subtitle}>Select a city to view detailed forecast</p>
            </header>

            <div className={styles.searchContainer}>
                <CitySearch onCitySelect={onSearchSelect} />
            </div>

            <div className={styles.cityList}>
                {cities.map((cityWeather) => (
                    <CityCard
                        key={cityWeather.city.id}
                        cityWeather={cityWeather}
                        onClick={() => onCitySelect(cityWeather.city.id)}
                    />
                ))}
            </div>

            <footer className={styles.footer}>
                <p className={styles.footerText}>Powered by WeatherAPI.com</p>
            </footer>
        </div>
    );
}
