import { create } from 'zustand';
import { GeoPoint } from '../types';

type NightStore = {
  currentPoints: GeoPoint[];
  isTracking: boolean;
  startedAt: string | null;
  swayScore: number;
  startTracking: () => void;
  stopTracking: () => void;
  addPoint: (point: GeoPoint) => void;
  updateSwayScore: (score: number) => void;
  reset: () => void;
};

export const useNightStore = create<NightStore>((set) => ({
  currentPoints: [],
  isTracking: false,
  startedAt: null,
  swayScore: 0,

  startTracking: () =>
    set({
      isTracking: true,
      startedAt: new Date().toISOString(),
      currentPoints: [],
    }),

  stopTracking: () => set({ isTracking: false }),

  addPoint: (point) =>
    set((state) => ({
      currentPoints: [...state.currentPoints, point],
    })),

  updateSwayScore: (score) => set({ swayScore: score }),

  reset: () =>
    set({
      currentPoints: [],
      isTracking: false,
      startedAt: null,
      swayScore: 0,
    }),
}));
