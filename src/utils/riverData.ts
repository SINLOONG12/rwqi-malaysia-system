
interface RiverQualityData {
  date: string;
  location: string;
  dissolvedOxygen: number;
  biochemicalOxygenDemand: number;
  chemicalOxygenDemand: number;
  ammoniacalNitrogen: number;
  pH: number;
  trashDetected: number;
  rwqiScore: number;
}

// Parse data from the provided format
export const parseRiverData = (rawData: string): RiverQualityData[] => {
  const lines = rawData.trim().split('\n');
  // Skip header line
  const dataLines = lines.slice(1);
  
  return dataLines.map(line => {
    const parts = line.split('\t');
    const date = parts[0];
    const location = parts[1];
    
    return {
      date,
      location,
      dissolvedOxygen: parseFloat(parts[2]),
      biochemicalOxygenDemand: parseFloat(parts[3]),
      chemicalOxygenDemand: parseFloat(parts[4]),
      ammoniacalNitrogen: parseFloat(parts[5]),
      pH: parseFloat(parts[6]),
      trashDetected: parseInt(parts[7]),
      rwqiScore: parseFloat(parts[8])
    };
  });
};

export const riverQualityData: RiverQualityData[] = parseRiverData(`Date	River Location	Dissolved Oxygen (DO) [mg/L]	Biochemical Oxygen Demand (BOD) [mg/L]	Chemical Oxygen Demand (COD) [mg/L]	Ammoniacal Nitrogen (NH₃-N) [mg/L]	pH Level	Trash Detected (Score 0-10)	RWQI Score
2025-05-01	Sungai Klang (Kuala Lumpur)	2.3	15	35	3.5	6.2	9	0.43
2025-05-01	Sungai Gombak (Kuala Lumpur)	3.5	20	40	4.0	6.5	10	0.39
2025-05-02	Sungai Pinang (Penang)	2.0	25	50	5.0	6.0	9	0.42
2025-05-02	Sungai Kelantan (Kelantan)	4.5	12	30	2.5	6.7	6	0.58
2025-05-03	Sungai Perak (Perak)	5.2	10	25	2.0	6.9	5	0.65
2025-05-03	Sungai Selangor (Selangor)	4.8	11	28	2.2	6.8	6	0.62
2025-05-04	Sungai Pahang (Pahang)	5.5	8	20	1.8	7.0	4	0.69
2025-05-04	Sungai Johor (Johor)	4.2	13	32	2.7	6.6	7	0.56
2025-05-05	Sungai Muar (Johor)	4.0	14	33	2.9	6.5	7	0.54
2025-05-05	Sungai Linggi (N. Sembilan)	3.7	16	38	3.2	6.4	8	0.51
2025-05-06	Sungai Langat (Selangor)	2.8	21	42	4.1	6.3	9	0.44
2025-05-06	Sungai Kedah (Kedah)	4.7	12	27	2.1	6.8	6	0.61
2025-05-07	Sungai Melaka (Melaka)	3.2	18	37	3.3	6.5	8	0.48
2025-05-07	Sungai Perlis (Perlis)	4.9	11	26	2.0	6.9	5	0.63
2025-05-08	Sungai Terengganu (Terengganu)	5.0	9	22	1.9	7.0	5	0.64
2025-05-08	Sungai Sarawak (Sarawak)	5.3	8	19	1.7	7.1	4	0.70
2025-05-09	Sungai Rajang (Sarawak)	5.4	7	18	1.6	7.1	3	0.72
2025-05-09	Sungai Padas (Sabah)	5.6	6	17	1.5	7.2	3	0.74
2025-05-10	Sungai Kinabatangan (Sabah)	5.5	7	18	1.6	7.1	3	0.71
2025-05-10	Sungai Perai (Penang)	3.0	19	39	3.4	6.4	8	0.47
2025-05-11	Sungai Dungun (Terengganu)	4.8	10	24	1.9	6.9	5	0.63
2025-05-11	Sungai Segamat (Johor)	3.8	15	36	3.1	6.5	7	0.52
2025-05-12	Sungai Endau (Johor)	4.3	13	31	2.6	6.7	6	0.57
2025-05-12	Sungai Juru (Penang)	2.2	35	65	6.3	6.1	10	0.35
2025-05-13	Sungai Batu Pahat (Johor)	3.5	17	35	3.0	6.6	7	0.50
2025-05-13	Sungai Merbok (Kedah)	4.1	14	32	2.7	6.7	6	0.55
2025-05-14	Sungai Kerian (Perak)	4.4	13	30	2.5	6.8	6	0.58
2025-05-14	Sungai Kuantan (Pahang)	4.6	12	29	2.4	6.8	5	0.59
2025-05-15	Sungai Kemaman (Terengganu)	4.9	10	25	2.0	6.9	5	0.63
2025-05-15	Sungai Besut (Terengganu)	5.1	9	23	1.9	7.0	4	0.66
2025-05-16	Sungai Sedili (Johor)	4.2	14	33	2.8	6.6	7	0.56
2025-05-16	Sungai Setiu (Terengganu)	4.7	11	27	2.2	6.8	6	0.61
2025-05-17	Sungai Sugut (Sabah)	5.2	8	21	1.8	7.0	4	0.68
2025-05-17	Sungai Temburong (Sabah)	5.3	7	20	1.7	7.1	3	0.70`);

// Helper functions to process data for visualizations
export const getLocationData = (location: string) => {
  return riverQualityData.filter(data => data.location === location);
};

export const getDateData = (date: string) => {
  return riverQualityData.filter(data => data.date === date);
};

export const getUniqueLocations = (): string[] => {
  return [...new Set(riverQualityData.map(data => data.location))];
};

export const getUniqueDates = (): string[] => {
  return [...new Set(riverQualityData.map(data => data.date))];
};

export const getRwqiCategory = (score: number): string => {
  if (score >= 0.8) return "Good";
  if (score >= 0.6) return "Moderate";
  if (score >= 0.4) return "Poor";
  return "Very Poor";
};

export const getRwqiColor = (score: number): string => {
  if (score >= 0.8) return "#10b981"; // Green
  if (score >= 0.6) return "#f97316"; // Orange
  if (score >= 0.4) return "#f59e0b"; // Amber
  return "#ef4444"; // Red
};

// Get average values across all locations for a specific date
export const getAveragesByDate = (date: string) => {
  const dateData = getDateData(date);
  if (!dateData.length) return null;
  
  return {
    date,
    dissolvedOxygen: Number((dateData.reduce((sum, item) => sum + item.dissolvedOxygen, 0) / dateData.length).toFixed(1)),
    biochemicalOxygenDemand: Number((dateData.reduce((sum, item) => sum + item.biochemicalOxygenDemand, 0) / dateData.length).toFixed(1)),
    chemicalOxygenDemand: Number((dateData.reduce((sum, item) => sum + item.chemicalOxygenDemand, 0) / dateData.length).toFixed(1)),
    ammoniacalNitrogen: Number((dateData.reduce((sum, item) => sum + item.ammoniacalNitrogen, 0) / dateData.length).toFixed(1)),
    pH: Number((dateData.reduce((sum, item) => sum + item.pH, 0) / dateData.length).toFixed(1)),
    trashDetected: Number((dateData.reduce((sum, item) => sum + item.trashDetected, 0) / dateData.length).toFixed(1)),
    rwqiScore: Number((dateData.reduce((sum, item) => sum + item.rwqiScore, 0) / dateData.length).toFixed(2)),
  };
};
