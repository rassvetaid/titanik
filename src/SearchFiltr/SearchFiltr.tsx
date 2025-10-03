import React, { useState } from 'react';
import './SearchFiltr.scss';
import { PassengerFilter } from '../types';

interface SearchFiltrProps {
  onFilterChange: (filters: PassengerFilter) => void;
  filtrPs: PassengerFilter;
}

function SearchFiltr({ onFilterChange, filtrPs }: SearchFiltrProps) {
    const [filters, setFilters] = useState<PassengerFilter>(filtrPs);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (name === 'age' && type === 'number') {
            const numericValue = parseFloat(value);

            if (numericValue < 0) {
                return;
            }
        }

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAgeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
            e.preventDefault();
        }
    };

    const handleAgePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData('text');

        if (['-', 'e', 'E'].some((char) => pastedData.includes(char))) {
            e.preventDefault();

            setFilters((prev) => ({
                ...prev,
                age: '',
            }));
        }
    };

    const searchItem = () => {
        onFilterChange(filters);
    };

    return (
        <div className="filterblock">
            <label className="label" htmlFor="namePs">
                Name
                <input
                    type="text"
                    name="name"
                    id="namePs"
                    value={filters.name}
                    onChange={handleInputChange}
                    placeholder="Enter name..."
                />
            </label>

            <label className="label" htmlFor="agePs">
                Age
                <input
                    type="number"
                    name="age"
                    id="agePs"
                    min="0"
                    value={filters.age}
                    onChange={handleInputChange}
                    onKeyDown={handleAgeKeyDown}
                    onPaste={handleAgePaste}
                    placeholder="Enter age..."
                />
            </label>

            <label className="label" htmlFor="genderPs">
                Gender
                <select
                    name="gender"
                    id="genderPs"
                    value={filters.gender}
                    onChange={handleInputChange}
                >
                    <option value="">All</option>
                    <option value="male">M</option>
                    <option value="female">W</option>
                </select>
            </label>

            <label className="label" htmlFor="survivedPs">
                Survived
                <select
                    name="survived"
                    id="survivedPs"
                    value={filters.survived}
                    onChange={handleInputChange}
                >
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </label>
            <button
                type="button"
                className="buttonSearch"
                onClick={searchItem}
            >
                Search
            </button>

        </div>
    );
}

export default SearchFiltr;
