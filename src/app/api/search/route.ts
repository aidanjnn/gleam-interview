import { NextRequest, NextResponse } from 'next/server';

// GET /api/search?q=query - Search for cities using WeatherAPI.com autocomplete
export async function GET(request: NextRequest) {
    const apiKey = process.env.WEATHER_API_KEY;
    const query = request.nextUrl.searchParams.get('q');

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Weather API key not configured' },
            { status: 500 }
        );
    }

    if (!query || query.length < 2) {
        return NextResponse.json([]);
    }

    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error(`Search API error: ${response.status}`);
        }

        const data = await response.json();

        // Transform to our format
        const cities = data.map((item: any) => ({
            id: `${item.lat},${item.lon}`,
            name: item.name,
            region: item.region,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
        }));

        return NextResponse.json(cities);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Failed to search cities' },
            { status: 500 }
        );
    }
}
