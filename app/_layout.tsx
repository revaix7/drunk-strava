import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { colors } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="night/tracking"
        options={{
          title: 'Tracking',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="night/[id]"
        options={{
          title: 'Night Details',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
}
