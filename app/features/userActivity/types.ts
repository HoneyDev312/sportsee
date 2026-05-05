export interface UserActivity {
  date: string;
  distance: number;
  duration: number;
  heartRate: HeartRateData;
  caloriesBurned: number;
}

export interface HeartRateData {
  min: number;
  max: number;
  average: number;
}
