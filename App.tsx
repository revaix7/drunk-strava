import React, { useState } from 'react';
import { View } from 'react-native';
import HomeScreen from './app/(tabs)/index';
import TrackingScreen from './app/night/tracking';
import NightDetailScreen from './app/night/[id]';

type Screen = 'home' | 'tracking' | 'detail';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [detailId, setDetailId] = useState<string>('');

  const navigation = {
    navigate: (screenName: string, params?: any) => {
      if (screenName === 'Tracking') {
        setScreen('tracking');
      } else if (screenName === 'NightDetail') {
        setDetailId(params?.id || '');
        setScreen('detail');
      } else {
        setScreen('home');
      }
    },
    goBack: () => {
      setScreen('home');
    },
  };

  return (
    <View style={{ flex: 1 }}>
      {screen === 'home' && <HomeScreen navigation={navigation} />}
      {screen === 'tracking' && <TrackingScreen navigation={navigation} />}
      {screen === 'detail' && <NightDetailScreen route={{ params: { id: detailId } }} />}
    </View>
  );
}
