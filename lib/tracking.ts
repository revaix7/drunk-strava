import * as Location from 'expo-location';
import { GeoPoint } from '../types';
import { useNightStore } from '../stores/nightStore';

let locationSubscription: Location.LocationSubscription | null = null;
let currentAccuracy = Location.Accuracy.Balanced;
let lastLocationTime = 0;
const POLL_INTERVAL_MOVING = 5000;
const POLL_INTERVAL_STATIONARY = 15000;
const SPEED_THRESHOLD = 0.5;

export async function startTracking(): Promise<void> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission denied');
  }

  useNightStore.setState({ isTracking: true });

  locationSubscription = await Location.watchPositionAsync(
    {
      accuracy: currentAccuracy,
      timeInterval: POLL_INTERVAL_MOVING,
      distanceInterval: 0,
    },
    (location) => {
      const now = Date.now();

      const isMoving = location.coords.speed && location.coords.speed > SPEED_THRESHOLD;

      if (isMoving && currentAccuracy !== Location.Accuracy.Balanced) {
        currentAccuracy = Location.Accuracy.Balanced;
      } else if (!isMoving && currentAccuracy !== Location.Accuracy.Lowest) {
        currentAccuracy = Location.Accuracy.Lowest;
      }

      const point: GeoPoint = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        ts: location.timestamp,
        speed: location.coords.speed,
        accuracy: location.coords.accuracy || 0,
      };

      useNightStore.setState((state) => ({
        currentPoints: [...state.currentPoints, point],
      }));

      lastLocationTime = now;
    }
  );
}

export async function stopTracking(): Promise<void> {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }
  useNightStore.setState({ isTracking: false });
}
