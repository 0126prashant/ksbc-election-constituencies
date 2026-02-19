"use client";

import { ConstituencyResult } from "@/types";
import { Vote, Building2 } from "lucide-react";

interface ConstituencyCardProps {
    data: ConstituencyResult;
}

export default function ConstituencyCard({ data }: ConstituencyCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Building2 className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {data.constituency_name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Taluka: <span className="font-medium text-gray-700">{data.taluka_name}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        District: {data.district_name}
                    </p>
                </div>
                <div>
                    {/* Optional: Add an action button or verify status if needed */}
                </div>
            </div>
        </div>
    );
}
