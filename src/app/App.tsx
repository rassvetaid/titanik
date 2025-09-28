import React, { useEffect, useState } from 'react';
import './App.scss';
import { PassengerFilter } from '../types';
import SearchFiltr from '../SearchFiltr/SearchFiltr';
import Table from '../table/Table';
import Arrow from '../arrowUp.svg';

function App() {
    const [filtrPassengers, setFiltPassengers] = useState<PassengerFilter | null>({
        name: '',
        age: '',
        gender: '',
        survived: '',
    });
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Проверяем прокрутку страницы (мобильная версия)
    useEffect(() => {
        const handleScroll = () => {
            // Показываем кнопку после прокрутки на 300px
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Для прокрутки в начало
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="container">
            <h1 className="title">Titanik Passengers</h1>
            <SearchFiltr onFilterChange={setFiltPassengers} filtrPs={filtrPassengers} />
            <Table alltr={filtrPassengers} />
            {showScrollTop && (
                <button
                    type="button"
                    className="scroll-top-button"
                    onClick={scrollToTop}
                >
                    <Arrow />
                </button>
            )}
        </div>
    );
}

export default App;
