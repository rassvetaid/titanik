import React from 'react';
import { Passenger } from '../types';

interface PassengerCardProps {
  passenger: Passenger;
}

function PassengerCard({ passenger }: PassengerCardProps) {
    return (
        <tr>
            <td>{passenger.name}</td>
            <td>
                <span className="noneEl">Gender:</span>
                {passenger.gender}
            </td>
            <td>
                <span className="noneEl">Age:</span>
                {passenger.age ?? '-'}
            </td>
            <td>{passenger.ticket}</td>
            <td>
                <span className="noneEl">Survived:</span>
                <span style={{ color: passenger.survived ? 'green' : 'red' }}>
                    {passenger.survived ? 'Yes' : 'No'}
                </span>
                <span>
                    {passenger.body ? ` (${passenger.body})` : ''}
                </span>
            </td>
            <td>
                Siblings:
                {passenger.sibsp}
                {' '}
                Parrents:
                {passenger.parch}
                {' '}
                Parrents:
                {+passenger.parch + +passenger.sibsp}
            </td>
            <td>{passenger.boat}</td>
        </tr>
    );
}

export default PassengerCard;
