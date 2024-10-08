import React from 'react';

type FlightResult = {
    flight: string;
    from: string;
    to: string;
    price: string;
    duration: string;
};

interface SearchResultsProps {
    results: FlightResult[];
    loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            {loading && <p className="text-gray-500">Loading results...</p>}
            {!loading && results.length === 0 && (
                <p className="text-gray-500">No flights found for the selected route.</p>
            )}
            {results.map((result, index) => (
                <div key={index} className="border p-4 mb-4 rounded bg-gray-50">
                    <h2 className="font-semibold">{result.flight}</h2>
                    <p>{result.from} to {result.to}</p>
                    <p className="font-bold">Price: {result.price}</p>
                    <p>Duration: {result.duration}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
