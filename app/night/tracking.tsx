import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useNightStore } from '../../stores/nightStore';
import { startTracking, stopTracking } from '../../lib/tracking';
import { startSway, stopSway } from '../../lib/sway';
import { totalDistance } from '../../lib/geometry';
import { saveNight } from '../../lib/db';
import { colors, spacing } from '../../constants/theme';
import { Night } from '../../types';

export default function TrackingScreen({ navigation }: any) {
  const { isTracking, currentPoints, swayScore, startedAt } = useNightStore();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const distance = totalDistance(currentPoints);
  const maxSwayScore = currentPoints.length > 0 ? swayScore : 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTracking && startedAt) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const start = new Date(startedAt).getTime();
        setElapsedSeconds(Math.floor((now - start) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, startedAt]);

  const handleStartTracking = async () => {
    try {
      useNightStore.setState({ startTracking: () => {} });
      useNightStore.getState().startTracking();
      await startTracking();
      startSway();
    } catch (error) {
      console.error('Error starting tracking:', error);
    }
  };

  const handleStopTracking = async () => {
    try {
      await stopTracking();
      stopSway();

      const night: Night = {
        id: `night_${Date.now()}`,
        user_id: 'local_user',
        started_at: startedAt || new Date().toISOString(),
        ended_at: new Date().toISOString(),
        title: null,
        bac_self_reported: null,
        total_distance_m: distance,
        duration_seconds: elapsedSeconds,
        max_sway_score: maxSwayScore,
        route: currentPoints,
        checkpoints: [],
        created_at: new Date().toISOString(),
      };

      await saveNight(night);
      useNightStore.getState().reset();

      navigation.navigate('NightDetail', { id: night.id });
    } catch (error) {
      console.error('Error stopping tracking:', error);
    }
  };

  const mapRegion =
    currentPoints.length > 0
      ? {
          latitude: currentPoints[0].lat,
          longitude: currentPoints[0].lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : {
          latitude: 40.7128,
          longitude: -74.006,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        region={mapRegion}
      >
        {currentPoints.length > 1 && (
          <Polyline
            coordinates={currentPoints.map((p) => ({
              latitude: p.lat,
              longitude: p.lng,
            }))}
            strokeColor={colors.primary}
            strokeWidth={3}
          />
        )}
      </MapView>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={styles.statValue}>
            {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, '0')}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>
            {(distance / 1000).toFixed(2)} km
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Sway</Text>
          <Text style={styles.statValue}>{maxSwayScore.toFixed(0)}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {!isTracking ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStartTracking}
          >
            <Text style={styles.buttonText}>Start Night</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={handleStopTracking}
          >
            <Text style={styles.buttonText}>Stop & Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: colors.success,
  },
  stopButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
