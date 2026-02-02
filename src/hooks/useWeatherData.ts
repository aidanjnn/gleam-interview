'use client';

import { useState, useEffect, useCallback } from 'react';
import { CityWeather } from '@/types/weather';

interface UseWeatherDataResult {
    weatherData: CityWeather[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useWeatherData(): UseWeatherDataResult {
    const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/weather');

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setWeatherData(data);
        } catch (err) {
            console.error('Weather fetch error:', err);
            setError(err instanceof Error ? err.message : 'Failed to load weather data');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    return {
        weatherData,
        isLoading,
        error,
        refetch: fetchWeather,
    };
}

interface UseCityWeatherResult {
    weather: CityWeather | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useCityWeather(cityId: string | null): UseCityWeatherResult {
    const [weather, setWeather] = useState<CityWeather | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCityWeather = useCallback(async () => {
        if (!cityId) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/weather/${cityId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch city weather');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setWeather(data);
        } catch (err) {
            console.error('City weather fetch error:', err);
            setError(err instanceof Error ? err.message : 'Failed to load weather');
        } finally {
            setIsLoading(false);
        }
    }, [cityId]);

    useEffect(() => {
        if (cityId) {
            fetchCityWeather();
        }
    }, [cityId, fetchCityWeather]);

    return {
        weather,
        isLoading,
        error,
        refetch: fetchCityWeather,
    };
}
