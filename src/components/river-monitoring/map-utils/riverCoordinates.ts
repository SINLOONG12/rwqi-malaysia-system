
// Map of river coordinates and their status for the Malaysia Rivers Map
export type RiverStatus = "critical" | "warning" | "good";

export interface RiverCoordinate {
  x: number;
  y: number;
  status: RiverStatus;
}

export const riverCoordinates: Record<string, RiverCoordinate> = {
  "Sungai Klang (Kuala Lumpur)": { x: 50, y: 45, status: "warning" },
  "Sungai Gombak (Kuala Lumpur)": { x: 52, y: 42, status: "critical" },
  "Sungai Pinang (Penang)": { x: 38, y: 22, status: "warning" },
  "Sungai Kelantan (Kelantan)": { x: 75, y: 25, status: "warning" },
  "Sungai Perak (Perak)": { x: 45, y: 35, status: "good" },
  "Sungai Selangor (Selangor)": { x: 48, y: 48, status: "good" },
  "Sungai Pahang (Pahang)": { x: 65, y: 45, status: "good" },
  "Sungai Johor (Johor)": { x: 58, y: 75, status: "warning" },
  "Sungai Muar (Johor)": { x: 55, y: 70, status: "warning" },
  "Sungai Linggi (N. Sembilan)": { x: 53, y: 60, status: "warning" },
  "Sungai Langat (Selangor)": { x: 51, y: 50, status: "warning" },
  "Sungai Kedah (Kedah)": { x: 38, y: 18, status: "good" },
  "Sungai Melaka (Melaka)": { x: 48, y: 65, status: "warning" },
  "Sungai Perlis (Perlis)": { x: 35, y: 12, status: "good" },
  "Sungai Terengganu (Terengganu)": { x: 80, y: 35, status: "good" },
  "Sungai Sarawak (Sarawak)": { x: 23, y: 55, status: "good" },
  "Sungai Rajang (Sarawak)": { x: 20, y: 50, status: "good" },
  "Sungai Padas (Sabah)": { x: 15, y: 30, status: "good" },
  "Sungai Kinabatangan (Sabah)": { x: 18, y: 25, status: "good" },
  "Sungai Perai (Penang)": { x: 36, y: 25, status: "warning" },
  "Sungai Dungun (Terengganu)": { x: 78, y: 38, status: "good" },
  "Sungai Segamat (Johor)": { x: 60, y: 68, status: "warning" },
  "Sungai Endau (Johor)": { x: 65, y: 72, status: "warning" },
  "Sungai Juru (Penang)": { x: 37, y: 23, status: "critical" },
  "Sungai Batu Pahat (Johor)": { x: 57, y: 73, status: "warning" },
  "Sungai Merbok (Kedah)": { x: 40, y: 20, status: "warning" },
  "Sungai Kerian (Perak)": { x: 42, y: 25, status: "warning" },
  "Sungai Kuantan (Pahang)": { x: 70, y: 43, status: "warning" },
  "Sungai Kemaman (Terengganu)": { x: 75, y: 40, status: "good" },
  "Sungai Besut (Terengganu)": { x: 77, y: 32, status: "good" },
  "Sungai Sedili (Johor)": { x: 62, y: 74, status: "warning" },
  "Sungai Setiu (Terengganu)": { x: 82, y: 34, status: "good" },
  "Sungai Sugut (Sabah)": { x: 10, y: 22, status: "good" },
  "Sungai Temburong (Sabah)": { x: 12, y: 20, status: "good" }
};

export const getStatusColor = (status: RiverStatus): string => {
  switch (status) {
    case "critical": return "text-red-500";
    case "warning": return "text-orange-500";
    case "good": return "text-green-500";
    default: return "";
  }
};

export const getStatusBgColor = (status: RiverStatus): string => {
  switch (status) {
    case "critical": return "bg-red-500";
    case "warning": return "bg-orange-500";
    case "good": return "bg-green-500";
    default: return "";
  }
};
