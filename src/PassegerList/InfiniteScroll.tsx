import React, {
    useEffect, useRef, useCallback, useState,
} from 'react';
import { PassengerFilter } from '../types';

interface InfiniteScrollProps {
  onLoadMore: (filters?: PassengerFilter) => void;
  filtrData: PassengerFilter;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
}
function InfiniteScroll({
    onLoadMore,
    filtrData,
    hasMore,
    loading,
    children,
}: InfiniteScrollProps) {
    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const loadMoreRef = useRef<HTMLTableRowElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Мобильная версия или нет
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleTbodyScroll = useCallback(() => {
        if (loading || !hasMore || !tbodyRef.current || !loadMoreRef.current) return;

        const tbody = tbodyRef.current;
        const loadMoreElement = loadMoreRef.current;

        // Позиции элементов относительно tbody
        const tbodyRect = tbody.getBoundingClientRect();
        const loadMoreRect = loadMoreElement.getBoundingClientRect();

        // Вычисление видимой области tbody
        const tbodyTop = tbody.scrollTop;
        const tbodyHeight = tbody.clientHeight;

        // Позиция элемента loadMore относительно tbody
        const loadMoreTop = loadMoreRect.top - tbodyRect.top + tbodyTop;

        // Если элемент находится в видимой области tbody
        if (loadMoreTop <= tbodyTop + tbodyHeight) {
            onLoadMore(filtrData);
        }
    }, [onLoadMore, filtrData, hasMore, loading]);

    const handleWindowScroll = useCallback(() => {
        if (loading || !hasMore || !loadMoreRef.current) return;

        const loadMoreElement = loadMoreRef.current;
        const loadMoreRect = loadMoreElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Если элемент находится в видимой области окна
        if (loadMoreRect.top <= windowHeight) {
            onLoadMore(filtrData);
        }
    }, [onLoadMore, filtrData, hasMore, loading]);

    useEffect(() => {
        if (isMobile) {
            // На мобильных - скролл window
            window.addEventListener('scroll', handleWindowScroll);
            handleWindowScroll();

            return () => {
                window.removeEventListener('scroll', handleWindowScroll);
            };
        }
        // Десктоп скролл tbody
        const tbody = tbodyRef.current;
        if (!tbody) return;

        tbody.addEventListener('scroll', handleTbodyScroll);
        handleTbodyScroll();

        return () => {
            tbody.removeEventListener('scroll', handleTbodyScroll);
        };
    }, [isMobile, handleTbodyScroll, handleWindowScroll]);

    // Стили tbody отключение overflow
    const tbodyStyle = isMobile
        ? { display: 'block' }
        : { display: 'block', overflow: 'auto', maxHeight: '500px' };

    return (
        <tbody ref={tbodyRef} style={tbodyStyle}>
            {children}
            <tr ref={loadMoreRef} />
            {loading && (
                <tr>
                    <td className="status load">
                        Загрузка...
                    </td>
                </tr>
            )}
        </tbody>
    );
}

export default InfiniteScroll;
