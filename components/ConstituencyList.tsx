"use client";

import { ConstituencyResult } from "@/types";
import ConstituencyCard from "./ConstituencyCard";

interface ConstituencyListProps {
    results: ConstituencyResult[];
    hasSearch: boolean;
}

export default function ConstituencyList({ results, hasSearch }: ConstituencyListProps) {
    if (results.length === 0) {
        if (hasSearch) {
            return (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">No constituencies found matching your criteria.</p>
                </div>
            );
        }
        return (
            <div className="text-center py-10">
                <p className="text-gray-500 text-lg">Select a District and Taluka to view constituencies.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
                <ConstituencyCard
                    key={`${result.district_name}-${result.taluka_name}-${result.constituency_name}-${index}`}
                    data={result}
                />
            ))}
        </div>
    );
}
