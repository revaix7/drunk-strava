import { GeoPoint } from '../types';

const EARTH_RADIUS_M = 6371000;

export function haversineDistance(a: GeoPoint, b: GeoPoint): number {
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const deltaLat = ((b.lat - a.lat) * Math.PI) / 180;
  const deltaLng = ((b.lng - a.lng) * Math.PI) / 180;

  const sinLatHalf = Math.sin(deltaLat / 2);
  const sinLngHalf = Math.sin(deltaLng / 2);

  const a_val =
    sinLatHalf * sinLatHalf +
    Math.cos(lat1) * Math.cos(lat2) * sinLngHalf * sinLngHalf;

  const c = 2 * Math.atan2(Math.sqrt(a_val), Math.sqrt(1 - a_val));

  return EARTH_RADIUS_M * c;
}

export function totalDistance(points: GeoPoint[]): number {
  if (points.length < 2) return 0;

  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineDistance(points[i - 1], points[i]);
  }
  return total;
}

export function isStationary(
  points: GeoPoint[],
  thresholdMeters: number
): boolean {
  if (points.length < 2) return false;

  const last = points[points.length - 1];
  const first = points[0];

  return haversineDistance(first, last) < thresholdMeters;
}
