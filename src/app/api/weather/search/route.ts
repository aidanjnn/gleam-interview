import { NextRequest, NextResponse } from 'next/server';

// GET /api/weather/search?lat=X&lon=Y - Get weather for any location by coordinates
export async function GET(request: NextRequest) {
    const apiKey = process.env.WEATHER_API_KEY;
    const lat = request.nextUrl.searchParams.get('lat');
    const lon = request.nextUrl.searchParams.get('lon');
    const name = request.nextUrl.searchParams.get('name') || 'Unknown';
    const country = request.nextUrl.searchParams.get('country') || '';

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Weather API key not configured' },
            { status: 500 }
        );
    }

    if (!lat || !lon) {
        return NextResponse.json(
            { error: 'lat and lon parameters required' },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no`,
            { next: { revalidate: 600 } }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API error: ${errorData.error?.message || response.status}`);
        }

        const data = await response.json();
        const transformedData = transformWeatherData(name, country, lat, lon, data);

        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch weather' },
            { status: 500 }
        );
    }
}

function transformWeatherData(name: string, country: string, lat: string, lon: string, data: any) {
    const current = data.current;
    const forecast = data.forecast?.forecastday || [];

    const todayHours = forecast[0]?.hour || [];
    const currentHour = new Date().getHours();
    const hourlyData = todayHours.slice(currentHour, currentHour + 10);

    return {
        city: {
            id: `${lat},${lon}`,
            name: name,
            country: country,
        },
        current: {
            temperature: Math.round(current.temp_c),
            condition: current.condition?.text || 'Clear',
            high: Math.round(forecast[0]?.day?.maxtemp_c || current.temp_c),
            low: Math.round(forecast[0]?.day?.mintemp_c || current.temp_c),
            feelsLike: Math.round(current.feelslike_c),
            humidity: current.humidity,
            uvIndex: Math.round(current.uv || 0),
        },
        hourly: [
            {
                time: 'Now',
                temperature: Math.round(current.temp_c),
                condition: mapWeatherCondition(current.condition?.code, current.is_day),
            },
            ...hourlyData.map((hour: any) => ({
                time: formatHour(hour.time),
                temperature: Math.round(hour.temp_c),
                condition: mapWeatherCondition(hour.condition?.code, hour.is_day),
            })),
        ],
        daily: forecast.map((day: any, index: number) => ({
            day: index === 0 ? 'Today' : formatDay(day.date),
            date: formatDate(day.date),
            high: Math.round(day.day.maxtemp_c),
            low: Math.round(day.day.mintemp_c),
            condition: mapWeatherCondition(day.day.condition?.code, 1),
        })),
    };
}

function mapWeatherCondition(code: number, isDay: number): string {
    if (code === 1000) return isDay ? 'sunny' : 'clear-night';
    if (code === 1003 || code === 1006) return 'partly-cloudy';
    if (code === 1009 || code === 1030) return 'cloudy';
    if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return 'rainy';
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return 'thunderstorm';
    if ([1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(code)) return 'snowy';
    if ([1135, 1147].includes(code)) return 'foggy';
    return isDay ? 'sunny' : 'clear-night';
}

function formatHour(timeStr: string): string {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
}

function formatDay(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
