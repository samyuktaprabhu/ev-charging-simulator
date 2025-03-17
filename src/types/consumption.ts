export interface DailyConsumption {
  day: string;
  averageDailyConsumption: number;
}

export interface MonthlyConsumption {
  year: number;
  month: string;
  weekdays?: {
    dailyDistribution: number[];
  };
  weekends?: {
    dailyDistribution: number[];
  };
  dailyData: DailyConsumption[];
}
