import { Accelerometer } from 'expo-sensors';
import { useNightStore } from '../stores/nightStore';

type AccelReading = {
  x: number;
  y: number;
  z: number;
  timestamp: number;
};

let swaySubscription: any = null;
let readings: AccelReading[] = [];
const WINDOW_SIZE_MS = 10000;

function calculateSwayScore(readings: AccelReading[]): number {
  if (readings.length === 0) return 0;

  const magnitudes = readings.map((r) =>
    Math.sqrt(r.x ** 2 + r.y ** 2 + r.z ** 2)
  );

  const mean = magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length;
  const variance =
    magnitudes.reduce((sum, m) => sum + (m - mean) ** 2, 0) / magnitudes.length;

  return Math.min(100, variance * 50);
}

export function startSway(): void {
  readings = [];
  Accelerometer.setUpdateInterval(500);

  swaySubscription = Accelerometer.addListener((data) => {
    const now = Date.now();

    readings.push({
      x: data.x,
      y: data.y,
      z: data.z,
      timestamp: now,
    });

    readings = readings.filter((r) => now - r.timestamp < WINDOW_SIZE_MS);

    const score = calculateSwayScore(readings);
    useNightStore.setState({ swayScore: score });
  });
}

export function stopSway(): void {
  if (swaySubscription) {
    swaySubscription.remove();
    swaySubscription = null;
  }
  readings = [];
}

export function getCurrentSwayScore(): number {
  return calculateSwayScore(readings);
}
