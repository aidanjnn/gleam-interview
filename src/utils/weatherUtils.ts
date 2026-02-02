import { WeatherCondition } from '@/types/weather';
import {
    Sun,
    Cloud,
    CloudSun,
    CloudRain,
    CloudLightning,
    Snowflake,
    CloudFog,
    Wind,
    Moon,
    LucideIcon,
} from 'lucide-react';

export const getWeatherIcon = (condition: WeatherCondition): LucideIcon => {
    const icons: Record<WeatherCondition, LucideIcon> = {
        'sunny': Sun,
        'partly-cloudy': CloudSun,
        'cloudy': Cloud,
        'rainy': CloudRain,
        'thunderstorm': CloudLightning,
        'snowy': Snowflake,
        'foggy': CloudFog,
        'windy': Wind,
        'clear-night': Moon,
    };
    return icons[condition];
};

export const formatTemperature = (temp: number): string => {
    return `${Math.round(temp)}°`;
};

export const getConditionColor = (condition: WeatherCondition): string => {
    const colors: Record<WeatherCondition, string> = {
        'sunny': '#FFD700',
        'partly-cloudy': '#87CEEB',
        'cloudy': '#A0AEC0',
        'rainy': '#4299E1',
        'thunderstorm': '#805AD5',
        'snowy': '#E2E8F0',
        'foggy': '#CBD5E0',
        'windy': '#63B3ED',
        'clear-night': '#2D3748',
    };
    return colors[condition];
};

export const getWeatherGradient = (condition: WeatherCondition | string): string => {
    const gradients: Record<string, string> = {
        'sunny': 'linear-gradient(180deg, #4A90D9 0%, #74B9FF 50%, #A8D8FF 100%)',
        'partly-cloudy': 'linear-gradient(180deg, #5A8FC7 0%, #83AAD8 50%, #B5CCE8 100%)',
        'cloudy': 'linear-gradient(180deg, #6B7B8C 0%, #8A9BAD 50%, #B5C1CD 100%)',
        'rainy': 'linear-gradient(180deg, #4A5568 0%, #6B7D8F 50%, #8FA3B5 100%)',
        'thunderstorm': 'linear-gradient(180deg, #2D3748 0%, #4A5568 50%, #6B7D8F 100%)',
        'snowy': 'linear-gradient(180deg, #B8C5D4 0%, #D1DCE8 50%, #E8EEF4 100%)',
        'foggy': 'linear-gradient(180deg, #8A9BAD 0%, #A5B5C5 50%, #C5D1DD 100%)',
        'windy': 'linear-gradient(180deg, #5A8FC7 0%, #7AAAD8 50%, #A5C8E8 100%)',
        'clear-night': 'linear-gradient(180deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
    };
    return gradients[condition] || gradients['sunny'];
};
