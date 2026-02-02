'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import styles from './CitySearch.module.css';

interface SearchResult {
    id: string;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
}

interface CitySearchProps {
    onCitySelect: (city: SearchResult) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Debounced search
    const searchCities = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data);
            }
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Handle input change with debounce
    const handleInputChange = (value: string) => {
        setQuery(value);
        setIsOpen(true);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            searchCities(value);
        }, 300);
    };

    // Handle city selection
    const handleSelect = (city: SearchResult) => {
        onCitySelect(city);
        setQuery('');
        setResults([]);
        setIsOpen(false);
    };

    // Clear search
    const handleClear = () => {
        setQuery('');
        setResults([]);
        inputRef.current?.focus();
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.inputWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                />
                {isLoading && <Loader2 size={18} className={styles.loader} />}
                {query && !isLoading && (
                    <button className={styles.clearButton} onClick={handleClear}>
                        <X size={16} />
                    </button>
                )}
            </div>

            {isOpen && query.length >= 2 && (
                <div className={styles.dropdown}>
                    {results.length > 0 ? (
                        <ul className={styles.resultsList}>
                            {results.map((city) => (
                                <li
                                    key={city.id}
                                    className={styles.resultItem}
                                    onClick={() => handleSelect(city)}
                                >
                                    <MapPin size={16} className={styles.pinIcon} />
                                    <div className={styles.cityInfo}>
                                        <span className={styles.cityName}>{city.name}</span>
                                        <span className={styles.cityLocation}>
                                            {city.region ? `${city.region}, ` : ''}{city.country}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : !isLoading ? (
                        <div className={styles.noResults}>
                            No cities found for "{query}"
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
