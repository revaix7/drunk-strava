import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../constants/theme';

type StatBlockProps = {
  label: string;
  value: string | number;
};

export default function StatBlock({ label, value }: StatBlockProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
});
