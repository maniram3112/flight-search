"use client";

import React, { useState } from 'react';

type FlightResult = {
    airline: string;
    price: string;
    from: string;
    to: string;
    duration: string;
};

const airports = [
    { code: 'LAX', name: 'Los Angeles International Airport' },
    { code: 'JFK', name: 'John F. Kennedy International Airport' },
    { code: 'SFO', name: 'San Francisco International Airport' },
];

const mockFlightResults: FlightResult[] = [
    { airline: 'Airline A', price: '$250', from: 'LAX', to: 'JFK', duration: '6h 30m' },
    { airline: 'Airline B', price: '$320', from: 'LAX', to: 'SFO', duration: '1h 45m' },
    { airline: 'Airline C', price: '$400', from: 'SFO', to: 'JFK', duration: '5h 50m' },
];

const FlightSearch: React.FC = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [results, setResults] = useState<FlightResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (from && to) {
            setLoading(true);
            setSearched(true);
            setResults([]);

            setTimeout(() => {
                const filteredResults = mockFlightResults.filter(
                    (flight) => flight.from === from && flight.to === to
                );
                setResults(filteredResults);
                setLoading(false);
            }, 1000); // Simulating an API call with a delay
        } else {
            alert("Please select both departure and destination airports.");
        }
    };

    return (
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Flight Search</h1>
            
            <div className="mb-4">
                <label className="block text-blue-600 mb-2">From:</label>
                <input
                    list="from-airports"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="border border-blue-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select departure airport"
                />
                <datalist id="from-airports">
                    {airports.map((airport) => (
                        <option key={airport.code} value={airport.code}>
                            {airport.name}
                        </option>
                    ))}
                </datalist>
            </div>

            <div className="mb-4">
                <label className="block text-blue-600 mb-2">To:</label>
                <input
                    list="to-airports"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="border border-blue-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select destination airport"
                />
                <datalist id="to-airports">
                    {airports.map((airport) => (
                        <option key={airport.code} value={airport.code}>
                            {airport.name}
                        </option>
                    ))}
                </datalist>
            </div>

            <div className="mb-4">
                <label className="block text-blue-600 mb-2">Departure Date:</label>
                <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="border border-blue-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={handleSearch}
                disabled={!from || !to}
                className={`bg-blue-600 text-white font-bold py-2 rounded-lg w-full transition duration-300 hover:bg-blue-700 ${!from || !to ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Searching...' : 'Search Flights'}
            </button>

            {searched && !loading && results.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4 text-blue-700">Search Results</h2>
                    {results.map((flight, index) => (
                        <div key={index} className="border border-blue-300 p-4 mb-4 rounded-lg bg-white shadow-md">
                            <p><strong>Airline:</strong> {flight.airline}</p>
                            <p><strong>From:</strong> {flight.from} <strong>To:</strong> {flight.to}</p>
                            <p><strong>Duration:</strong> {flight.duration}</p>
                            <p><strong>Price:</strong> {flight.price}</p>
                        </div>
                    ))}
                </div>
            )}

            {searched && !loading && results.length === 0 && (
                <div className="mt-4 text-gray-600">
                    No flights found for the selected route.
                </div>
            )}
        </div>
    );
};

export default FlightSearch;
