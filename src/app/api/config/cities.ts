// City coordinates for weather API lookups
export interface CityConfig {
    id: string;
    name: string;
    country: string;
    lat: number;
    lon: number;
}

export const CITIES: CityConfig[] = [
    { id: 'vancouver', name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207 },
    { id: 'waterloo', name: 'Waterloo', country: 'Canada', lat: 43.4643, lon: -80.5204 },
    { id: 'toronto', name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 },
    { id: 'london', name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
    { id: 'paris', name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
    { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
    { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
    { id: 'nyc', name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
];

export const getCityById = (id: string): CityConfig | undefined => {
    return CITIES.find(city => city.id === id);
};
