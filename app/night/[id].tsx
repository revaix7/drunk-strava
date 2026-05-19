import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { getNight } from '../../lib/db';
import { Night } from '../../types';
import { colors, spacing } from '../../constants/theme';

export default function NightDetailScreen({ route }: any) {
  const { id } = route.params;
  const [night, setNight] = useState<Night | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNight() {
      if (!id) return;
      const data = await getNight(id);
      setNight(data);
      setLoading(false);
    }
    loadNight();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!night) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Night not found</Text>
      </SafeAreaView>
    );
  }

  const mapRegion =
    night.route.length > 0
      ? {
          latitude: night.route[0].lat,
          longitude: night.route[0].lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : {
          latitude: 40.7128,
          longitude: -74.006,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

  const date = new Date(night.started_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          region={mapRegion}
          scrollEnabled={false}
        >
          {night.route.length > 1 && (
            <Polyline
              coordinates={night.route.map((p) => ({
                latitude: p.lat,
                longitude: p.lng,
              }))}
              strokeColor={colors.primary}
              strokeWidth={3}
            />
          )}
        </MapView>

        <View style={styles.statsPanel}>
          <Text style={styles.title}>{night.title || 'Night Out'}</Text>
          <Text style={styles.date}>{formattedDate}</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>
                {(night.total_distance_m / 1000).toFixed(2)} km
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>
                {Math.floor(night.duration_seconds / 60)} min
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Max Sway</Text>
              <Text style={styles.statValue}>
                {night.max_sway_score.toFixed(0)}
              </Text>
            </View>
            {night.bac_self_reported && (
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>BAC</Text>
                <Text style={styles.statValue}>
                  {night.bac_self_reported.toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          {night.checkpoints.length > 0 && (
            <View style={styles.checkpointSection}>
              <Text style={styles.sectionTitle}>Bars</Text>
              {night.checkpoints.map((cp) => (
                <View key={cp.id} style={styles.checkpointItem}>
                  <Text style={styles.checkpointName}>
                    {cp.name || 'Unknown Location'}
                  </Text>
                  <Text style={styles.checkpointTime}>
                    {new Date(cp.arrived_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    height: 300,
    backgroundColor: colors.surface,
  },
  statsPanel: {
    padding: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
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
  checkpointSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  checkpointItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkpointName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  checkpointTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  errorText: {
    textAlign: 'center',
    color: colors.text,
    marginTop: spacing.lg,
  },
});
