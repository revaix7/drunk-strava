import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { getNights } from '../../lib/db';
import { Night } from '../../types';
import NightCard from '../../components/NightCard';
import { colors, spacing } from '../../constants/theme';

export default function HomeScreen({ navigation }: any) {
  const [nights, setNights] = useState<Night[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNights();
  }, []);

  const loadNights = async () => {
    setLoading(true);
    const data = await getNights();
    setNights(data);
    setLoading(false);
  };

  const handleStartNight = () => {
    navigation.navigate('Tracking');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Drunk Strava</Text>
        <Text style={styles.subtitle}>Track your night out</Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartNight}
      >
        <Text style={styles.startButtonText}>Start Night</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : nights.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>No nights yet</Text>
          <Text style={styles.emptySubtext}>Touch grass differently!</Text>
        </View>
      ) : (
        <FlatList
          data={nights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NightCard
              night={item}
              onPress={(id) => navigation.navigate('NightDetail', { id })}
            />
          )}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.background,
    opacity: 0.9,
  },
  startButton: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.success,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
