"use client";

import { District } from "@/types";
import { ChevronDown } from "lucide-react";

interface DistrictFilterProps {
    districts: District[];
    selectedDistrict: string;
    onSelect: (districtName: string) => void;
}

export default function DistrictFilter({
    districts,
    selectedDistrict,
    onSelect,
}: DistrictFilterProps) {
    return (
        <div className="relative w-full">
            <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Select District
            </label>
            <div className="relative">
                <select
                    id="district"
                    value={selectedDistrict}
                    onChange={(e) => onSelect(e.target.value)}
                    className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg appearance-none bg-white text-gray-900 shadow-sm transition ease-in-out duration-150"
                >
                    <option value="">All Districts</option>
                    {districts.map((district) => (
                        <option key={district.district_name} value={district.district_name}>
                            {district.district_name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
