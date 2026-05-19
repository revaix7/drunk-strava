import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { colors, spacing } from '../../constants/theme';

export default function LeaderboardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboards</Text>
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.text}>Leaderboards coming in Phase 5</Text>
      </View>
    </SafeAreaView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
