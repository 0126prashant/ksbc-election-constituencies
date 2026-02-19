"use client";

import { Taluka } from "@/types";
import { ChevronDown } from "lucide-react";

interface TalukaFilterProps {
    talukas: Taluka[];
    selectedTaluka: string;
    onSelect: (talukaName: string) => void;
    disabled: boolean;
}

export default function TalukaFilter({
    talukas,
    selectedTaluka,
    onSelect,
    disabled,
}: TalukaFilterProps) {
    return (
        <div className="relative w-full">
            <label
                htmlFor="taluka"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Select Taluka
            </label>
            <div className="relative">
                <select
                    id="taluka"
                    value={selectedTaluka}
                    onChange={(e) => onSelect(e.target.value)}
                    disabled={disabled}
                    className={`block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg appearance-none shadow-sm transition ease-in-out duration-150 ${disabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-900"
                        }`}
                >
                    <option value="">All Talukas</option>
                    {talukas.map((taluka) => (
                        <option key={taluka.taluka_name} value={taluka.taluka_name}>
                            {taluka.taluka_name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className={`h-4 w-4 ${disabled ? "text-gray-400" : ""}`} />
                </div>
            </div>
        </div>
    );
}
