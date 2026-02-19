"use client";

import { District } from "@/types";
import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DistrictMultiSelectProps {
    districts: District[];
    selectedDistricts: string[];
    onChange: (selected: string[]) => void;
}

export default function DistrictMultiSelect({
    districts,
    selectedDistricts,
    onChange,
}: DistrictMultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDistrict = (districtName: string) => {
        if (selectedDistricts.includes(districtName)) {
            onChange(selectedDistricts.filter((d) => d !== districtName));
        } else {
            onChange([...selectedDistricts, districtName]);
        }
    };

    const handleSelectAll = () => {
        if (selectedDistricts.length === districts.length) {
            onChange([]);
        } else {
            onChange(districts.map((d) => d.district_name));
        }
    };

    const isAllSelected = districts.length > 0 && selectedDistricts.length === districts.length;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Districts
            </label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-full bg-white border border-gray-300 rounded-lg py-3 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm shadow-sm"
            >
                <span className="block truncate">
                    {selectedDistricts.length === 0
                        ? "All Districts"
                        : selectedDistricts.length === districts.length
                            ? "All Districts Selected"
                            : `${selectedDistricts.length} District${selectedDistricts.length > 1 ? 's' : ''} Selected`}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {/* Select All Option */}
                    <div
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 font-semibold text-primary border-b border-gray-100"
                        onClick={handleSelectAll}
                    >
                        <span className="block truncate">
                            {isAllSelected ? "Deselect All" : "Select All"}
                        </span>
                        {isAllSelected && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                                <Check className="h-4 w-4" />
                            </span>
                        )}
                    </div>

                    {districts.map((district) => {
                        const isSelected = selectedDistricts.includes(district.district_name);
                        return (
                            <div
                                key={district.district_name}
                                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 ${isSelected ? 'bg-indigo-50 text-primary font-medium' : 'text-gray-900'}`}
                                onClick={() => toggleDistrict(district.district_name)}
                            >
                                <span className="block truncate">{district.district_name}</span>
                                {isSelected && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                                        <Check className="h-4 w-4" />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
