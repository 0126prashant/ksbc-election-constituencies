"use client";

import { District, Taluka } from "@/types";

interface TalukaGroupProps {
    districts: District[];
    selectedDistricts: string[];
    selectedTalukas: string[];
    onTalukaToggle: (talukaName: string) => void;
}

export default function TalukaGroup({
    districts,
    selectedDistricts,
    selectedTalukas,
    onTalukaToggle,
}: TalukaGroupProps) {
    // If no districts selected (or all deselected), show nothing or prompt?
    // Let's assume if 0 selected, show nothing.
    if (selectedDistricts.length === 0) {
        return (
            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p>Select at least one district to view its Talukas.</p>
            </div>
        );
    }

    // Filter districts to show only selected ones
    const activeDistricts = districts.filter(d => selectedDistricts.includes(d.district_name));

    return (
        <div className="space-y-6">
            {activeDistricts.map((district) => (
                <div key={district.district_name} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {district.district_name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {district.talukas.map((taluka) => {
                            const isSelected = selectedTalukas.includes(taluka.taluka_name);
                            return (
                                <button
                                    key={taluka.taluka_name}
                                    onClick={() => onTalukaToggle(taluka.taluka_name)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border ${isSelected
                                            ? "bg-primary text-white border-primary shadow-sm"
                                            : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {taluka.taluka_name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
