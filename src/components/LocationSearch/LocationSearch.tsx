'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { City } from '@/types/weather';
import styles from './LocationSearch.module.css';

interface LocationSearchProps {
    cities: City[];
    selectedCityId: string;
    onCitySelect: (cityId: string) => void;
}

export default function LocationSearch({ cities, selectedCityId, onCitySelect }: LocationSearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedCity = cities.find((city) => city.id === selectedCityId);

    // Filter cities based on search query
    const filteredCities = cities.filter(
        (city) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            city.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus input when dropdown opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCityClick = (cityId: string) => {
        onCitySelect(cityId);
        setIsOpen(false);
        setSearchQuery('');
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setSearchQuery('');
        }
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <MapPin size={18} className={styles.icon} />
                <span className={styles.selectedCity}>
                    {selectedCity?.name || 'Select Location'}
                </span>
                <ChevronDown
                    size={18}
                    className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.searchWrapper}>
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            ref={inputRef}
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search cities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search cities"
                        />
                    </div>

                    <ul className={styles.cityList} role="listbox">
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city) => (
                                <li
                                    key={city.id}
                                    className={`${styles.cityItem} ${city.id === selectedCityId ? styles.selected : ''}`}
                                    onClick={() => handleCityClick(city.id)}
                                    role="option"
                                    aria-selected={city.id === selectedCityId}
                                >
                                    <MapPin size={16} className={styles.cityIcon} />
                                    <div className={styles.cityInfo}>
                                        <span className={styles.cityName}>{city.name}</span>
                                        <span className={styles.cityCountry}>{city.country}</span>
                                    </div>
                                    {city.id === selectedCityId && (
                                        <span className={styles.checkmark}>✓</span>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li className={styles.noResults}>No cities found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
