export interface Taluka {
    taluka_name: string;
    constituencies: string[];
}

export interface District {
    district_name: string;
    talukas: Taluka[];
}

export interface ElectionData {
    election_name: string;
    districts: District[];
}

export interface ConstituencyResult {
    district_name: string;
    taluka_name: string;
    constituency_name: string;
}
