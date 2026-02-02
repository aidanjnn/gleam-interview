import { NextResponse } from 'next/server';
import { CITIES } from '../config/cities';

// GET /api/cities - Returns list of available cities
export async function GET() {
    const cities = CITIES.map(({ id, name, country }) => ({
        id,
        name,
        country,
    }));

    return NextResponse.json(cities);
}
