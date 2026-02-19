"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
    query: string;
    setQuery: (query: string) => void;
}

export default function SearchInput({ query, setQuery }: SearchInputProps) {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out shadow-sm"
                placeholder="Search for your constituency (e.g. Muddebihal)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
