// Weather App TypeScript Interfaces

export interface City {
    id: string;
    name: string;
    country: string;
}

export interface CurrentWeather {
    temperature: number;
    condition: string;
    high: number;
    low: number;
    feelsLike: number;
    humidity: number;
    uvIndex: number;
}

export interface HourlyForecast {
    time: string;
    temperature: number;
    condition: WeatherCondition;
}

export interface DailyForecast {
    day: string;
    date: string;
    high: number;
    low: number;
    condition: WeatherCondition;
}

export interface CityWeather {
    city: City;
    current: CurrentWeather;
    hourly: HourlyForecast[];
    daily: DailyForecast[];
}

export type WeatherCondition =
    | 'sunny'
    | 'partly-cloudy'
    | 'cloudy'
    | 'rainy'
    | 'thunderstorm'
    | 'snowy'
    | 'foggy'
    | 'windy'
    | 'clear-night';
