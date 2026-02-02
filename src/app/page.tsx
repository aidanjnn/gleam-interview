'use client';

import { useState, useMemo } from 'react';
import { useWeatherData } from '@/hooks/useWeatherData';
import { getWeatherGradient } from '@/utils/weatherUtils';
import { CityWeather } from '@/types/weather';
import LandingPage from '@/components/LandingPage/LandingPage';
import BackButton from '@/components/BackButton/BackButton';
import CurrentWeather from '@/components/CurrentWeather/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast/HourlyForecast';
import WeeklyForecast from '@/components/WeeklyForecast/WeeklyForecast';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import ErrorState from '@/components/ErrorState/ErrorState';
import styles from './page.module.css';

interface SearchResult {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export default function Home() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [searchedCityWeather, setSearchedCityWeather] = useState<CityWeather | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { weatherData, isLoading, error, refetch } = useWeatherData();

  const currentCityWeather = useMemo(() => {
    // If we have searched city weather, use that
    if (searchedCityWeather && selectedCityId === searchedCityWeather.city.id) {
      return searchedCityWeather;
    }
    // Otherwise find in weather data
    return weatherData.find((data) => data.city.id === selectedCityId);
  }, [selectedCityId, weatherData, searchedCityWeather]);

  // Get weather-based background gradient for detail view
  const backgroundGradient = useMemo(() => {
    if (!currentCityWeather) return '';
    const condition = currentCityWeather.hourly[0]?.condition || 'sunny';
    return getWeatherGradient(condition);
  }, [currentCityWeather]);

  const handleCitySelect = (cityId: string) => {
    setSearchedCityWeather(null);
    setSelectedCityId(cityId);
  };

  const handleSearchSelect = async (city: SearchResult) => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        lat: city.lat.toString(),
        lon: city.lon.toString(),
        name: city.name,
        country: city.country,
      });

      const response = await fetch(`/api/weather/search?${params}`);
      if (response.ok) {
        const weather = await response.json();
        setSearchedCityWeather(weather);
        setSelectedCityId(weather.city.id);
      }
    } catch (error) {
      console.error('Error fetching searched city weather:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBackToLanding = () => {
    setSelectedCityId(null);
    setSearchedCityWeather(null);
  };

  // Show loading state
  if (isLoading || isSearching) {
    return <LoadingSpinner message={isSearching ? 'Fetching city weather...' : 'Fetching weather data...'} />;
  }

  // Show error state
  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  // Show landing page if no city is selected
  if (!selectedCityId || !currentCityWeather) {
    return (
      <LandingPage
        cities={weatherData}
        onCitySelect={handleCitySelect}
        onSearchSelect={handleSearchSelect}
      />
    );
  }

  // Show weather detail view for selected city
  return (
    <main className={styles.main} style={{ background: backgroundGradient }}>
      <div className={styles.container}>
        <BackButton onClick={handleBackToLanding} />

        <CurrentWeather
          cityName={currentCityWeather.city.name}
          weather={currentCityWeather.current}
        />

        <HourlyForecast hourlyData={currentCityWeather.hourly} />

        <WeeklyForecast dailyData={currentCityWeather.daily} />

        <div className={styles.footer}>
          <p className={styles.footerText}>Real-time weather data from WeatherAPI.com</p>
        </div>
      </div>
    </main>
  );
}
