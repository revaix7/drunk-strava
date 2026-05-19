import { Stack } from 'expo-router';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="night/tracking" options={{ title: 'Tracking' }} />
      <Stack.Screen name="night/[id]" options={{ title: 'Night Details' }} />
    </Stack>
  );
}
