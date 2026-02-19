"use client";

import { useState, useMemo } from "react";
import ksbcDataRaw from "@/data/ksbc.json";
import { ElectionData, District, ConstituencyResult } from "@/types";
import SearchInput from "@/components/SearchInput";
import DistrictMultiSelect from "@/components/DistrictMultiSelect";
import TalukaGroup from "@/components/TalukaGroup";
import ConstituencyList from "@/components/ConstituencyList";
import { ListFilter } from "lucide-react";

const ksbcData = ksbcDataRaw as ElectionData;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedTalukas, setSelectedTalukas] = useState<string[]>([]);

  // Cleanup Talukas when Districts change?
  // User might want to keep selected talukas if their district is still selected.
  // But if a district is removed, its talukas should probably be removed from selection.
  // Let's implement a smart setter or effect if needed, but for now standard state is fine.
  // Actually, better to filter selectedTalukas to only include those in currently selected districts during render or effect.
  // For simplicity, we'll just keep the state as is, but logic will ignore orphan talukas.

  const handleDistrictChange = (newDistricts: string[]) => {
    setSelectedDistricts(newDistricts);
    // Optionally clear talukas that are no longer in selected districts
    // finding valid talukas from newDistricts
    const validTalukas = ksbcData.districts
      .filter(d => newDistricts.includes(d.district_name))
      .flatMap(d => d.talukas.map(t => t.taluka_name));

    setSelectedTalukas(prev => prev.filter(t => validTalukas.includes(t)));
  };

  const handleTalukaToggle = (talukaName: string) => {
    setSelectedTalukas((prev) =>
      prev.includes(talukaName)
        ? prev.filter((t) => t !== talukaName)
        : [...prev, talukaName]
    );
  };

  // Stats
  const totalDistricts = ksbcData.districts.length;
  // Calculate total talukas once
  const totalTalukas = useMemo(() => ksbcData.districts.reduce((acc, d) => acc + d.talukas.length, 0), []);

  const selectedDistrictsCount = selectedDistricts.length;

  // Calculate talukas available in selected districts
  const availableTalukasCount = useMemo(() => {
    if (selectedDistricts.length === 0) return 0;
    return ksbcData.districts
      .filter(d => selectedDistricts.includes(d.district_name))
      .reduce((acc, d) => acc + d.talukas.length, 0);
  }, [selectedDistricts]);

  // Filter Logic
  const results: ConstituencyResult[] = useMemo(() => {
    // 1. Search Mode
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const allConstituencies: ConstituencyResult[] = [];

      ksbcData.districts.forEach((district) => {
        district.talukas.forEach((taluka) => {
          taluka.constituencies.forEach((constituency) => {
            // Search match?
            if (constituency.toLowerCase().includes(query) ||
              taluka.taluka_name.toLowerCase().includes(query) ||
              district.district_name.toLowerCase().includes(query)) {
              allConstituencies.push({
                district_name: district.district_name,
                taluka_name: taluka.taluka_name,
                constituency_name: constituency
              });
            }
          });
        });
      });
      return allConstituencies;
    }

    // 2. Filter Mode
    if (selectedDistricts.length > 0) {
      const filteredResults: ConstituencyResult[] = [];

      ksbcData.districts
        .filter(d => selectedDistricts.includes(d.district_name))
        .forEach(district => {
          district.talukas.forEach(taluka => {
            // Include if:
            // a) Taluka is specifically selected
            // b) No talukas are selected for this district? (Complexity: do we show all if none selected?)
            // User requirement: "show the district the user seleted under that the taulak... once he sect as per his choice then show all the taulak"
            // Interpretation: If user selects districts, SHOW TALUKAS.
            // Does it show results immediately? Usually yes for better UX.
            // Let's say: If NO talukas selected globally, show ALL from selected districts.
            // If SOME talukas selected globally, show ONLY those selected talukas (within the selected districts).

            const isIdsMode = selectedTalukas.length > 0;

            if (!isIdsMode || selectedTalukas.includes(taluka.taluka_name)) {
              taluka.constituencies.forEach(c => {
                filteredResults.push({
                  district_name: district.district_name,
                  taluka_name: taluka.taluka_name,
                  constituency_name: c
                });
              });
            }
          });
        });

      return filteredResults;
    }

    // If nothing selected, maybe show nothing or prompt?
    return [];
  }, [searchQuery, selectedDistricts, selectedTalukas]);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {ksbcData.election_name}
          </h1>
          <p className="text-gray-600">
            Search or select districts to find your constituency
          </p>
        </header>

        {/* Stats Summary */}
        <section className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 mb-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-gray-500">Total Districts:</span> <span className="font-semibold text-gray-900">{totalDistricts}</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-gray-500">Total Talukas:</span> <span className="font-semibold text-gray-900">{totalTalukas}</span>
            </div>
          </div>

          {selectedDistrictsCount > 0 && (
            <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-gray-600">Selected Districts: <span className="font-semibold text-gray-900">{selectedDistrictsCount}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="text-gray-600">Available Talukas: <span className="font-semibold text-gray-900">{availableTalukasCount}</span></span>
              </div>
            </div>
          )}
        </section>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 sticky top-4 z-20">
          <SearchInput query={searchQuery} setQuery={setSearchQuery} />

          <div className={`transition-opacity duration-200 ${searchQuery ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <DistrictMultiSelect
              districts={ksbcData.districts}
              selectedDistricts={selectedDistricts}
              onChange={handleDistrictChange}
            />
          </div>
        </div>

        {/* Inline Taluka Filters */}
        {!searchQuery && selectedDistricts.length > 0 && (
          <section className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center space-x-2 mb-4">
              <ListFilter className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-800">Filter by Taluka</h2>
            </div>
            <TalukaGroup
              districts={ksbcData.districts}
              selectedDistricts={selectedDistricts}
              selectedTalukas={selectedTalukas}
              onTalukaToggle={handleTalukaToggle}
            />
          </section>
        )}

        {/* Results */}
        <section>
          {!searchQuery && selectedDistricts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">Select one or more districts to begin.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Results <span className="text-gray-400 text-sm font-normal">({results.length})</span>
                </h2>
              </div>
              <ConstituencyList results={results} hasSearch={!!searchQuery || selectedDistricts.length > 0} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
