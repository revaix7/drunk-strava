import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Night } from '../types';
import { colors, spacing } from '../constants/theme';

type NightCardProps = {
  night: Night;
};

export default function NightCard({ night }: NightCardProps) {
  const router = useRouter();

  const date = new Date(night.started_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handlePress = () => {
    router.push(`/night/${night.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.title}>{night.title || 'Night Out'}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>
            {(night.total_distance_m / 1000).toFixed(1)}km
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={styles.statValue}>
            {Math.floor(night.duration_seconds / 60)}m
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Sway</Text>
          <Text style={styles.statValue}>
            {night.max_sway_score.toFixed(0)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
