import React from 'react';
import './Table.scss';
import PassengerList from '../PassegerList/PassengerList';
import { PassengerFilter } from '../types';

interface TableFiltr {
  alltr: PassengerFilter;
}

function Table({ alltr }: TableFiltr) {
// const Table: React.FC<TableFiltr> = ({ alltr }) => (
// const Table: React.FC<TableFiltr> = ({ alltr }) =>
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Ticket</th>
                    <th>Survived</th>
                    <th>Relative </th>
                    <th>Boat</th>
                </tr>
            </thead>
            <PassengerList allDataTeat={alltr} />
        </table>
    );
}
export default Table;
