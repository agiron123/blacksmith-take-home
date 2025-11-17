import { subDays, addDays, format } from "date-fns";

export interface TimeSeriesDataPoint {
  timestamp: Date;
  value: number;
}

export interface ChartData {
  id: number;
  title: string;
  data: TimeSeriesDataPoint[];
}

// Generate different patterns for each chart
function generatePattern(
  chartId: number,
  timestamp: Date,
  baseValue: number,
  index: number,
  totalPoints: number
): number {
  const normalizedIndex = index / totalPoints;
  const timeOfDay = timestamp.getHours() / 24;
  const dayOfWeek = timestamp.getDay() / 7;

  switch (chartId) {
    case 1:
      // Trending up with noise
      return baseValue + normalizedIndex * 50 + Math.sin(normalizedIndex * Math.PI * 4) * 10 + (Math.random() - 0.5) * 20;
    case 2:
      // Trending down with noise
      return baseValue - normalizedIndex * 40 + Math.cos(normalizedIndex * Math.PI * 3) * 15 + (Math.random() - 0.5) * 18;
    case 3:
      // Seasonal pattern (daily cycle)
      return baseValue + Math.sin(timeOfDay * Math.PI * 2) * 30 + (Math.random() - 0.5) * 15;
    case 4:
      // Weekly pattern
      return baseValue + Math.sin(dayOfWeek * Math.PI * 2) * 25 + (Math.random() - 0.5) * 20;
    case 5:
      // Random walk
      return baseValue + (Math.random() - 0.5) * 40;
    case 6:
      // Step function with noise
      const step = Math.floor(normalizedIndex * 5);
      return baseValue + step * 20 + (Math.random() - 0.5) * 15;
    case 7:
      // Exponential growth with noise
      return baseValue * (1 + normalizedIndex * 0.5) + Math.sin(normalizedIndex * Math.PI * 6) * 10 + (Math.random() - 0.5) * 12;
    case 8:
      // Sinusoidal with trend
      return baseValue + normalizedIndex * 30 + Math.sin(normalizedIndex * Math.PI * 8) * 20 + (Math.random() - 0.5) * 15;
    case 9:
      // Complex pattern (combination)
      return (
        baseValue +
        normalizedIndex * 25 +
        Math.sin(timeOfDay * Math.PI * 2) * 15 +
        Math.cos(dayOfWeek * Math.PI * 2) * 10 +
        (Math.random() - 0.5) * 18
      );
    default:
      return baseValue + (Math.random() - 0.5) * 20;
  }
}

export function generateMockData(
  chartId: number,
  dateRange: { start: Date; end: Date }
): ChartData {
  const titles = [
    "Revenue",
    "Active Users",
    "Page Views",
    "Conversion Rate",
    "Bounce Rate",
    "Session Duration",
    "API Requests",
    "Error Rate",
    "Server Load",
  ];

  const baseValues = [1000, 500, 10000, 50, 30, 300, 5000, 2, 60];

  const data: TimeSeriesDataPoint[] = [];
  const startTime = dateRange.start.getTime();
  const endTime = dateRange.end.getTime();
  const duration = endTime - startTime;
  
  // Generate data points every hour
  const intervalMs = 60 * 60 * 1000; // 1 hour
  const totalPoints = Math.ceil(duration / intervalMs);
  
  for (let i = 0; i < totalPoints; i++) {
    const timestamp = new Date(startTime + i * intervalMs);
    const value = generatePattern(
      chartId,
      timestamp,
      baseValues[chartId - 1] || 100,
      i,
      totalPoints
    );
    
    // Ensure values stay within reasonable bounds
    const minValue = 0;
    const maxValue = (baseValues[chartId - 1] || 100) * 3;
    const clampedValue = Math.max(minValue, Math.min(maxValue, value));
    
    data.push({
      timestamp,
      value: Math.round(clampedValue * 100) / 100, // Round to 2 decimal places
    });
  }

  return {
    id: chartId,
    title: titles[chartId - 1] || `Chart ${chartId}`,
    data,
  };
}

export function generateAllMockData(
  dateRange: { start: Date; end: Date }
): ChartData[] {
  return Array.from({ length: 9 }, (_, i) => generateMockData(i + 1, dateRange));
}

