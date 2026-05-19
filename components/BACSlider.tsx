import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../constants/theme';

export default function BACSlider() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BAC Slider - Phase 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
