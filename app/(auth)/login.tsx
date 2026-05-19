import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { colors, spacing } from '../../constants/theme';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Login coming in Phase 2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
