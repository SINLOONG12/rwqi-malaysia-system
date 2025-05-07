
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
    const dateLoc = parts[0].trim();
    const dateLocMatch = dateLoc.match(/(\d{4}-\d{2}-\d{2}) \(Loc (\d+)\)/);
    
    if (!dateLocMatch) {
      throw new Error(`Invalid date/location format: ${dateLoc}`);
    }
    
    const [, date, location] = dateLocMatch;
    
    return {
      date,
      location: `Location ${location}`,
      dissolvedOxygen: parseFloat(parts[1]),
      biochemicalOxygenDemand: parseFloat(parts[2]),
      chemicalOxygenDemand: parseFloat(parts[3]),
      ammoniacalNitrogen: parseFloat(parts[4]),
      pH: parseFloat(parts[5]),
      trashDetected: parseInt(parts[6]),
      rwqiScore: parseFloat(parts[7])
    };
  });
};

export const riverQualityData: RiverQualityData[] = parseRiverData(`Date/Location	Dissolved Oxygen (DO) [mg/L]	Biochemical Oxygen Demand (BOD) [mg/L]	Chemical Oxygen Demand (COD) [mg/L]	Ammoniacal Nitrogen (NH₃-N) [mg/L]	pH Level	Trash Detected (Score 0-10)	RWQI Score
2025-05-01 (Loc 1)	2.3	15	35	3.5	6.2	9	0.43
2025-05-01 (Loc 2)	3.5	20	40	4.0	6.5	10	0.39
2025-05-02 (Loc 1)	2.0	25	50	5.0	6.0	9	0.42
2025-05-02 (Loc 2)	1.5	18	45	4.5	6.2	10	0.38
2025-05-03 (Loc 1)	3.0	22	30	3.0	6.4	8	0.45
2025-05-03 (Loc 2)	2.1	20	38	4.3	6.3	9	0.41
2025-05-04 (Loc 1)	1.8	30	60	5.2	6.6	9	0.37
2025-05-04 (Loc 2)	2.5	25	55	4.9	6.8	10	0.40
2025-05-05 (Loc 1)	2.7	28	52	4.8	6.1	8	0.41
2025-05-05 (Loc 2)	3.2	23	42	4.2	6.4	10	0.42
2025-05-06 (Loc 1)	2.4	26	48	4.4	6.3	9	0.40
2025-05-06 (Loc 2)	1.9	32	70	6.0	6.2	10	0.35
2025-05-07 (Loc 1)	3.1	24	45	4.0	6.5	9	0.43
2025-05-07 (Loc 2)	2.2	30	60	5.5	6.0	10	0.37
2025-05-08 (Loc 1)	2.6	27	55	4.6	6.4	9	0.39
2025-05-08 (Loc 2)	1.7	35	65	6.2	6.1	10	0.34
2025-05-09 (Loc 1)	2.8	28	50	5.0	6.3	9	0.41
2025-05-09 (Loc 2)	2.0	32	60	5.4	6.2	10	0.36
2025-05-10 (Loc 1)	3.0	23	48	4.5	6.6	9	0.42
2025-05-10 (Loc 2)	2.3	29	55	5.1	6.5	10	0.38
2025-05-11 (Loc 1)	2.6	30	60	5.4	6.3	9	0.39
2025-05-11 (Loc 2)	2.0	28	58	4.8	6.4	10	0.37
2025-05-12 (Loc 1)	2.2	35	65	6.3	6.1	10	0.35
2025-05-12 (Loc 2)	1.9	33	60	5.9	6.2	10	0.36
2025-05-13 (Loc 1)	2.8	30	57	5.0	6.4	9	0.38
2025-05-13 (Loc 2)	2.1	31	58	5.3	6.3	10	0.37
2025-05-14 (Loc 1)	2.5	33	65	5.8	6.2	9	0.36
2025-05-14 (Loc 2)	1.8	36	72	6.1	6.5	10	0.34
2025-05-15 (Loc 1)	2.3	34	67	5.6	6.3	9	0.35
2025-05-15 (Loc 2)	1.6	38	75	6.3	6.4	10	0.33
2025-05-16 (Loc 1)	2.7	31	62	5.2	6.5	9	0.36
2025-05-16 (Loc 2)	1.5	37	70	6.0	6.2	10	0.32
2025-05-17 (Loc 1)	2.6	29	58	5.3	6.1	9	0.37
2025-05-17 (Loc 2)	2.2	33	68	5.7	6.3	10	0.34
2025-05-18 (Loc 1)	2.0	32	65	5.4	6.4	9	0.36
2025-05-18 (Loc 2)	1.9	35	72	6.2	6.2	10	0.34
2025-05-19 (Loc 1)	2.4	30	60	5.1	6.5	9	0.38
2025-05-19 (Loc 2)	2.3	33	68	5.7	6.3	10	0.35
2025-05-20 (Loc 1)	2.5	28	55	4.9	6.6	9	0.39
2025-05-20 (Loc 2)	2.1	31	60	5.2	6.4	10	0.36`);

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
