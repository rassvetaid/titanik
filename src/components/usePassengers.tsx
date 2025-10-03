import { useState, useEffect, useCallback } from 'react';
import { Passenger, PassengerFilter } from '../types';

const API_URL = 'https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json';

// Фильтр
function filterPassengers(allData: Passenger[], filterList: PassengerFilter): Passenger[] {
    return allData.filter((item) => {
        // name
        if (filterList.name && !item.name?.toLowerCase().includes(filterList.name.trim().toLowerCase())) {
            return false;
        }

        // age
        if (filterList.age) {
            const filterAge = parseInt(filterList.age.toString(), 10);
            const passengerAge = item.age || 0;
            if (passengerAge !== filterAge) {
                return false;
            }
        }

        // gender
        if (filterList.gender && item.gender !== filterList.gender) {
            return false;
        }

        // survived
        if (filterList.survived !== '') {
            if (filterList.survived === 'true' && !item.survived) {
                return false;
            }
            if (filterList.survived === 'false' && item.survived) {
                return false;
            }
        }

        return true;
    });
}

export const usePassengers = () => {
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const PAGE_SIZE = 20;

    const loadPassengers = useCallback(async (page: number, filterList: PassengerFilter) => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const allData: Passenger[] = await response.json();

            const isFilterEmpty = (value) => (value === '' || value === null || value === undefined);
            const allEmpty = Object.values(filterList).every(isFilterEmpty);

            let results: Passenger[] = [];

            if (!allEmpty) {
                results = filterPassengers(allData, filterList);
            }

            const temp: Passenger[] = (results.length === 0 && allEmpty) ? allData : results;

            // Пагинация
            const startIndex = page * PAGE_SIZE;
            const endIndex = startIndex + PAGE_SIZE;
            const paginatedData = temp.slice(startIndex, endIndex);

            if (page === 0) {
                setPassengers(paginatedData);
            } else {
                setPassengers((prev) => [...prev, ...paginatedData]);
            }

            setHasMore(endIndex < temp.length);
            setCurrentPage(page);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [PAGE_SIZE]);

    const loadMore = useCallback((filterList) => {
        if (!loading && hasMore) {
            loadPassengers(currentPage + 1, filterList);
        }
    }, [loading, hasMore, currentPage, loadPassengers]);

    const loadDataFilter = useCallback((filterList) => {
        loadPassengers(0, filterList);
    }, [loadPassengers]);

    useEffect(() => {
        loadPassengers(0, {});
    }, [loadPassengers]);

    return {
        passengers,
        loading,
        error,
        hasMore,
        loadMore,
        loadDataFilter,
        currentPage,
    };
};
