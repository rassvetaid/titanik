import React, { useEffect } from 'react';
import { usePassengers } from '../components/usePassengers';
import InfiniteScroll from './InfiniteScroll';
import PassengerCard from './PassengerCard';
import { PassengerFilter } from '../types';

interface PassengerListFiltr {
  allDataTeat: PassengerFilter;
}

function PassengerList({ allDataTeat }: PassengerListFiltr) {
    const {
        passengers,
        loading,
        loadDataFilter,
        hasMore,
        loadMore,
    } = usePassengers();

    useEffect(() => {
        loadDataFilter(allDataTeat);
    }, [allDataTeat, loadDataFilter]);

    return (
        <tbody>
            <InfiniteScroll
                onLoadMore={loadMore}
                filtrData={allDataTeat}
                hasMore={hasMore}
                loading={loading}
            >
                {(passengers.length === 0) && !loading && (
                    <tr>
                        <td className="status error">
                            Not found passengers.
                        </td>
                    </tr>
                )}
                {(passengers.length !== 0) && passengers.map((item) => (
                    <PassengerCard key={item.id} passenger={item} />
                ))}
            </InfiniteScroll>
        </tbody>
    );
}

export default PassengerList;
